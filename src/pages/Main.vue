<script setup lang="ts">
import {usePosts} from "@/composables/usePosts";

const {
  loading, posts, post, page,
  postLoading, buttonText, stateText,
  pageHandler,
  deleteHandler, postHandler, editHandler,
} = usePosts();

</script>

<template>
  <div class="main-wrapper">

    <div class="left">
      <div v-if="loading" class="state-info">
        Загрузка постов ...
      </div>

      <div v-else class="users-list">
        <div class="user" v-for="item in posts" :key="item.id" @click="editHandler(item)">
          id: {{item.id}} <br>
          title: {{item.title}} <br>
          body: {{item.body}} <br>
        </div>
      </div>

      <div class="pagination">
        <button v-for="number in 10" :key="number" :class="[number === page && 'active']" @click="pageHandler(number)">
          {{number}}
        </button>
      </div>
    </div>

    <form @submit.prevent="postHandler">

      <input v-model="post.title" required placeholder="Post title" :disabled="postLoading">
      <input v-model="post.body" required placeholder="Post body" :disabled="postLoading">

      <div class="state-info">
        {{stateText}}
      </div>

      <div class="buttons">
        <button v-if="post.id" :disabled="postLoading" @click.prevent="deleteHandler">
          {{postLoading ? '...' : 'Удалить'}}
        </button>
        <button :disabled="postLoading" type="submit">
          {{postLoading ? '...' : buttonText}}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 1rem;
  padding: 1.2rem;
  justify-content: center;
  button {
    background: none;
    border: 1px solid var(--black);
    color: var(--black);
    min-width: 4.5rem;
    &:hover, &.active {
      border-color: var(--white);
      color: var(--white);
      background: var(--black);
    }
  }
}
.main-wrapper {
  padding: 3rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: flex-start;
}
.users-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.user {
  padding: 1rem;
  font-size: 2rem;
  border: 1px solid var(--black);
  border-radius: .5rem;
  cursor: pointer;
}
.state-info {
  font-size: 2rem;
  text-align: center;
  padding: 2rem;
}
form {
  padding: 2rem;
  border: 1px solid var(--black);
  border-radius: .5rem;
  display: flex;
  flex-direction: column;

  input {
    width: 100%;
    background: none;
    color: var(--primary-color);
    padding: 1rem;
    font-size: 2rem;
    border: 1px solid currentColor;
    border-radius: .5rem;
    margin-bottom: 1rem;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    button {
      flex-grow: 1;
    }
  }
}
</style>
