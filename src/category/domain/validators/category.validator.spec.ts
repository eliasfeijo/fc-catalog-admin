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
    expect({ validator, data: null }).toContainErrorMessages({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });
    expect({ validator, data: { name: "" } }).toContainErrorMessages({
      name: ["name should not be empty"],
    });
    expect({ validator, data: { name: 1 as any } }).toContainErrorMessages({
      name: [
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });
    expect({
      validator,
      data: { name: "a".repeat(256) },
    }).toContainErrorMessages({
      name: ["name must be shorter than or equal to 255 characters"],
    });
  });

  test("invalid description", () => {
    expect({
      validator,
      data: { name: "name", description: 1 as any },
    }).toContainErrorMessages({
      description: [
        "description must be a string",
        "description must be shorter than or equal to 255 characters",
      ],
    });
    expect({
      validator,
      data: { name: "name", description: "a".repeat(256) },
    }).toContainErrorMessages({
      description: [
        "description must be shorter than or equal to 255 characters",
      ],
    });
  });

  test("invalid is_active", () => {
    expect({
      validator,
      data: { name: "name", is_active: 1 as any },
    }).toContainErrorMessages({
      is_active: ["is_active must be a boolean value"],
    });
    expect({
      validator,
      data: { name: "name", is_active: 0 as any },
    }).toContainErrorMessages({
      is_active: ["is_active must be a boolean value"],
    });
    expect({
      validator,
      data: { name: "name", is_active: "true" as any },
    }).toContainErrorMessages({
      is_active: ["is_active must be a boolean value"],
    });
    expect({
      validator,
      data: { name: "name", is_active: "false" as any },
    }).toContainErrorMessages({
      is_active: ["is_active must be a boolean value"],
    });
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
