import { UserContactInterface } from './../user/types';

export class PostContactModel {
  public type: string;
  public main: boolean;
  public email?: string;
  public phone?: number;
  public id?: number;
  constructor(contacts: UserContactInterface) {
    this.type = contacts.type;
    this.main = contacts.main;
    this.email = contacts.email;
    this.phone = contacts.phone;
    this.id = contacts.id;
  }
}
