import { tokenStorage } from "../utils/token";

export default function LogoutButton() {
  return (
    <button
      onClick={() => {
        tokenStorage.remove();
        window.location.reload();
      }}
      className="text-sm text-red-500"
    >
      Logout
    </button>
  );
}