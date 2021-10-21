import { ActionContext } from 'vuex';
import { requestPayload, RootStateInterface } from '@/store/types';
import { CooperationRequestModel } from '@/store/cooperation/models/request-cooperation.model';
import { CooperationUpdateModel } from '@/store/cooperation/models/update-cooperation.model';
import { AddressUpdateModel } from '@/share/update-address.model';

export enum CooperationMutationEnum {
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
  SET_USER_COOPERATIONS = 'SET_USER_COOPERATIONS',
  SET_SELECTED_COOPERATION = 'SET_SELECTED_COOPERATION',
  SET_COOPERATION_UPDATE = 'SET_COOPERATION_UPDATE',
  SET_IS_COOPERATIONS_LOADED = 'SET_IS_COOPERATIONS_LOADED',
}

export enum CooperationActionEnum {
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
  SET_USER_COOPERATIONS = 'SET_USER_COOPERATIONS',
  SET_SELECTED_COOPERATION = 'SET_SELECTED_COOPERATION',
  CREATE_COOPERATION = 'CREATE_COOPERATION',
  SET_COOPERATION_UPDATE = 'SET_COOPERATION_UPDATE',
}

export interface CooperationStateInterface {
  userCooperations: Array<CooperationInterface>;
  selectedCooperation: null | CooperationInterface;
  displayModal: boolean;
}

export type Mutations<S = CooperationStateInterface> = {
  [CooperationMutationEnum.SET_MODAL_DISPLAY](state: S, payload: boolean): void;

  [CooperationMutationEnum.SET_USER_COOPERATIONS](state: S, payload: Array<CooperationRequestModel>): void;
  // [CooperationMutationEnum.SET_USER_COOPERATIONS](state: S, payload: Array<CooperationInterface>): void;
  [CooperationMutationEnum.SET_SELECTED_COOPERATION](state: S, payload: number): void;
};

export interface Actions {
  [CooperationActionEnum.CREATE_COOPERATION](
    { commit }: AugmentedActionContext,
    payload: requestPayload<CooperationRegistrationInterface>
  ): void;
  [CooperationActionEnum.SET_MODAL_DISPLAY]({ commit }: AugmentedActionContext, payload: boolean): void;
  [CooperationActionEnum.SET_USER_COOPERATIONS]({ commit }: AugmentedActionContext): void;
  [CooperationActionEnum.SET_SELECTED_COOPERATION]({ commit }: AugmentedActionContext, payload: number): void;
  [CooperationActionEnum.SET_COOPERATION_UPDATE](
    { commit }: AugmentedActionContext,
    payload: CooperationUpdateModel
  ): void;
}

export type Getters<S = CooperationStateInterface> = {
  getCooperationNameAndEdrpou(state: S): string;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<CooperationStateInterface, RootStateInterface>, 'commit'>;

export interface CooperationRegistrationInterface {
  edrpou: string;
  email: string;
}

export interface CooperationInterface {
  id: number;
  name: string;
  edrpou: string;
  // usreo: string;
  iban: string;
  houses: CooperationHousesInterface[];
  contacts: CooperationContactsInterface[];
  address: CooperationAddressInterface;
}

export interface CooperationDTOInterface {
  id: number;
  name: string;
  usreo: string;
  iban: string;
  // houses: CooperationHousesInterface[];
  contacts: CooperationContactsInterface[];
  address: CooperationAddressDTOInterface;
}

export interface CooperationAddressInterface {
  region: string;
  city: string;
  district: string;
  street: string;
  houseBlock: string;
  houseNumber: string;
  zipCode: string;
}

export interface CooperationAddressDTOInterface {
  region: string;
  city: string;
  district: string;
  street: string;
  house_block: string;
  house_number: string;
  zip_code: string;
}

export interface CooperationHousesInterface {
  id: number;
  quantityFlat: number;
  houseArea: number;
  adjoiningArea: number;
  address: CooperationAddressInterface;
}

export interface CooperationContactsInterface {
  type: string;
  main: boolean;
  phone: string;
  email: string;
}
