import { EntityValidationError } from "../errors/validation.error";
import ValidatorFields from "../validators/validator-fields";
import { FieldErrors } from "../validators/validator-fields.interface";
import expect from "expect";

type Received =
  | {
      validator: ValidatorFields<any>;
      data: any;
    }
  | (() => void);

expect.extend({
  toContainErrorMessages(received: Received, expected: FieldErrors) {
    const validData = {
      pass: false,
      message: () => "The data is valid",
    };
    if (typeof received === "function") {
      try {
        received();
        return validData;
      } catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrorMessages(error.errors, expected);
      }
    } else {
      const { validator, data } = received;
      const isValid = validator.validate(data);

      if (isValid) {
        return validData;
      }

      return assertContainsErrorMessages(validator.errors, expected);
    }
  },
});

const assertContainsErrorMessages = (
  received: FieldErrors,
  expected: FieldErrors
) => {
  const isMatch = expect.objectContaining(expected).asymmetricMatch(received);

  if (isMatch) {
    return {
      pass: true,
      message: () => "",
    };
  }

  return {
    pass: false,
    message: () =>
      `Expected:\n${JSON.stringify(
        received,
        null,
        2
      )}\nReceived:\n${JSON.stringify(expected, null, 2)}`,
  };
};
