export const redirectByRole = (role: string) => {
    switch (role) {
      case "admin":
        return "/admin";
      case "manager":
        return "/manager";
      default:
        return "/";
    }
  };