import Category from "./category";

describe("Category Unit Tests", () => {
  test("constructor of Category", () => {
    const category = new Category({
      name: "Category Name",
    });
    expect(category.name).toBe("Category Name");
    expect(category.description).toBeNull();
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    const category2 = new Category({
      name: "Category Name 2",
      description: "Category Description",
      is_active: false,
      created_at,
    });
    expect(category2.name).toBe("Category Name 2");
    expect(category2.description).toBe("Category Description");
    expect(category2.is_active).toBeFalsy();
    expect(category2.created_at).toBe(created_at);
  });

  test("setters of Category", () => {
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
});
