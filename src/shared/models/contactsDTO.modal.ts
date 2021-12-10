import { ContactsModel } from './contacts.modal';

export class ContactsDTOModel {
  public id: number;
  public type: string;
  public main: boolean;
  public phone?: string;
  public email?: string;

  constructor(contacts: ContactsModel) {
    this.id = contacts.id;
    this.type = contacts.type;
    this.main = contacts.main;
    this.phone = contacts.phone;
    this.email = contacts.email;
  }
}
