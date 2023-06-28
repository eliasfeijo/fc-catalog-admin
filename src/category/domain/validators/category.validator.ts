import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import ValidatorFields from "../../../@shared/validators/validator-fields";
import { CategoryProperties } from "../entities/category";

export class CategoryValidationRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsDate()
  @IsOptional()
  created_at?: Date;

  constructor({
    name,
    description,
    is_active,
    created_at,
  }: CategoryProperties) {
    Object.assign(this, { name, description, is_active, created_at });
  }
}

export class CategoryValidator extends ValidatorFields<CategoryValidationRules> {
  validate(data: CategoryValidationRules): boolean {
    return super.validate(new CategoryValidationRules(data ?? ({} as any)));
  }
}

export default class CategoryValidatorFactory {
  static create(): CategoryValidator {
    return new CategoryValidator();
  }
}
