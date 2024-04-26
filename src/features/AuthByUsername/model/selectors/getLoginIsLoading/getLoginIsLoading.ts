import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginIsLoading = (state: StateSchema) => state?.LoginForm?.isLoading || false;
