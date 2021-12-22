import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { HousesStateInterface, HousesMutationsEnum, HousesActionsEnum, Actions } from '@/store/houses/types';
import { HTTP } from '@/core/api/http-common';

export const actions: ActionTree<HousesStateInterface, RootStateInterface> & Actions = {
  [HousesActionsEnum.SET_HOUSES]: ({ commit }) => {
    HTTP.get(`/cooperations/1/houses`).then((r) => {
      commit(HousesMutationsEnum.SET_HOUSES, r.data);
    });
  },

  [HousesActionsEnum.EDIT_HOUSE]: async ({ commit }, payload) => {
    try {
      await HTTP.put(`/cooperations/${payload.cooperationId}/houses/${payload.id}`, payload).then(() => {
        commit(HousesMutationsEnum.EDIT_HOUSE, payload);
      });
    } catch (err: any) {
      console.log('error EDIT_HOUSE', err);
    }
  },
  [HousesActionsEnum.DELETE_HOUSE]: async ({ commit }, payload) => {
    try {
      await HTTP.delete(`/cooperations/${payload.cooperationId}/houses/${payload.id}`).then(() => {
        commit(HousesMutationsEnum.DELETE_HOUSE, payload);
      });
    } catch (err: any) {
      console.log('error DELETE_HOUSE', err);
    }
  },
  [HousesActionsEnum.GET_HOUSE_BY_ID]: ({ commit }, payload) => {
    HTTP.get(`/cooperations/${payload.cooperationID}/houses/${payload.houseID}`).then((r) => {
      commit(HousesMutationsEnum.GET_HOUSE_BY_ID, r.data);
    });
  },
  [HousesActionsEnum.ADD_HOUSE]: async ({ commit }, payload) => {
    try {
      const { data } = await HTTP.post(`/cooperations/${payload.cooperationId}/houses`, payload);
      commit(HousesMutationsEnum.ADD_HOUSE, data);
    } catch (e: any) {
      console.log(e.response);
    }
  },
};
