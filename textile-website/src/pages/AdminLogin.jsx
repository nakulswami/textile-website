import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (password === "Nakul123") {
            sessionStorage.setItem("adminLoggedIn", "true");
            navigate("/hidden-admin/dashboard");
        } else {
            alert("Incorrect password");
        }
    };

    return (
        <div className="admin-login-page">
            <form className="admin-login-box" onSubmit={handleLogin}>
                <p className="admin-login-label">TEXTILE WEBSITE</p>

                <h1>Admin Access</h1>

                <p className="admin-login-text">
                    Enter your password to access the dashboard.
                </p>

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;