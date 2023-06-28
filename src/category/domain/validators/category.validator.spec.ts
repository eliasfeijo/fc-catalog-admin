import CategoryValidatorFactory, {
  CategoryValidationRules,
  CategoryValidator,
} from "./category.validator";

describe("CategoryValidator Unit Tests", () => {
  let validator: CategoryValidator;

  beforeEach(() => {
    validator = CategoryValidatorFactory.create();
  });

  test("invalid name", () => {
    expect(validator.validate(null)).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name should not be empty",
      "name must be a string",
      "name must be shorter than or equal to 255 characters",
    ]);
    expect(validator.validate({ name: "" })).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name should not be empty",
    ]);
    expect(validator.validate({ name: 1 as any })).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name must be a string",
      "name must be shorter than or equal to 255 characters",
    ]);

    expect(validator.validate({ name: "a".repeat(256) })).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name must be shorter than or equal to 255 characters",
    ]);
  });

  test("valid fields", () => {
    const arrange: CategoryValidationRules[] = [
      { name: "name" },
      { name: "name", description: "description" },
      { name: "name", is_active: true },
      { name: "name", created_at: new Date() },
    ];
    arrange.forEach((item) => {
      expect(validator.validate(item)).toBeTruthy();
      expect(validator.errors).toBeNull();
      expect(validator.validatedData).toStrictEqual(
        new CategoryValidationRules(item)
      );
    });
  });
});
