import SignUpForm from "./form";
import Paragraph from "./paragraph";

export default function SingUpPage() {
  return (
    <section className="auth-hero flex min-h-screen items-center justify-center p-6 lg:p-16 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="auth-hero-shape-1" />
      <div className="auth-hero-shape-2" />
      <div className="auth-hero-shape-3" />

      <div className="relative z-10 flex flex-col lg:flex-row gap-10 max-w-6xl w-full items-center justify-center">
        <Paragraph />
        <SignUpForm />
      </div>
    </section>
  );
}