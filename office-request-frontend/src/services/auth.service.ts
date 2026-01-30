type LoginPayload = {
    email: string;
    password: string;
  };
  
  export const authService = {
    login: async ({ email, password }: LoginPayload) => {
      return new Promise<{ token: string, user: { role: string, name: string, id: number } }>((resolve, reject) => {
        setTimeout(() => {
          if (email === "admin@gmail.com" && password === "1234") {
            // user", "admin", "manager
            resolve({ token: "fake-jwt-token", user: { role: "user", name: "test" , id: 1 } });
          } else {
            reject(new Error("Invalid email or password"));
          }
        }, 1500);
      });
    },
  };