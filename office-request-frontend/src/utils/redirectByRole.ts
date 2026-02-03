export const redirectByRole = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "/admin";
      case "MANAGER":
        return "/manager";
      default:
        return "/";
    }
  };