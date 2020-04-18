import { Deserializable } from 'src/app/shared/deserializable.model';

export interface IAddress {
  country: string;
  city: string;
  address: string;
}

export class Clients implements Deserializable {
  public id: number;
  public name: string;
  public surname: string;
  public sex: string;
  public personalNumber: number;
  public phone: number;
  public legalAddress: IAddress;
  public actualAddress: IAddress;
  public avatar: string;

  public deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
