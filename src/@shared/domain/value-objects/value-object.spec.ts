import ValueObject from "./value-object";

class StubValueObject extends ValueObject {}

describe("Value Object Unit Tests", () => {
  it("should set value", () => {
    let vo = new StubValueObject("value");
    expect(vo.value).toBe("value");

    vo = new StubValueObject({ key: "value" });
    expect(vo.value).toStrictEqual({ key: "value" });
  });
});
