import LoginForm from "./form";

export default function LoginPage() {
  return (
    <section className="auth-hero flex justify-center h-full items-center relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="auth-hero-shape-1" />
      <div className="auth-hero-shape-2" />
      <div className="auth-hero-shape-3" />
      <LoginForm />
    </section>
  );
}
