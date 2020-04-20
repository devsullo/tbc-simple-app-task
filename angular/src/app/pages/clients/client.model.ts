import { Deserializable } from 'src/app/shared/deserializable.model';

export interface IAddress {
  country: string;
  city: string;
  address: string;
}

export class Client implements Deserializable {
  public id: number;
  public name: string;
  public surname: string;
  public sex: string;
  public personalNumber: number;
  public phone: string;
  public legalAddress: IAddress;
  public actualAddress: IAddress;
  public avatar: string;

  public deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
