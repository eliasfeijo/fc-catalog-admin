import { Category } from "./category";

describe("Category Integration Tests", () => {
  describe("constructor", () => {
    test("invalid name", () => {
      expect(() => new Category({ name: null as any })).toContainErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
      expect(() => new Category({ name: "" })).toContainErrorMessages({
        name: ["name should not be empty"],
      });
      expect(() => new Category({ name: 1 as any })).toContainErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
      expect(
        () => new Category({ name: "a".repeat(256) })
      ).toContainErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    test("invalid description", () => {
      expect(
        () => new Category({ name: "name", description: 1 as any })
      ).toContainErrorMessages({
        description: [
          "description must be a string",
          "description must be shorter than or equal to 255 characters",
        ],
      });
      expect(
        () => new Category({ name: "name", description: "a".repeat(256) })
      ).toContainErrorMessages({
        description: [
          "description must be shorter than or equal to 255 characters",
        ],
      });
    });

    test("invalid is_active", () => {
      expect(
        () => new Category({ name: "name", is_active: 1 as any })
      ).toContainErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
      expect(
        () => new Category({ name: "name", is_active: 0 as any })
      ).toContainErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
      expect(
        () => new Category({ name: "name", is_active: "true" as any })
      ).toContainErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
      expect(
        () => new Category({ name: "name", is_active: "false" as any })
      ).toContainErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
    });

    test("valid category", () => {
      expect.assertions(0);
      new Category({ name: "name" });
      new Category({ name: "name", description: "description" });
      new Category({ name: "name", is_active: true });
      new Category({ name: "name", is_active: false });
      new Category({
        name: "name",
        description: "description",
        is_active: true,
      });
      new Category({
        name: "name",
        description: "description",
        is_active: false,
      });
    });
  });

  describe("update", () => {
    test("invalid name", () => {
      const category = new Category({ name: "name" });
      expect(() =>
        category.update({ name: null as any, description: null })
      ).toContainErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
      expect(() =>
        category.update({ name: "", description: null })
      ).toContainErrorMessages({
        name: ["name should not be empty"],
      });
      expect(() =>
        category.update({ name: 1 as any, description: null })
      ).toContainErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
      expect(() =>
        category.update({ name: "a".repeat(256), description: null })
      ).toContainErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    test("invalid description", () => {
      const category = new Category({ name: "name" });
      expect(() =>
        category.update({ name: "name", description: 1 as any })
      ).toContainErrorMessages({
        description: [
          "description must be a string",
          "description must be shorter than or equal to 255 characters",
        ],
      });
      expect(() =>
        category.update({ name: "name", description: "a".repeat(256) })
      ).toContainErrorMessages({
        description: [
          "description must be shorter than or equal to 255 characters",
        ],
      });
    });

    test("valid category", () => {
      const category = new Category({ name: "name" });
      expect.assertions(0);
      category.update({ name: "name 2", description: null });
      category.update({ name: "name 3", description: "description" });
    });
  });
});
