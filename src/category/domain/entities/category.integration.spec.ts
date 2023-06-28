import ValidationError from "../../../@shared/errors/validation.error";
import { Category } from "./category";

describe("Category Integration Tests", () => {
  describe("constructor", () => {
    test("invalid category", () => {
      expect(() => new Category({ name: null })).toThrowError(
        new ValidationError("name is required")
      );
      expect(() => new Category({ name: undefined })).toThrowError(
        new ValidationError("name is required")
      );
      expect(() => new Category({ name: "" })).toThrowError(
        new ValidationError("name is required")
      );
      expect(() => new Category({ name: 1 as any })).toThrowError(
        new ValidationError("name must be a string")
      );
      expect(() => new Category({ name: "a".repeat(256) })).toThrowError(
        new ValidationError("name must be less than 255 characters")
      );
      expect(
        () => new Category({ name: "Category Name", description: 1 as any })
      ).toThrowError(new ValidationError("description must be a string"));
      expect(
        () =>
          new Category({ name: "Category Name", description: "a".repeat(256) })
      ).toThrowError(
        new ValidationError("description must be less than 255 characters")
      );
      expect(
        () => new Category({ name: "Category Name", is_active: 1 as any })
      ).toThrowError(new ValidationError("is_active must be a boolean"));
    });

    test("valid category", () => {
      expect.assertions(0);
      new Category({ name: "Category Name" });
      new Category({ name: "Category Name", description: "Description" });
      new Category({ name: "Category Name", description: null });
      new Category({ name: "Category Name", is_active: false });
      new Category({ name: "Category Name", is_active: true });
    });
  });

  describe("update", () => {
    test("invalid category", () => {
      const category = new Category({ name: "Category Name" });
      expect(() =>
        category.update({ name: null as any, description: "Description" })
      ).toThrowError(new ValidationError("name is required"));
      expect(() =>
        category.update({ name: undefined as any, description: "Description" })
      ).toThrowError(new ValidationError("name is required"));
      expect(() =>
        category.update({ name: "" as any, description: "Description" })
      ).toThrowError(new ValidationError("name is required"));
      expect(() =>
        category.update({ name: 1 as any, description: "Description" })
      ).toThrowError(new ValidationError("name must be a string"));
      expect(() =>
        category.update({ name: "a".repeat(256), description: "Description" })
      ).toThrowError(
        new ValidationError("name must be less than 255 characters")
      );
      expect(() =>
        category.update({ name: "Category Name", description: 1 as any })
      ).toThrowError(new ValidationError("description must be a string"));
      expect(() =>
        category.update({
          name: "Category Name",
          description: "a".repeat(256),
        })
      ).toThrowError(
        new ValidationError("description must be less than 255 characters")
      );
    });

    test("valid category", () => {
      expect.assertions(0);
      const category = new Category({ name: "Category Name" });
      category.update({ name: "Category Name 2", description: "Description" });
      category.update({ name: "Category Name 2", description: undefined });
      category.update({ name: "Category Name 2", description: null });
    });
  });
});
