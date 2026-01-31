import { authStorage } from "../utils/authStorage";
import { tokenStorage } from "../utils/token";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    tokenStorage.remove();
    authStorage.clear();
    navigate("/login");
  }
  return (
    <button
      onClick={() => {
        handleLogout();
      }}
      className="text-sm text-red-500"
    >
      Logout
    </button>
  );
}