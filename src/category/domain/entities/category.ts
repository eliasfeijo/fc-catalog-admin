import ValidatorRules from "../../../@shared/validators/validator-rules";
import Entity from "../../../@shared/domain/entities/entity";
import { UniqueEntityId } from "../../../@shared/domain/value-objects/unique-entity-id.vo";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends Entity<CategoryProperties> {
  constructor(props: CategoryProperties, id?: UniqueEntityId) {
    Category.validate(props);
    super(props, id);
    this.description = props.description;
    this.is_active = props.is_active;
    this.props.created_at = props.created_at ?? new Date();
  }

  get name(): string {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }
  private set description(description: string) {
    this.props.description = description ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }
  private set is_active(is_active: boolean) {
    this.props.is_active = is_active ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }

  private static validate(
    props: Pick<CategoryProperties, "name" | "description" | "is_active">
  ) {
    ValidatorRules.values(props.name, "name")
      .isRequired()
      .isString()
      .maxLength(255);
    ValidatorRules.values(props.description, "description")
      .isString()
      .maxLength(255);
    ValidatorRules.values(props.is_active, "is_active").isBoolean();
  }

  update(props: Required<Pick<CategoryProperties, "name" | "description">>) {
    Category.validate(props);
    this.props.name = props.name;
    this.description = props.description;
  }

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }
}
