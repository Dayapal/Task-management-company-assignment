import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { logout, user } =
    useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="font-bold text-xl">
        Welcome {user?.name}
      </h2>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;