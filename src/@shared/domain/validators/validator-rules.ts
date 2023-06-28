import { ValidationError } from "../errors/validation.error";

export default class ValidatorRules {
  private constructor(private value: any, private property: string) {}

  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }

  isRequired(): Omit<this, "isRequired"> {
    if (this.value === null || this.value === undefined || this.value === "")
      throw new ValidationError(`${this.property} is required`);
    return this;
  }

  isString(): Omit<this, "isString"> {
    if (!isNil(this.value) && typeof this.value !== "string")
      throw new ValidationError(`${this.property} must be a string`);
    return this;
  }

  maxLength(max: number): Omit<this, "maxLength"> {
    if (!isNil(this.value) && this.value.length > max)
      throw new ValidationError(
        `${this.property} must be less than ${max} characters`
      );
    return this;
  }

  isBoolean(): Omit<this, "isBoolean"> {
    if (!isNil(this.value) && typeof this.value !== "boolean")
      throw new ValidationError(`${this.property} must be a boolean`);
    return this;
  }
}

export const isNil = (value: any) => {
  return value === null || value === undefined;
};
