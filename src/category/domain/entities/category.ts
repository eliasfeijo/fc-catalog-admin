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

  update(props: { name?: string; description?: string }) {
    this.props.name = props.name ?? this.props.name;
    this.description = props.description;
  }

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }
}
