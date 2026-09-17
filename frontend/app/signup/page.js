"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Signup failed.");
                return;
            }

            setMessage("Account created successfully!");

            setFormData({
                name: "",
                email: "",
                password: ""
            });

            setTimeout(() => {
                router.push("/login");
            }, 1200);

        } catch (error) {
            console.error(error);
            setMessage(
                "Cannot connect to server. Make sure backend is running."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={styles.page}>
            <div style={styles.card}>

                <div style={styles.logo}>
                    ROYAL
                </div>

                <h1 style={styles.title}>Create Account</h1>

                <p style={styles.subtitle}>
                    Sign up to get started
                </p>

                <form onSubmit={handleSubmit}>

                    <div style={styles.inputGroup}>
                        <label>Full Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label>Email Address</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Minimum 6 characters"
                            value={formData.password}
                            onChange={handleChange}
                            minLength={6}
                            required
                        />
                    </div>

                    {message && (
                        <div style={styles.message}>
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={styles.button}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                </form>

                <p style={styles.loginText}>
                    Already have an account?{" "}
                    <button
                        onClick={() => router.push("/login")}
                        style={styles.link}
                    >
                        Login
                    </button>
                </p>

            </div>
        </main>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
            "radial-gradient(circle at top, #2a210d 0%, #090909 45%, #000000 100%)",
        padding: "20px",
        fontFamily: "Arial, sans-serif"
    },

    card: {
        width: "100%",
        maxWidth: "440px",
        background: "rgba(20, 20, 20, 0.95)",
        border: "1px solid rgba(212, 175, 55, 0.35)",
        borderRadius: "24px",
        padding: "42px 35px",
        boxShadow: "0 25px 80px rgba(0,0,0,0.65)"
    },

    logo: {
        textAlign: "center",
        color: "#d4af37",
        fontSize: "27px",
        fontWeight: "800",
        letterSpacing: "7px",
        marginBottom: "20px"
    },

    title: {
        color: "#ffffff",
        textAlign: "center",
        fontSize: "30px",
        margin: "0"
    },

    subtitle: {
        color: "#999999",
        textAlign: "center",
        marginBottom: "30px"
    },

    inputGroup: {
        marginBottom: "18px"
    },

    label: {
        color: "#dddddd",
        display: "block",
        marginBottom: "8px",
        fontSize: "14px"
    },

    button: {
        width: "100%",
        padding: "14px",
        border: "none",
        borderRadius: "10px",
        background: "#d4af37",
        color: "#000000",
        fontSize: "16px",
        fontWeight: "700",
        cursor: "pointer",
        marginTop: "10px"
    },

    message: {
        background: "rgba(212, 175, 55, 0.1)",
        border: "1px solid rgba(212, 175, 55, 0.3)",
        color: "#d4af37",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "15px",
        textAlign: "center",
        fontSize: "14px"
    },

    loginText: {
        color: "#999999",
        textAlign: "center",
        marginTop: "25px",
        fontSize: "14px"
    },

    link: {
        background: "none",
        border: "none",
        color: "#d4af37",
        cursor: "pointer",
        fontWeight: "700"
    }
};