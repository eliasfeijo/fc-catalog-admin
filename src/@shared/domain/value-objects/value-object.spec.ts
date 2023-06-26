import ValueObject from "./value-object";

class StubValueObject extends ValueObject {}

describe("Value Object Unit Tests", () => {
  it("should set value", () => {
    let vo = new StubValueObject("value");
    expect(vo.value).toBe("value");

    vo = new StubValueObject({ key: "value" });
    expect(vo.value).toStrictEqual({ key: "value" });
  });

  it("should convert to string", () => {
    let vo = new StubValueObject("value");
    expect(vo.toString()).toBe("value");

    vo = new StubValueObject({ key: "value" });
    expect(vo.toString()).toBe('{"key":"value"}');

    vo = new StubValueObject(1);
    expect(vo.toString()).toBe("1");

    vo = new StubValueObject(true);
    expect(vo.toString()).toBe("true");

    vo = new StubValueObject(null);
    expect(vo.toString()).toBe("null");

    vo = new StubValueObject(undefined);
    expect(vo.toString()).toBe("undefined");

    vo = new StubValueObject(Symbol("value"));
    expect(vo.toString()).toBe("Symbol(value)");
  });
});
