import $axios from "@/api";
import {ref} from "vue";
import {IUser} from "../types";
import {setUser} from "../models";

import {useFetchStates} from "@/composables/useFetchStates";
export const useUserRequests = () => {
  const endpoint = '/users';
  const {loading, sending, sended, deleting, deleted} = useFetchStates();

  const users = ref<IUser[]>([]);
  const user = ref<IUser>(setUser());

  const getUsers = async () => {
    try {
      loading.value = true
      const result = await $axios.get<IUser[]>(endpoint)
      users.value = result.data
    }
    catch (e) {
      console.log(e) // add error handling toast or something else
    }
    finally {
      loading.value = false
    }
  }
  const getUser = async (id: number) => {
    try {
      loading.value = true
      const result = await $axios.get<IUser>(`${endpoint}/${id}`)
      user.value = setUser(result.data)
    }
    catch (e) {
      console.log(e) // add error handling toast or something else
    }
    finally {
      loading.value = false
    }
  }

  const postUser = async () => {
    try {
      sending.value = true
      await new Promise(resolve => setTimeout(resolve, 2000))

      await $axios.request({
        method: user.value.id ? 'put' : 'post',
        url: `${endpoint}/${user.value?.id ?? ''}`
      })

      sended.value = true
    }
    catch (e) {
      console.log(e) // add error handling toast or something else
    }
    finally {
      sending.value = false
      await getUsers() // optional
    }
  }

  const deleteUser = async (id: number) => {
    try {
      deleting.value = true
      await new Promise(resolve => setTimeout(resolve, 2000))
      await $axios.delete(`${endpoint}/${id}`)
      deleted.value = true
    }
    catch (e) {
      console.log(e) // add error handling toast or something else
    }
    finally {
      deleting.value = false
      await getUsers() // optional
    }
  }

  return {
    user,
    users,

    loading,
    sending,
    sended,
    deleting,
    deleted,

    getUsers,
    getUser,
    postUser,
    deleteUser,
  }
}
