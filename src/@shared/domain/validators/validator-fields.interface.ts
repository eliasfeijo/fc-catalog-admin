export type FieldErrors = {
  [field: string]: string[];
};

export default interface ValidatorFieldsInterface<ValidatedProps> {
  errors: FieldErrors;
  validatedData: ValidatedProps;
  validate(data: ValidatedProps): boolean;
}
