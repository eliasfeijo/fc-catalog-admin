import ValidationError from "../errors/validation.error";
import ValidatorRules from "./validator-rules";

type Values = {
  value: any;
  property: string;
};

type RuleAssertion = Values & {
  rule: keyof ValidatorRules;
  error?: ValidationError;
  params?: any[];
};

const assertRule = ({
  value,
  property,
  rule,
  error,
  params = [],
}: RuleAssertion) => {
  const expected = expect(() => {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule];
    // @ts-expect-error - I don't know how to fix this
    method.apply(validator, params);
  });
  if (error) {
    return expected.toThrowError(error);
  }
  return expected.not.toThrowError();
};

describe("ValidatorRules Unit Tests", () => {
  test("value method", () => {
    const validator = ValidatorRules.values("value", "property");
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("value");
    expect(validator["property"]).toBe("property");
  });

  test("isRequired validation rule", () => {
    const rule = "isRequired";
    const error = new ValidationError("property is required");
    let arrange: RuleAssertion[] = [
      {
        value: null,
        property: "property",
        rule,
        error,
      },
      {
        value: undefined,
        property: "property",
        rule,
        error,
      },
      { value: "", property: "property", rule, error },
    ];

    arrange.forEach((item) => {
      assertRule(item);
    });

    arrange = [
      {
        value: "value",
        property: "property",
        rule,
      },
      { value: 0, property: "property", rule },
      {
        value: false,
        property: "property",
        rule,
      },
    ];

    arrange.forEach((item) => {
      assertRule(item);
    });
  });

  test("isString validation rule", () => {
    const rule = "isString";
    const error = new ValidationError("property must be a string");
    let arrange: RuleAssertion[] = [
      {
        value: 1,
        property: "property",
        rule,
        error,
      },
      {
        value: true,
        property: "property",
        rule,
        error,
      },
      { value: {}, property: "property", rule, error },
      { value: [], property: "property", rule, error },
      { value: () => {}, property: "property", rule, error },
      { value: new Date(), property: "property", rule, error },
    ];

    arrange.forEach((item) => {
      assertRule(item);
    });

    arrange = [
      {
        value: "value",
        property: "property",
        rule,
      },
      { value: "", property: "property", rule },
      { value: null, property: "property", rule },
      { value: undefined, property: "property", rule },
    ];

    arrange.forEach((item) => {
      assertRule(item);
    });
  });

  test("maxLength validation rule", () => {
    const rule = "maxLength";
    const params = [5];
    const error = new ValidationError(
      `property must be less than ${params[0]} characters`
    );
    let arrange: RuleAssertion[] = [
      {
        value: "greater than 5",
        property: "property",
        rule,
        params,
        error,
      },
      {
        value: [1, 2, 3, 4, 5, 6],
        property: "property",
        rule,
        params,
        error,
      },
    ];

    arrange.forEach((item) => {
      assertRule(item);
    });

    arrange = [
      {
        value: "12345",
        property: "property",
        rule,
        params,
      },
      {
        value: "1",
        property: "property",
        rule,
        params,
      },
      {
        value: [1, 2, 3, 4, 5],
        property: "property",
        rule,
        params,
      },
      {
        value: [1],
        property: "property",
        rule,
        params,
      },
      { value: null, property: "property", rule, params },
      { value: undefined, property: "property", rule, params },
    ];

    arrange.forEach((item) => {
      assertRule(item);
    });
  });

  test("isBoolean validation rule", () => {
    const rule = "isBoolean";
    const error = new ValidationError("property must be a boolean");
    let arrange: RuleAssertion[] = [
      {
        value: 1,
        property: "property",
        rule,
        error,
      },
      {
        value: "true",
        property: "property",
        rule,
        error,
      },
      { value: {}, property: "property", rule, error },
      { value: [], property: "property", rule, error },
      { value: () => {}, property: "property", rule, error },
      { value: new Date(), property: "property", rule, error },
    ];

    arrange.forEach((item) => {
      assertRule(item);
    });

    arrange = [
      { value: true, property: "property", rule },
      { value: false, property: "property", rule },
      { value: null, property: "property", rule },
      { value: undefined, property: "property", rule },
    ];

    arrange.forEach((item) => {
      assertRule(item);
    });
  });

  test("invalid combination of rules", () => {
    expect(() => {
      ValidatorRules.values(undefined, "property").isRequired().isString();
    }).toThrowError(new ValidationError("property is required"));
    expect(() => {
      ValidatorRules.values(null, "property").isRequired().isString();
    }).toThrowError(new ValidationError("property is required"));
    expect(() => {
      ValidatorRules.values("", "property").isRequired().isString();
    }).toThrowError(new ValidationError("property is required"));
    expect(() => {
      ValidatorRules.values(1, "property").isRequired().isString();
    }).toThrowError(new ValidationError("property must be a string"));
    expect(() => {
      ValidatorRules.values("123456", "property")
        .isRequired()
        .isString()
        .maxLength(5);
    }).toThrowError(
      new ValidationError("property must be less than 5 characters")
    );
    expect(() => {
      ValidatorRules.values("true", "property").isRequired().isBoolean();
    }).toThrowError(new ValidationError("property must be a boolean"));
  });

  test("valid combination of rules", () => {
    expect.assertions(0);
    ValidatorRules.values("value", "property").isRequired().isString();
    ValidatorRules.values("value", "property")
      .isRequired()
      .isString()
      .maxLength(5);
    ValidatorRules.values(true, "property").isRequired().isBoolean();
    ValidatorRules.values(false, "property").isRequired().isBoolean();
  });

  test("repeat rule", () => {
    expect(() => {
      ValidatorRules.values(true, "property").isRequired();
    }).not.toHaveProperty("isRequired");
    expect(() => {
      ValidatorRules.values("value", "property").isString();
    }).not.toHaveProperty("isString");
    expect(() => {
      ValidatorRules.values("value", "property").maxLength(5);
    }).not.toHaveProperty("maxLength");
    expect(() => {
      ValidatorRules.values(true, "property").isBoolean();
    }).not.toHaveProperty("isBoolean");
  });
});
