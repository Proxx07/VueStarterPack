import type { IListPaginationCount } from './types';
import { useRouteQuery } from '@vueuse/router';
import { computed, ref } from 'vue';
import { DEFAULT_LIMIT } from './models';

export const usePagination = (saveToQuery: boolean = false) => {
  const totalCount = ref(0);

  const page = saveToQuery
    ? useRouteQuery<number>('page', 1, { transform: val => Number(val) })
    : ref<number>(1);

  const limit = saveToQuery
    ? useRouteQuery<number>('limit', DEFAULT_LIMIT, { transform: val => Number(val) })
    : ref<number>(DEFAULT_LIMIT);

  const totalPages = computed<number>(() => Math.ceil(totalCount.value / limit.value));

  const listCounts = computed<IListPaginationCount>(() => {
    return {
      current: page.value * limit.value,
      total: totalCount.value,
    };
  });

  const setPage = (val: number) => {
    if (val <= 0) return;
    page.value = val;
  };

  const setLimit = (val: number) => {
    if (val <= 0) return;
    page.value = 1;
    limit.value = val;
  };

  const resetPagination = () => {
    setPage(1);
    setLimit(DEFAULT_LIMIT);
  };

  const setTotalCount = (value: number) => {
    totalCount.value = value;
  };

  return {
    page,
    limit,
    totalPages,

    listCounts,
    setPage,
    setLimit,
    resetPagination,
    setTotalCount,
  };
};
