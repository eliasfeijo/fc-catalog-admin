import { validateSync } from "class-validator";
import ValidatorFieldsInterface, {
  FieldErrors,
} from "./validator-fields.interface";

export default abstract class ValidatorFields<ValidatedProps extends object>
  implements ValidatorFieldsInterface<ValidatedProps>
{
  errors: FieldErrors = null;
  validatedData: ValidatedProps = null;
  validate(data: ValidatedProps): boolean {
    const errors = validateSync(data);
    if (errors?.length > 0) {
      this.errors = {};
      errors.forEach((error) => {
        this.errors[error.property] = Object.values(error.constraints);
      });
      return false;
    }
    this.validatedData = data;
    return true;
  }
}
