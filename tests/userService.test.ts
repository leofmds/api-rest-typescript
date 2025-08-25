import { userService } from "../src/services/userService";

describe("User Service CRUD", () => {
  beforeEach(() => {
    // Resetando dados entre os testes
    userService.clear();
  });

  it("should create a user", () => {
    const user = userService.create({ name: "John Doe", email: "john@example.com" });
    expect(user.id).toBe(1);
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john@example.com");
  });

  it("should return all users", () => {
    userService.create({ name: "User 1", email: "u1@example.com" });
    userService.create({ name: "User 2", email: "u2@example.com" });

    const users = userService.getAll();
    expect(users.length).toBe(2);
  });

  it("should return a user by id", () => {
    const user = userService.create({ name: "Jane Doe", email: "jane@example.com" });
    const foundUser = userService.getById(user.id);
    expect(foundUser).toEqual(user);
  });

  it("should update a user", () => {
    const user = userService.create({ name: "Old", email: "old@example.com" });
    const updated = userService.update(user.id, { name: "New" });
    expect(updated?.name).toBe("New");
  });

  it("should delete a user", () => {
    const user = userService.create({ name: "To Delete", email: "delete@example.com" });
    const success = userService.del(user.id);
    expect(success).toBe(true);
    expect(userService.getById(user.id)).toBeUndefined();
  });

  it("should return false when deleting non-existent user", () => {
    const success = userService.del(999);
    expect(success).toBe(false);
  });
});