import { Deserializable } from 'src/app/shared/deserializable.model';
import { environment } from 'src/environments/environment';

export interface IAddress {
  country: string;
  city: string;
  address: string;
}

export class Client implements Deserializable {

  get fullName(): string {
    return `${this.name} ${this.surname}`;
  }

  get fullLegalAddress(): string {
    return `${this.legalAddress.country}, ${this.legalAddress.city}, ${this.legalAddress.address}`;
  }

  get fullActualAddress(): string {
    return `${this.actualAddress.country}, ${this.actualAddress.city}, ${this.actualAddress.address}`;
  }

  get avatarUrl() {
    return !this.avatar ?
      '/assets/images/default-avatar.png' :
      environment.uploadDir + this.avatar;
  }

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
