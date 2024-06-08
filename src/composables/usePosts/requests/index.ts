import $axios from "@/api";
import {computed, ref} from "vue";
import {IPost, IPostFilter} from "../types";
import {setPost} from "../models";

import {useFetchStates} from "@/composables/useFetchStates";
import {useFilter} from "@/composables/useFilter";

export const usePostRequests = () => {
  const endpoint = '/posts';
  const {loading, sending, sended, deleting, deleted} = useFetchStates();
  const {page, limit} = useFilter();

  const posts = ref<IPost[]>([]);
  const post = ref<IPost>(setPost());

  const params = computed<IPostFilter>(() => {
    return {
      _page: page.value,
      _limit: limit.value,
    }
  });

  const getList = async () => {
    try {
      loading.value = true
      await new Promise(resolve => setTimeout(resolve, 2000))

      const result = await $axios.get<IPost[]>(endpoint, {params: params.value})
      posts.value = result.data
    }
    catch (e) {
      console.log(e) // add error handling toast or something else
    }
    finally {
      loading.value = false
    }
  }

  const getItem = async (id: number) => {
    try {
      loading.value = true
      const result = await $axios.get<IPost>(`${endpoint}/${id}`)
      post.value = setPost(result.data)
    }
    catch (e) {
      console.log(e) // add error handling toast or something else
    }
    finally {
      loading.value = false
    }
  }

  const postItem = async () => {
    try {
      sending.value = true
      await new Promise(resolve => setTimeout(resolve, 2000))

      await $axios.request({
        method: post.value.id ? 'put' : 'post',
        url: `${endpoint}/${post.value?.id ?? ''}`
      })

      sended.value = true
    }
    catch (e) {
      console.log(e) // add error handling toast or something else
    }
    finally {
      sending.value = false
    }
  }

  const deleteItem = async (id: number) => {
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
    }
  }

  return {
    post,
    posts,
    page,


    loading,
    sending,
    sended,
    deleting,
    deleted,

    getList,
    getItem,
    postItem,
    deleteItem,
  }
}
