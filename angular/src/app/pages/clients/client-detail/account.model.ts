import { Deserializable } from 'src/app/shared/deserializable.model';

export type currency = 'GEL' | 'USD' | 'EUR' | 'RUB';

export class Account implements Deserializable {

  public id: number;
  public clientId: number;
  public type: 'მიმდინარე' | 'შემნახველი' | 'დაგროვებითი';
  public currency: currency[];
  public status: 'აქტიური' | 'დახურული';

  public deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
