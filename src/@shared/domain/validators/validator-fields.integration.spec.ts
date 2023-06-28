import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import ValidatorFields from "./validator-fields";

class StubValidationRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor(data: StubValidationRules) {
    Object.assign(this, data);
  }
}
class StubValidatorFields extends ValidatorFields<StubValidationRules> {
  validate(data: StubValidationRules): boolean {
    return super.validate(new StubValidationRules(data));
  }
}

describe("ValidatorFields Integration Tests", () => {
  it("should validate data", () => {
    const validator = new StubValidatorFields();
    expect(validator.validate(null)).toBeFalsy();
    expect(validator.errors).toStrictEqual({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
      price: [
        "price should not be empty",
        "price must be a number conforming to the specified constraints",
      ],
    });
  });

  it("should be valid", () => {
    const validator = new StubValidatorFields();
    expect(
      validator.validate({ name: "Product Name", price: 10 })
    ).toBeTruthy();
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toStrictEqual(
      new StubValidationRules({
        name: "Product Name",
        price: 10,
      })
    );
  });
});
