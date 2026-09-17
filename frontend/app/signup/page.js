"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./signup.module.css";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://fledgling-pricey-fox.abasthan.app/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Account successfully created!");

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server connection failed");
    }

    setLoading(false);
  };

  return (
    <main className={styles.page}>
      <div className={styles.backgroundGlow}></div>

      <section className={styles.card}>
        <div className={styles.logoCircle}>
          ✦
        </div>

        <div className={styles.heading}>
          <span>WELCOME</span>
          <h1>Create Account</h1>
          <p>Join us and get started today</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {message && (
          <div
            className={
              message.includes("successfully")
                ? styles.success
                : styles.error
            }
          >
            {message}
          </div>
        )}

        <div className={styles.loginText}>
          Already have an account?
          <button
            type="button"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>

        <div className={styles.footer}>
          Secure Authentication System
        </div>
      </section>
    </main>
  );
}