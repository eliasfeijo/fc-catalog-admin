import { UniqueEntityId } from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import { Category } from "./category";

describe("Category Unit Tests", () => {
  test("constructor", () => {
    const category = new Category({
      name: "Category Name",
    });
    expect(category.id).toBeDefined();
    expect(category.id).not.toBeNull();
    expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(category.name).toBe("Category Name");
    expect(category.description).toBeNull();
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    const id = new UniqueEntityId("783f7287-905a-4e42-91bd-2d3e9f8c815d");
    const category2 = new Category(
      {
        name: "Category Name 2",
        description: "Category Description",
        is_active: false,
        created_at,
      },
      id
    );
    expect(category2.uniqueEntityId).toBe(id);
    expect(category2.name).toBe("Category Name 2");
    expect(category2.description).toBe("Category Description");
    expect(category2.is_active).toBeFalsy();
    expect(category2.created_at).toBe(created_at);
  });

  test("setters", () => {
    const category = new Category({
      name: "Category Name",
    });
    category["description"] = "Category Description";
    expect(category.description).toBe("Category Description");
    category["description"] = undefined;
    expect(category.description).toBeNull();

    category["is_active"] = false;
    expect(category.is_active).toBeFalsy();
    category["is_active"] = undefined;
    expect(category.is_active).toBeTruthy();
  });

  test("update", () => {
    const category = new Category({
      name: "Category Name",
    });
    category.update({
      name: "Category Name 2",
      description: "Category Description",
    });
    expect(category.name).toBe("Category Name 2");
    expect(category.description).toBe("Category Description");
    category.update({});
    expect(category.name).toBe("Category Name 2");
    expect(category.description).toBe(null);
  });

  test("activate", () => {
    const category = new Category({
      name: "Category Name",
    });
    category["is_active"] = false;
    expect(category.is_active).toBeFalsy();
    category.activate();
    expect(category.is_active).toBeTruthy();
  });

  test("deactivate", () => {
    const category = new Category({
      name: "Category Name",
    });
    expect(category.is_active).toBeTruthy();
    category.deactivate();
    expect(category.is_active).toBeFalsy();
  });
});
