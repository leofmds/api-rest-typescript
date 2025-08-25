import request from "supertest";
import app from "../src/app";
import { userService } from "../src/services/userService";

describe("User Routes (Integration)", () => {
  beforeEach(() => {
    userService.clear();
  });

  it("POST /users -> cria usuário", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "John Doe", email: "john@example.com" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body.name).toBe("John Doe");
  });

  it("GET /users -> lista usuários", async () => {
    await userService.create({ name: "User 1", email: "u1@example.com" });

    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("GET /users/:id -> retorna usuário existente", async () => {
    const user = userService.create({ name: "Jane Doe", email: "jane@example.com" });

    const res = await request(app).get(`/users/${user.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(user);
  });

  it("GET /users/:id -> retorna 404 se não existir", async () => {
    const res = await request(app).get("/users/999");
    expect(res.status).toBe(404);
  });

  it("PUT /users/:id -> atualiza usuário existente", async () => {
    const user = userService.create({ name: "Old", email: "old@example.com" });

    const res = await request(app)
      .put(`/users/${user.id}`)
      .send({ name: "New" });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("New");
  });

  it("PUT /users/:id -> retorna 404 se não existir", async () => {
    const res = await request(app)
      .put("/users/999")
      .send({ name: "New" });

    expect(res.status).toBe(404);
  });

  it("DELETE /users/:id -> remove usuário existente", async () => {
    const user = userService.create({ name: "Delete Me", email: "del@example.com" });

    const res = await request(app).delete(`/users/${user.id}`);

    expect(res.status).toBe(204);
  });

  it("DELETE /users/:id -> retorna 404 se não existir", async () => {
    const res = await request(app).delete("/users/999");
    expect(res.status).toBe(404);
  });
});