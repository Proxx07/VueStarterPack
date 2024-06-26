import {usePostRequests} from "./requests";
import {computed, onBeforeMount} from "vue";
import {IPost} from "./types";
import {setPost} from "./models";
export const usePosts = () => {
  const {
    loading, posts, post, page, getList,
    sending, sended, postItem,
    deleting, deleted, deleteItem
  } = usePostRequests();

  const buttonText = computed<string>(() => {
    return post.value.id ? 'Обновить' : 'Сохранить'
  });

  const stateText = computed<string>(() => {
    if (sending.value) return !post.value.id ? 'Отправка поста...' : 'Обновление поста...'
    if (sended.value) return 'Пост отправлен :)'
    if (deleting.value) return 'Удаление поста'
    if (deleted.value) return 'Пост удалён :)'
    return ''
  });

  const postLoading = computed(() => loading.value || sending.value || deleting.value)

  const editHandler = (value: IPost) => {
    post.value = setPost(value)
  }

  const postHandler = async () => {
    await postItem()
    await getList()
    if (post.value.id) {
      posts.value = posts.value.map(item => item.id === post.value.id ? {...item, ...post.value} : item)
    }
    else {
      posts.value = [{id: Date.now(), ...post.value}, ...posts.value]
    }
    post.value = setPost()
  }

  const deleteHandler = async () => {
    await deleteItem( post.value.id as number)
    await getList()
    posts.value = posts.value.filter(item => post.value.id !== item.id)
    post.value = setPost()
  }

  const pageHandler = async (value: number) => {
    page.value = value
    await getList();
  }

  onBeforeMount(() => {
    getList();
  });

  return {
    posts,
    post,
    page,

    loading,

    postLoading,

    stateText,
    buttonText,
    editHandler,
    pageHandler,

    postHandler,
    deleteHandler,
  }
}
