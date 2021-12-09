import { MutationTree } from 'vuex';
import { HousesStateInterface, HousesMutationsEnum, Mutations } from '@/store/houses/types';

export const mutations: MutationTree<HousesStateInterface> & Mutations = {
  [HousesMutationsEnum.SET_HOUSES]: (state, payload) => {
    state.houses = payload;
  },
  [HousesMutationsEnum.SET_MODAL_DISPLAY]: (state, payload) => {
    state.displayModal = payload;
  },
  [HousesMutationsEnum.GET_HOUSE_BY_ID]: (state, payload) => {
    state.houseInfo = payload;
  },
  [HousesMutationsEnum.ADD_HOUSE]: (state, payload) => {
    state.houses?.push(payload);
  },
};
