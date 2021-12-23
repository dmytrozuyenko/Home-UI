import { ActionContext } from 'vuex';
import { requestPayload, RootStateInterface } from '@/store/types';

export enum AuthMutationEnum {
  SET_USER = 'SET_USER',
  SET_FORM = 'SET_FORM',
  UPDATE_CONTACT = 'UPDATE_CONTACT',
  ADD_CONTACT = 'ADD_CONTACT',
}

export enum AuthActionEnum {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  GET_DATA = 'GET_DATA',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_CONTACT = 'DELETE_CONTACT',
  ADD_CONTACT = 'ADD_CONTACT',
}

export enum ContactTypeEnum {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

export interface UserInterface {
  first_name: string;
  middle_name: string;
  last_name: string;
  email?: string;
  id?: number;
  contacts?: UserContactInterface[];
}

export interface UpdateUserInterface {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  password: string;
  contacts: UserContactInterface[];
}

export interface UserContactInterface {
  type: ContactTypeEnum;
  main: boolean;
  email?: string;
  phone?: number;
  id?: number;
}

export interface UpdateUserFullNameInterface {
  first_name: string;
  middle_name: string;
  last_name: string;
}

export interface AuthorizationStateInterface {
  user: UserInterface | null;
}

export type Mutations<S = AuthorizationStateInterface> = {
  [AuthMutationEnum.SET_USER](state: S, payload: UserInterface | null): void;
  [AuthMutationEnum.SET_FORM](state: S, payload: UpdateUserFullNameInterface): void;
  [AuthMutationEnum.ADD_CONTACT](state: S, payload: UserContactInterface): void;
  [AuthMutationEnum.UPDATE_CONTACT](state: S, payload: number): void;
};

export interface Actions {
  [AuthActionEnum.SIGN_IN]({ commit }: AugmentedActionContext, payload: requestPayload<UserLoginInterface>): void;
  [AuthActionEnum.UPDATE_USER]({ commit }: AugmentedActionContext, payload: UpdateUserInterface): void;
  [AuthActionEnum.SIGN_OUT]({ commit }: AugmentedActionContext, payload: null): void;
  [AuthActionEnum.GET_DATA]({ commit }: AugmentedActionContext, payload: string): void;
  [AuthActionEnum.DELETE_CONTACT]({ state, commit }: AugmentedActionContext, payload: number): void;
  [AuthActionEnum.ADD_CONTACT]({ state, commit }: AugmentedActionContext, payload: any): void;
}

export type Getters<S = AuthorizationStateInterface> = {
  loggedIn(state: S): boolean;
  userData(state: S): UserInterface | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<AuthorizationStateInterface, RootStateInterface>, 'commit'>;

export interface UserLoginInterface {
  id: number;
  email: string;
  password: string;
}
