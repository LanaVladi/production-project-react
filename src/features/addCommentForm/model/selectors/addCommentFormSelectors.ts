import { StateSchema } from '../../../../app/providers/StoreProvider';

export const getAddCommentFormText = (state: StateSchema) => state.addCommentForm?.text ?? '';
// если использвать ??, то при вернет правую часть, если левая будет null или undefined
export const getAddCommentFormError = (state: StateSchema) => state.addCommentForm?.error;
