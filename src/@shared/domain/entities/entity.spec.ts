import { UniqueEntityId } from "../value-objects/unique-entity-id.vo";
import Entity from "./entity";

class StubEntity extends Entity<{ prop1: string; prop2: number }> {
  constructor(props: { prop1: string; prop2: number }, id?: UniqueEntityId) {
    super(props, id);
  }
  get prop1(): string {
    return this.props.prop1;
  }
  get prop2(): number {
    return this.props.prop2;
  }
}
describe("Entity Unit Test", () => {
  it("should set props", () => {
    const props = { prop1: "value1", prop2: 2 };
    const entity = new StubEntity(props);
    expect(entity.prop1).toStrictEqual(props.prop1);
    expect(entity.prop2).toStrictEqual(props.prop2);
  });
  it("should set id", () => {
    const props = { prop1: "value1", prop2: 2 };
    const id = new UniqueEntityId();
    const entity = new StubEntity(props, id);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.uniqueEntityId).toStrictEqual(id);
    expect(entity.id).toBe(id.value);
  });
  it("should set id with default value", () => {
    const props = { prop1: "value1", prop2: 2 };
    const entity = new StubEntity(props);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(entity.uniqueEntityId.value);
  });
  it("should return json", () => {
    const props = { prop1: "value1", prop2: 2 };
    const id = new UniqueEntityId();
    const entity = new StubEntity(props, id);
    expect(entity.toJSON()).toStrictEqual({ id: id.value, ...props });
  });
});
