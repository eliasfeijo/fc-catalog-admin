import { FieldErrors } from "../validators/validator-fields.interface";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class EntityValidationError extends ValidationError {
  constructor(public errors: FieldErrors) {
    super("Entity validation error");
    this.name = "EntityValidationError";
  }
}
