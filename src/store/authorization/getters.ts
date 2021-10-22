import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { AuthorizationStateInterface, Getters, UserInterface } from '@/store/authorization/types';

export const getters: GetterTree<AuthorizationStateInterface, RootStateInterface> & Getters = {
  loggedIn(state): boolean {
    return !!state.user;
  },
  userData(state): UserInterface | null {
    return state.user;
  },
};