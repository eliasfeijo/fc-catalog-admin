import ValidatorFields from "../validators/validator-fields";
import { FieldErrors } from "../validators/validator-fields.interface";
import expect from "expect";

type Received = {
  validator: ValidatorFields<any>;
  data: any;
};

expect.extend({
  toContainErrorMessages(received: Received, expected: FieldErrors) {
    const { validator, data } = received;
    const isValid = validator.validate(data);

    if (isValid) {
      return {
        pass: false,
        message: () => "The data is valid",
      };
    }

    const isMatch = expect
      .objectContaining(expected)
      .asymmetricMatch(validator.errors);

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
          validator.errors,
          null,
          2
        )}\nReceived:\n${JSON.stringify(expected, null, 2)}`,
    };
  },
});
