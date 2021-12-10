import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { OwnershipsStateInterface, Getters } from '@/store/ownerships/types';

export const getters: GetterTree<OwnershipsStateInterface, RootStateInterface> & Getters = {
  getOwnershipsData: (state) => {
    return state.ownerships;
  },
};
