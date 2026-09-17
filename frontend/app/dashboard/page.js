"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        // Token nahi hai
        if (!token) {
            router.replace("/login");
            return;
        }

        const getUser = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/auth/me",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    router.replace("/login");
                    return;
                }

                setUser(data.user);

            } catch (error) {
                console.error("Dashboard Error:", error);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.replace("/login");
    };

    if (loading) {
        return (
            <main className="dashboard-loading">
                <div className="loading-box">
                    <div className="loader"></div>
                    <p>Loading Dashboard...</p>
                </div>
            </main>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <main className="dashboard-page">

            {/* NAVBAR */}
            <nav className="dashboard-nav">

                <div className="dashboard-logo">
                    ROYAL
                    <span>AUTH</span>
                </div>

                <button
                    onClick={handleLogout}
                    className="logout-button"
                >
                    Logout
                </button>

            </nav>

            {/* CONTENT */}
            <section className="dashboard-content">

                <div className="welcome-section">
                    <p className="small-heading">
                        ROYAL DASHBOARD
                    </p>

                    <h1>
                        Welcome, <span>{user.name}</span> 👋
                    </h1>

                    <p className="welcome-text">
                        Your account is successfully authenticated.
                    </p>
                </div>

                {/* CARDS */}
                <div className="dashboard-grid">

                    <div className="dashboard-card">
                        <div className="card-icon">👤</div>

                        <div>
                            <p>Account Name</p>
                            <h3>{user.name}</h3>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon">✉️</div>

                        <div>
                            <p>Email Address</p>
                            <h3>{user.email}</h3>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon">🔐</div>

                        <div>
                            <p>Account Status</p>
                            <h3 className="active-status">
                                Active
                            </h3>
                        </div>
                    </div>

                </div>

                {/* AUTH STATUS */}
                <div className="security-card">

                    <div className="security-icon">
                        ✓
                    </div>

                    <div>
                        <h2>Authentication Successful</h2>

                        <p>
                            Your JWT authentication is working
                            correctly. This dashboard is protected
                            and can only be accessed by logged-in users.
                        </p>
                    </div>

                </div>

            </section>

        </main>
    );
}