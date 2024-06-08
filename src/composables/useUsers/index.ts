import {useUserRequests} from "./requests";
import {computed, onBeforeMount} from "vue";
import {IUser} from "./types";
import {setUser} from "@/composables/useUsers/models";
export const useUsers = () => {
  const {
    loading, users, user, getUsers, getUser,
    sending, sended, postUser,
    deleting, deleted, deleteUser
  } = useUserRequests();

  const buttonText = computed<string>(() => {
    return user.value.id ? 'Обновить' : 'Сохранить'
  });

  const stateText = computed<string>(() => {
    if (sending.value) return !user.value.id ? 'Отправка пользователя' : 'Обновление пользователя'
    if (sended.value) return 'Успешно'
    if (deleting.value) return 'Удаление пользователя'
    if (deleted.value) return 'Пользователь удалён'
    return ''
  });

  const userLoading = computed(() => loading.value || sending.value || deleting.value)

  const editHandler = (value: IUser) => {
    user.value = setUser(value)
  }

  const postHandler = async () => {
    await postUser()
    user.value = setUser()
  }

  const deleteHandler = async () => {
    await deleteUser(user.value.id as number)
    user.value = setUser()
  }

  onBeforeMount(() => {
    getUsers();
  });

  return {
    user,
    users,
    loading,

    userLoading,

    stateText,
    buttonText,
    editHandler,


    getUser,
    postHandler,
    deleteHandler,
  }
}
