import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { OwnershipsModel } from '@/shared/models/ownerships.model';

export enum OwnershipsActionEnum {
  SET_OWNERSHIPS = 'SET_OWNERSHIPS',
  EDIT_OWNER = 'EDIT_OWNER',
  DELETE_OWNER = 'DELETE_OWNER',
}

export enum OwnershipsMutationEnum {
  SET_OWNERSHIPS = 'SET_OWNERSHIPS',
  EDIT_OWNER = 'EDIT_OWNER',
  DELETE_OWNER = 'DELETE_OWNER',
}

export interface OwnershipsStateInterface {
  ownerships: Array<OwnershipsModel> | null;
}

export interface Actions {
  [OwnershipsActionEnum.SET_OWNERSHIPS]({ commit }: AugmentedActionContext, payload: number): void;
  [OwnershipsActionEnum.DELETE_OWNER]({ commit }: AugmentedActionContext, payload: Record<string, unknown>): void;
}

export type Mutations<S = OwnershipsStateInterface> = {
  [OwnershipsMutationEnum.SET_OWNERSHIPS](state: S, payload: Array<OwnershipsModel>): void;
  [OwnershipsMutationEnum.DELETE_OWNER](state: any, payload: Record<string, unknown>): void;
};

export type Getters<S = OwnershipsStateInterface> = {
  getOwnershipsData(state: S): Array<OwnershipsModel> | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<OwnershipsStateInterface, RootStateInterface>, 'commit'>;