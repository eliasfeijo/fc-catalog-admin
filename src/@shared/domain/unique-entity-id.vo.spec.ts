import InvalidUuidError from "../../@shared/errors/invalid-uuid.error";
import { UniqueEntityId } from "./unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

describe("UniqueEntityId Unit Tests", () => {
  it("should call validate method when try to create a UniqueEntityId", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    new UniqueEntityId();
    expect(validateSpy).toHaveBeenCalled();
  });
  it("should create a UniqueEntityId with valid uuid", () => {
    const id = new UniqueEntityId();
    expect(id).toBeDefined();
    expect(id).not.toBeNull();
    expect(id).toBeInstanceOf(UniqueEntityId);
    expect(id.value).toBeDefined();
    expect(id.value).not.toBeNull();
    expect(uuidValidate(id.value)).toBeTruthy();
  });
  it("should throw error when try to create a UniqueEntityId with invalid uuid", () => {
    expect(() => new UniqueEntityId("invalid-uuid")).toThrowError(
      new InvalidUuidError()
    );
  });
});
