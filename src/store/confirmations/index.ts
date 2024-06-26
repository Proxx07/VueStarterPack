import {defineStore} from "pinia";
import {h, ref} from "vue";
import VConfirm from "@/components/UI/confirmations/VConfirm.vue";
import {IConfirmation, IConfirmResponse, IProps} from "@/store/confirmations/types";

export const useConfirmationsStore = defineStore('confirmations', () => {
  const confirmations = ref<IConfirmation[]>([]);
  const closeConfirmation = (id: number) => {
    confirmations.value = confirmations.value.filter(i => i.id !== id)
  };

  const setConfirmation = (props: IProps) => {
    const id = Date.now();
    return new Promise<IConfirmResponse>((resolve) => {
      const component = {
        id: id,
        component: h(VConfirm, {
          ...props,
          onAccept: () => {
            const result = true
            resolve({id, result})
          },
          onReject: () => {
            const result = false
            resolve({id, result})
          },
        })
      }
      confirmations.value.push(component)
    });
  };

  return {
    confirmations,
    setConfirmation,
    closeConfirmation,
  }
});
