import { ContactInterface, ContactTypeEnum } from '../authorization/types';

export class PostContactModel {
  public type: ContactTypeEnum;
  public main: boolean;
  public email?: string;
  public phone?: number;
  constructor(contacts: ContactInterface) {
    this.type = contacts.type;
    this.main = contacts.main;
    this.email = contacts.email;
    this.phone = contacts.phone;
  }
}
