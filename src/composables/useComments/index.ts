import type { IComment } from './types';
import type { PostId } from '@/composables/usePosts/types';
import { computed, ref } from 'vue';
import $axios from '@/api';
import { usePagination } from '@/composables/usePagination';

export const useComments = () => {
  const { page, limit } = usePagination();

  const list = ref<IComment[]>([]);
  const loading = ref(false);

  const query = computed(() => {
    return {
      _page: page.value,
      _limit: limit.value,
    };
  });

  const fetchComments = async (postId: PostId) => {
    if (loading.value) return;
    const { data, error } = await $axios.get<IComment[]>('/comments', { loading, params: postId ? { postId } : query.value });
    list.value = error ? [] : data;
  };

  return {
    list, loading, fetchComments,
  };
};
