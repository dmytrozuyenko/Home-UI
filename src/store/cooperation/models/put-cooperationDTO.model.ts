import { CooperationContactsInterface } from '@/store/cooperation/types';
import { AddressDTOModel } from '@/shared/models/addressDTO.model';
import { CooperationModel } from './cooperation.model';

export class CooperationPutDTOModel {
  public id: number;
  public name: string;
  public usreo: string;
  public iban: string;
  public address: AddressDTOModel;
  public contacts: Array<CooperationContactsInterface>;

  constructor(data: CooperationModel) {
    this.id = data.id;
    this.name = data.name;
    this.usreo = data.edrpou;
    this.iban = data.iban;
    this.address = new AddressDTOModel(data.address);
    this.contacts = data.contacts;
  }
}
