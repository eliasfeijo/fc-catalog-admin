export default abstract class ValueObject<Value = any> {
  private _value: Value;

  constructor(value: Value) {
    this._value = value;
  }

  get value(): Value {
    return this._value;
  }

  toString = (): string => {
    if (typeof this.value !== "object" || this.value === null) {
      try {
        return this.value.toString();
      } catch (error) {
        return this.value + "";
      }
    }
    return JSON.stringify(this.value);
  };
}
