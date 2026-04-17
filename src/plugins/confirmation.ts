import type { ConfirmationTypes, IProps } from '@/store/confirmations/types';
import { useConfirmationsStore } from '@/store/confirmations';

const create = (type: ConfirmationTypes) => async (props: Omit<IProps, 'type'>): Promise<boolean> => {
  const store = useConfirmationsStore();
  const { id, result } = await store.setConfirmation({ ...props, type });
  const confirmation = store.confirmations.find(dialog => dialog.id === id);
  if (confirmation) confirmation.visible = false;
  return result;
};

export const $confirm: Record<ConfirmationTypes, (props: Omit<IProps, 'type'>) => Promise<boolean>> = {
  default: create('default'),
  info: create('info'),
  success: create('success'),
  error: create('error'),
};
