import { deepFreeze } from "./object.util";

describe("Object Util Unit Tests", () => {
  it("should deep freeze object", () => {
    const obj = deepFreeze({
      prop1: 1,
      deep: { prop2: "value2", array: [{ prop3: true }] },
    });
    expect(() => ((obj as any).prop1 = 2)).toThrowError(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    );
    expect(() => ((obj as any).deep = {})).toThrowError(
      "Cannot assign to read only property 'deep' of object '#<Object>'"
    );
    expect(() => ((obj as any).deep.prop2 = "")).toThrowError(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    );
    expect(() => ((obj as any).deep.array = [])).toThrowError(
      "Cannot assign to read only property 'array' of object '#<Object>'"
    );
    expect(() => ((obj as any).deep.array[0] = {})).toThrowError(
      "Cannot assign to read only property '0' of object '[object Array]'"
    );
    expect(() => ((obj as any).deep.array[0].prop3 = false)).toThrowError(
      "Cannot assign to read only property 'prop3' of object '#<Object>'"
    );
  });
  it("should not deep freeze scalar values", () => {
    let scalar: any = deepFreeze(1);
    expect(() => (scalar = 2)).not.toThrowError();
    expect(scalar).toBe(2);
    scalar = deepFreeze("value");
    expect(() => (scalar = "value2")).not.toThrowError();
    expect(scalar).toBe("value2");
    scalar = deepFreeze(true);
    expect(() => (scalar = false)).not.toThrowError();
    expect(scalar).toBe(false);
    scalar = deepFreeze(null);
    expect(() => (scalar = null)).not.toThrowError();
    expect(scalar).toBe(null);
    scalar = deepFreeze(undefined);
    expect(() => (scalar = undefined)).not.toThrowError();
    expect(scalar).toBe(undefined);
    scalar = deepFreeze(Symbol("value"));
  });
});
