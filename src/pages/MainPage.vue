<script setup lang="ts">
import type { IComment } from '@/composables/useComments/types';
import type { PostId } from '@/composables/usePosts/types';

import { Badge, Button, Card, Column, DataTable, Select, Skeleton } from 'primevue';
import { ref, shallowRef } from 'vue';
import { arrowDown, pencil, trash } from '@/assets/icons';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import Pagination from '@/components/UI/Pagination.vue';
import TextSpoiler from '@/components/UI/TextSpoiler.vue';
import { useComments } from '@/composables/useComments';
import { PAGE_LIMITS } from '@/composables/usePagination/models';
import { usePosts } from '@/composables/usePosts';

const {
  handleFilterUpdate,
  list, loading, fetchPosts, deletePost,
  search, page, totalPages, listCounts, limit,
} = usePosts();

const expandedRows = shallowRef<Record<PostId, boolean>>({});

const toggleExpand = (id: PostId) => {
  const next = { ...expandedRows.value };
  if (next[id]) delete next[id];
  else next[id] = true;
  expandedRows.value = next;
};

const postCommentsMap = ref<Map<PostId, IComment[]>>(new Map());
const loadingPostId = ref<PostId>(0);
const { list: comments, loading: commentLoading, fetchComments } = useComments();

const expansionHandler = async (id: PostId) => {
  loadingPostId.value = id;
  if (postCommentsMap.value.has(id)) {
    toggleExpand(id);
  }
  else {
    await fetchComments(loadingPostId.value);
    if (comments.value.length) {
      postCommentsMap.value.set(id, comments.value);
      comments.value = [];
    }
    toggleExpand(id);
  }
};
</script>

<template>
  <PageWrapper
    v-model:search="search"
    title="Main page"
    @update:search="handleFilterUpdate"
  >
    <template #header-right>
      <div class="flex-center">
        <Select
          v-model="limit"
          :options="PAGE_LIMITS"
          @update:model-value="() => {
            page = 1;
            fetchPosts();
          }"
        />
      </div>
    </template>

    <div v-if="!list.length && loading" class="font-20-b">
      Loading...
    </div>

    <DataTable v-if="list.length" v-model:expanded-rows="expandedRows" :value="list" :row-hover="!loading" data-key="id">
      <Column field="id" header="ID" style="width: 2%;" class="text-center">
        <template #body="{ data }">
          <Skeleton v-if="loading" size="2.5rem" />
          <Badge v-else :value="data.id" />
        </template>
      </Column>

      <Column field="title" header="Title" style="width: 30%">
        <template #body="{ data }">
          <Skeleton v-if="loading" height="1.8rem" width="100%" />
          <TextSpoiler v-else :text="data.title" class="font-18-b" />
        </template>
      </Column>

      <Column field="body" header="Description" style="width: 48%">
        <template #body="{ data }">
          <Skeleton v-if="loading" height="1.8rem" width="100%" />
          <TextSpoiler v-else :text="data.body" class="font-18-r" />
        </template>
      </Column>

      <Column field="none" style="width: 20%">
        <template #body="{ data }">
          <div class="flex-center" :class="[loading && 'pointer-none']">
            <Button
              variant="text"
              severity="warn"
              :icon="pencil"
            />
            <Button
              variant="text"
              severity="error"
              :icon="trash"
              @click="deletePost(data.id)"
            />
            <Button
              label="Comments"
              variant="text"
              severity="secondary"
              :icon="arrowDown"
              :loading="loadingPostId === data.id && commentLoading"
              icon-pos="right"
              :class="{ expanded: expandedRows[data.id] }"
              @click.prevent="expansionHandler(data.id)"
            />
          </div>
        </template>
      </Column>

      <template #expansion="{ data }">
        <div class="comments-list" style="background: var(--site-bg)">
          <div v-if="!postCommentsMap.get(data.id)?.length" class="font-16-r colspan-5">
            No comments
          </div>
          <template v-else>
            <Card v-for="comment in postCommentsMap.get(data.id)" :key="comment.id">
              <template #content>
                {{ comment }}
              </template>
            </Card>
          </template>
        </div>
      </template>
    </DataTable>

    <template #page-footer>
      <Button
        v-if="!list.length"
        label="Load posts list"
        size="large"
        class="w-full"
        :loading="loading"
        @click="fetchPosts"
      />
      <div v-else class="flex-center">
        <Pagination
          v-model:page="page"
          buttons-size="large"
          class="mx-auto"
          :total-pages="totalPages"
          @update:page="fetchPosts"
        />
        <span class="font-20-b">
          {{ listCounts.current }} / {{ listCounts.total }}
        </span>
      </div>
    </template>
  </PageWrapper>
</template>

<style scoped lang="scss">
.expansion {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.6rem;
}

.comments-list {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.2rem;
  border-radius: var(--radius-m);
}

.expanded {
  :deep(svg) {
    transform: rotateX(180deg);
  }
}
</style>
