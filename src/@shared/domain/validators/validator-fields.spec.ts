import ValidatorFields from "./validator-fields";
import * as classValidator from "class-validator";

class StubValidatorFields extends ValidatorFields<{ field: string }> {}
describe("ValidatorFields Unit Tests", () => {
  it("should initialize errors and validatedData with null", () => {
    const validator = new StubValidatorFields();
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toBeNull();
  });

  it("should validate data", () => {
    const spyValidator = jest.spyOn(classValidator, "validateSync");
    spyValidator.mockReturnValue([
      {
        property: "field",
        constraints: {
          isNotEmpty: "field is required",
        },
      },
    ]);
    const validator = new StubValidatorFields();
    expect(validator.validate({ field: null })).toBeFalsy();
    expect(spyValidator).toBeCalledTimes(1);
    expect(validator.errors).toStrictEqual({ field: ["field is required"] });
    expect(validator.validatedData).toStrictEqual(null);
  });
});
