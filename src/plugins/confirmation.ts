import {useConfirmationsStore} from "@/store/confirmations";
import {ConfirmationTypes, IProps} from "@/store/confirmations/types";


const create = (type: ConfirmationTypes) => async (props: Omit<IProps, 'type'>): Promise<boolean> => {
  const {setConfirmation, closeConfirmation} = useConfirmationsStore();
  const {id, result} = await setConfirmation({...props, type})
  closeConfirmation(id)
  return result
}

export const $confirm: Record<ConfirmationTypes, (props: Omit<IProps, "type">) => Promise<boolean>> = {
  default: create('default'),
  success: create('success'),
  info: create('info'),
  warning: create('warning'),
  error: create('error'),
}
