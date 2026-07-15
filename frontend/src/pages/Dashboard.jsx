import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard VetClinic</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                    Logout
                </button>
            </div>
            <p>
                Selamat datang, <strong>{user?.nama}</strong> ({user?.role})
            </p>
        </div>
    );
}

export default Dashboard;
