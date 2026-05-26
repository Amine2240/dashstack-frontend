"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const features = [
  {
    title: "Realtime Ops",
    description:
      "Monitor machine health, uptime, and anomalies as they happen.",
  },
  {
    title: "Predictive Alerts",
    description: "Surface early warnings with smart thresholds and AI scoring.",
  },
  {
    title: "Energy Insights",
    description: "Track energy usage across shifts with cost-aware insights.",
  },
  {
    title: "Operator Sync",
    description: "Align teams with live task updates and role-based views.",
  },
  {
    title: "Quality Trace",
    description: "Audit every line item with production and QA metadata.",
  },
  {
    title: "Secure Access",
    description: "Fine-grained permissions, audit trails, and SSO-ready flows.",
  },
];

const steps = [
  {
    title: "Connect",
    description:
      "Plug in machines, sensors, and existing OT systems in minutes.",
  },
  {
    title: "Normalize",
    description: "Auto-map data into consistent event streams and timelines.",
  },
  {
    title: "Optimize",
    description:
      "Ship dashboards, alerts, and workflows tailored to your plant.",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-slate-950/85 backdrop-blur border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600" />
            <span className="text-lg font-semibold tracking-tight">
              AutoTrack
            </span>
          </div>
          <div className="hidden items-center gap-8 text-sm text-slate-200 md:flex">
            <a className="hover:text-white" href="#features">
              Features
            </a>
            <a className="hover:text-white" href="#how">
              How it works
            </a>
            <a className="hover:text-white" href="#insights">
              Insights
            </a>
            <a className="hover:text-white" href="#pricing">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="btn btn-ghost text-white/80 hover:text-white"
            >
              Sign in
            </Link>
            <Link href="/auth/signup" className="btn btn-primary">
              Request access
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative overflow-hidden">
        <section className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col items-center gap-12 px-6 pb-24 pt-16 md:flex-row md:items-start md:gap-6">
          <div className="absolute left-1/2 top-[-20%] h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[160px]" />
          <div className="relative z-10 w-full max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Modern operations intelligence
            </div>
            <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
              <span className="block">Factory</span>
              <span className="block text-white/70">clarity</span>
            </h1>
            <p className="mt-4 text-lg text-white/70">
              AutoTrack delivers a live, unified view of production health,
              energy usage, and operator workflows across every line.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/auth/signup" className="btn btn-primary">
                Get started
              </Link>
              <button className="btn btn-ghost">See a demo</button>
            </div>
            <div className="mt-10 flex items-center gap-4 text-sm text-white/60">
              <div className="flex -space-x-3">
                {["A", "M", "K", "S"].map((item) => (
                  <div
                    key={item}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-semibold"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <span>Trusted by 120+ smart factories</span>
            </div>
          </div>

          <div className="relative z-10 w-full max-w-xl">
            <div className="relative rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_35px_80px_rgba(15,23,42,0.45)]">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-500/30 blur-[90px]" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Operations Overview</p>
                  <h3 className="text-2xl font-semibold">Live Line Health</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
                  2 min ago
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { label: "Uptime", value: "98.6%" },
                  { label: "Energy", value: "-12%" },
                  { label: "Alerts", value: "3 Open" },
                  { label: "Output", value: "+8%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3"
                  >
                    <p className="text-xs text-white/60">{stat.label}</p>
                    <p className="text-xl font-semibold text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-slate-950 to-slate-900 px-4 py-5">
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>Shift Performance</span>
                  <span>Last 7 days</span>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {[
                    "h-[70%]",
                    "h-[85%]",
                    "h-[50%]",
                    "h-[95%]",
                    "h-[78%]",
                    "h-[88%]",
                    "h-[63%]",
                    "h-[92%]",
                  ].map((heightClass, index) => (
                    <div
                      key={`${heightClass}-${index}`}
                      className="flex h-24 items-end rounded-xl bg-white/5 p-2"
                    >
                      <div
                        className={`w-full rounded-lg bg-gradient-to-t from-cyan-500 to-blue-500 ${heightClass}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/5">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-6 text-sm text-white/60">
            <p className="uppercase tracking-[0.3em]">Trusted by teams at</p>
            <div className="flex flex-wrap items-center gap-8 text-white/40">
              <span>Northline</span>
              <span>Voltix</span>
              <span>Forgeworks</span>
              <span>Raildex</span>
            </div>
          </div>
        </section>

        <section id="features" className="reveal mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                Features
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Everything your plant needs
              </h2>
            </div>
            <p className="max-w-md text-white/70">
              A unified operations layer built for modern manufacturing teams.
            </p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="card border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1"
              >
                <div className="mb-4 h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600" />
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-white/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="reveal mx-auto max-w-6xl px-6 pb-20 pt-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                From signal to action
              </h2>
            </div>
            <p className="max-w-md text-white/70">
              Deploy fast, align teams, and keep operations in sync.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm font-semibold">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-white/70">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="absolute right-4 top-8 hidden h-px w-20 bg-white/10 md:block" />
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="insights" className="reveal mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 px-8 py-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                  Unified insight
                </p>
                <h2 className="mt-3 text-3xl font-semibold">
                  Every line, one command center
                </h2>
                <p className="mt-3 max-w-lg text-white/70">
                  Dashboards, automated runbooks, and anomaly resolution built
                  to scale across multiple sites.
                </p>
              </div>
              <div className="flex flex-col gap-3 text-sm text-white/70">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  20% faster response time to critical alerts
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  12% energy savings across three facilities
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="reveal mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-600 via-blue-600 to-slate-900 px-8 py-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold">Ready to modernize?</h2>
                <p className="mt-2 text-white/80">
                  Start with a guided rollout and scale across every factory.
                </p>
              </div>
              <Link href="/auth/signup" className="btn btn-secondary">
                Schedule a walkthrough
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600" />
              <span className="text-lg font-semibold">AutoTrack</span>
            </div>
            <p className="mt-4 text-sm text-white/60">
              Operational intelligence for modern manufacturing teams.
            </p>
          </div>
          <div className="text-sm text-white/70">
            <p className="mb-3 font-semibold text-white">Product</p>
            <ul className="space-y-2">
              <li>Overview</li>
              <li>Security</li>
              <li>Integrations</li>
            </ul>
          </div>
          <div className="text-sm text-white/70">
            <p className="mb-3 font-semibold text-white">Company</p>
            <ul className="space-y-2">
              <li>About</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
          <div className="text-sm text-white/70">
            <p className="mb-3 font-semibold text-white">Social</p>
            <ul className="space-y-2">
              <li>LinkedIn</li>
              <li>Twitter</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
          © 2026 AutoTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
