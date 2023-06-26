import InvalidUuidError from "../errors/invalid-uuid.error";
import { v4 as uuid, validate as uuidValidate } from "uuid";

export class UniqueEntityId {
  constructor(public readonly value?: string) {
    this.value = value ?? uuid();
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.value);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
