type LoginPayload = {
  email: string;
  password: string;
};

const mock_users = [
  {
    id: 1,
    name: "test",
    email: "admin@gmail.com",
    password: "123456",
    role: "admin",
  },
  {
    id: 2,
    name: "test",
    email: "manager@gmail.com",
    password: "123456",
    role: "manager",
  },
  {
    id: 3,
    name: "test",
    email: "user@gmail.com",
    password: "123456",
    role: "user",
  },
];

export const authService = {
  login: async ({ email, password }: LoginPayload) => {
    return new Promise<{ token: string, user: { role: string, name: string, id: number } }>((resolve, reject) => {
      setTimeout(() => {
        const user = mock_users.find((user) => user.email === email && user.password === password);
        if (user) {
          resolve({ token: "fake-jwt-token", user: { role: user.role, name: user.name, id: user.id } });
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 500);
    });
  },
};