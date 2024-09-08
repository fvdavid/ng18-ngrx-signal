import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Post } from "../../../model/post-model";
import { computed, inject } from "@angular/core";
import { PostService } from "../../../service/post.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { withDevtools } from '@angular-architects/ngrx-toolkit';

type PostState = {
    _loadedItems: Post[];
    isLoading: boolean;
    error: Error | null;
    filters: {
        name: string;
    };
};

const initialState: PostState = {
    _loadedItems: [],
    isLoading: false,
    error: null,
    filters: {
        name: ''
    }
}

export const PostStore = signalStore(
    withDevtools('posts'),
    withState(initialState),
    withComputed(({ _loadedItems, filters }) => ({
        items: computed(() => {
            let r = _loadedItems();

            if (filters.name()) {
                r = r.filter(f => f.title.toLocaleLowerCase().includes(filters.name().toLocaleLowerCase()));
            }

            return r;
        })
    })),

    withMethods((store) => ({
        _setLoading() {
            patchState(store, (state) => ({ isLoading: true, error: null, _loadedItems: [] }))
        },

        _setError(error: Error) {
            patchState(store, (state) => ({ error, isLoading: false, _loadedItems: [] }))
        },

        _setItems(_loadedItems: Post[]) {
            patchState(store, (state) => ({ _loadedItems, isLoading: false, error: null, }))
        }
    })),

    withMethods(store => ({
        updateFiltersName(value: PostState['filters']['name']) {
            patchState(store, (state) => ({ filters: { ...state.filters, name: value } }));
        },

        clearFilters() {
            patchState(
                store,
                (state) => ({ filters: { ...state.filters, name: '' } })
            )
        }
    })),

    withMethods((store, postService = inject(PostService)) => ({
        loadPosts: rxMethod<void>(
            pipe(
                tap(() => store._setLoading()),
                switchMap(() => postService.fetchPost(1, 20)),
                tap(({
                    next(items) { store._setItems(items) },
                    error(error) { store._setError(error) }
                }))
            )
        )
    })),

    withHooks({
        onInit(store) {
            console.log('init');
            store.loadPosts();
        },

        onDestroy(store) {
            console.log('destroy');
        }
    })
)