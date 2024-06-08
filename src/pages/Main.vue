<script setup lang="ts">
import {useUsers} from "@/composables/useUsers";

const {
  user, users, userLoading,
  postHandler, deleteHandler,
  stateText, buttonText, editHandler,
} = useUsers();
</script>

<template>
  <div class="main-wrapper">
    <div class="users-list">
      <div class="user" v-for="item in users" :key="item.id" @click="editHandler(item)">
        User: {{item.id}} <br>
        Name: {{item.name}} <br>
        Email: {{item.email}} <br>
      </div>
    </div>

    <form @submit.prevent="postHandler">
      <input v-model="user.name" required placeholder="Имя пользователя" :disabled="userLoading">
      <input v-model="user.email" required placeholder="E-mail" :disabled="userLoading">

      <div class="state-info">
        {{stateText}}
      </div>

      <div class="buttons">
        <button v-if="user.id" :disabled="userLoading" @click.prevent="deleteHandler">
          {{userLoading ? '...' : 'Удалить'}}
        </button>
        <button :disabled="userLoading" type="submit">
          {{userLoading ? '...' : buttonText}}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.main-wrapper {
  padding: 3rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
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
}

form {
  padding: 2rem;
  border: 1px solid var(--black);
  border-radius: .5rem;
  display: flex;
  flex-direction: column;
  .state-info {
    margin-top: auto;
    font-size: 2rem;
    text-align: center;
    padding: 2rem;
  }
  input {
    width: 100%;
    background: none;
    color: var(--black);
    padding: 1rem;
    font-size: 2rem;
    border: 1px solid var(--black);
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
