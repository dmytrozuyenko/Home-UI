import { ActionTree } from 'vuex';
import { UserStateInterface, UserActionTypes, UserMutationTypes } from '@/store/sign-in/types';
import { RootStateInterface } from '@/store/types';
import { HTTP } from '@/core/api/http-common';
import { AxiosResponse } from 'axios';
import router from '@/router';
import { Routes } from '@/router/types';

export const actions: ActionTree<UserStateInterface, RootStateInterface> = {
  [UserActionTypes.SIGN_IN]: ({ commit }, payload) => {
    HTTP.get('/users', { params: { email: payload.userData.email } })
      .then((r: AxiosResponse) => {
        if (r.data.length !== 0) {
          commit(UserMutationTypes.SET_USER, r.data[0]);
          commit(UserMutationTypes.SET_TOKEN, payload.userData);
        }
        payload.successCallback(r);
      })
      .catch(() => {
        payload.errorCallback();
      });
  },
};
