import type { IPost, PostId } from './types';
import { computed, ref } from 'vue';
import $axios from '@/api';
import { usePagination } from '@/composables/usePagination';
import { $confirm } from '@/plugins/confirmation.ts';

export const usePosts = () => {
  const {
    page, limit, totalPages, listCounts,
    resetPagination, setTotalCount,
  } = usePagination();

  const loading = ref(false);
  const list = ref<IPost[]>([]);

  const search = ref<string>('');

  const postsQuery = computed(() => {
    return {
      q: search.value.toLowerCase(),
      _page: page.value,
      _limit: limit.value,
    };
  });

  const fetchPosts = async () => {
    if (loading.value) return;
    const { data, error, headers } = await $axios.get<IPost[]>('/posts', { loading, params: postsQuery.value });
    list.value = error ? [] : data;
    setTotalCount(headers?.['x-total-count'] as number || 0);
  };

  const handleFilterUpdate = () => {
    resetPagination();
    fetchPosts();
  };

  const deletePost = async (id: PostId) => {
    const ok = await $confirm.default({
      title: 'confirmations.delete',
      subtitle: 'confirmations.deleteDescription',
    });

    if (!ok) return;
    list.value = list.value.filter(post => post.id !== id);
  };

  return {
    page, limit, totalPages, listCounts,
    search, handleFilterUpdate,
    list, loading, fetchPosts, deletePost,
  };
};
