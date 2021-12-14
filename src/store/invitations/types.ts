import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';

export enum InvitationsMutationsEnum {
  GET_ALL_INVITATIONS = 'GET_ALL_INVITATIONS',
}

export enum InvitationsActionsEnum {
  GET_ALL_INVITATIONS = 'GET_ALL_INVITATIONS',
}

export interface InvitationInterface {
  email: string;
  address: string;
  status: string;
  id: number;
}

// export interface AddressInterface {
//   street: string;
//   houseBlock: string;
//   houseNumber: string;
// }

export interface InvitationsStateInterface {
  invitations: Array<InvitationInterface>;
}

export type Mutations<S = InvitationsStateInterface> = {
  [InvitationsMutationsEnum.GET_ALL_INVITATIONS](state: S, payload: Array<InvitationInterface>): void;
};

export interface Actions {
  [InvitationsActionsEnum.GET_ALL_INVITATIONS](
    { commit }: AugmentedActionContext,
    payload: Array<InvitationInterface>
  ): void;
}

export type Getters<S = InvitationsStateInterface> = {
  getInvitations(state: S): Array<InvitationInterface> | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<InvitationsStateInterface, RootStateInterface>, 'commit'>;