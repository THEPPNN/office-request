import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton";

export default function Navbar() {
    return (
        <nav className=" bg-gray-900 px-6 py-3 flex justify-between items-center">
            <div className="flex gap-6 items-center">
                <Link to="/admin" className="font-bold text-lg text-white">
                    Office Request
                </Link>

                <Link to="/admin" className="hover:underline text-white">
                    Dashboard
                </Link>

                <Link to="/users" className="hover:underline text-white">
                    User Management
                </Link>
            </div>

            <LogoutButton />
        </nav>
    );
}