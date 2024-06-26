import {useConfirmationsStore} from "@/store/confirmations";
import {ConfirmationTypes, IProps} from "@/store/confirmations/types";
const {setConfirmation, closeConfirmation} = useConfirmationsStore();

export const $confirm: Record<ConfirmationTypes, (props: Omit<IProps, "type">) => Promise<boolean>> = {
  default: async (props: Omit<IProps, 'type'>) => {
    const {id, result} = await setConfirmation({...props, type: 'default'})
    closeConfirmation(id)
    return result
  },

  success: async (props: Omit<IProps, 'type'>) => {
    const {id, result} = await setConfirmation({...props, type: 'success'})
    closeConfirmation(id)
    return result
  },

  info: async (props: Omit<IProps, 'type'>) => {
    const {id, result} = await setConfirmation({...props, type: 'info'})
    closeConfirmation(id)
    return result
  },

  warning: async (props: Omit<IProps, 'type'>) => {
    const {id, result} = await setConfirmation({...props, type: 'warning'})
    closeConfirmation(id)
    return result
  },

  error: async (props: Omit<IProps, 'type'>) => {
    const {id, result} = await setConfirmation({...props, type: 'error'})
    closeConfirmation(id)
    return result
  },

}
