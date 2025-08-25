import { User } from "../models/User";

let users: User[] = [];
let currentId = 1;

export const userService = {
    getAll(): User[] {
        return users;
    },

    getById(id: number): User | undefined {
        return users.find(user => user.id === id);
    },

    create(userData: Omit<User, "id">): User {
        const newUser = { id: currentId++, ...userData };
        users.push(newUser);
        return newUser;
    },

    update(id: number, userData: Partial<Omit<User, "id">>): User | null {
        const user = users.find(u => u.id === id);
        if (!user) return null;
        Object.assign(user, userData);
        return user;
    },

    del(id: number): boolean {
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return false;

        users.splice(index, 1);
        return true;
    },

    clear() {
        if (process.env.NODE_ENV !== 'test') throw new Error("Users can't be cleared");

        users = [];
        currentId = 1;
    }
};
