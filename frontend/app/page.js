import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>My Auth Project</h1>

        <p>Welcome to the authentication system.</p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "25px" }}>
          <Link href="/login">Login</Link>
          <Link href="/signup">Create Account</Link>
        </div>
      </div>
    </main>
  );
}