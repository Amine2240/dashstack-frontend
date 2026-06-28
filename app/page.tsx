"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const machines = [
  { label: "Welding Robot #6",  status: "running", oee: "96.4%", energy: "142 kWh" },
  { label: "CNC Milling #4",    status: "running", oee: "91.2%", energy: "98 kWh"  },
  { label: "Stamping Press #1", status: "warning", oee: "74.8%", energy: "211 kWh" },
  { label: "AGV #3",            status: "running", oee: "99.1%", energy: "34 kWh"  },
  { label: "Painting Robot #2", status: "running", oee: "88.7%", energy: "76 kWh"  },
  { label: "Leak Test #5",      status: "alert",   oee: "—",     energy: "—"       },
];

const capabilities = [
  {
    title: "Machine status — live",
    body:  "Every machine on your floor reports its state in real time. Drill into logs for welding robots, CNC mills, AGVs, stamping presses, painting robots, and leak test stations.",
  },
  {
    title: "Anomaly detection",
    body:  "The platform flags abnormal readings before they cascade into failures. Alerts reach operators via push notification within seconds of detection.",
  },
  {
    title: "Energy per shift",
    body:  "Track kWh consumption by machine and shift window. Understand which line or time slot is driving your energy costs — not just the total.",
  },
  {
    title: "Task and team management",
    body:  "Create maintenance tasks, assign them to operators, and track completion. Managers see a summary; workers see their queue.",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime]         = useState("");

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-slate-950/90 backdrop-blur border-b border-slate-800"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-cyan-400 flex items-center justify-center flex-shrink-0">
              <span className="text-slate-950 font-bold text-sm leading-none">D</span>
            </div>
            <span className="text-base font-semibold tracking-tight">DashStack</span>
          </div>

          <div className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            <a href="#platform" className="hover:text-white transition-colors">Platform</a>
            <a href="#machines"  className="hover:text-white transition-colors">Machines</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth/login"  className="btn btn-ghost text-slate-300 hover:text-white text-sm">
              Sign in
            </Link>
            <Link href="/auth/signup" className="btn btn-primary text-sm">
              Get access
            </Link>
          </div>
        </nav>
      </header>

      <main>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-12">

            {/* Headline */}
            <div className="flex-1 max-w-md">
              <div className="inline-flex items-center gap-2 text-xs text-slate-400 border border-slate-700 rounded-full px-3 py-1.5 mb-7">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                6 machines connected
              </div>

              <h1 className="text-[2.6rem] font-semibold leading-[1.15] tracking-tight text-white">
                Know what&apos;s happening<br />
                <span className="text-slate-400">on every line.</span>
              </h1>

              <p className="mt-5 text-[0.95rem] text-slate-400 leading-relaxed">
                DashStack gives your team a live view of machine uptime, energy
                consumption, anomalies, and production output — for every machine
                on the floor, updated every minute.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <Link href="/auth/signup" className="btn btn-primary">Request access</Link>
                <Link href="/auth/login"  className="btn btn-ghost text-slate-300 text-sm">
                  Sign in →
                </Link>
              </div>
            </div>

            {/* Live machine status panel */}
            <div className="flex-1 w-full max-w-xl">
              <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.5)]">

                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-medium text-slate-300 tracking-wide">
                      Shop Floor — Live
                    </span>
                  </div>
                  <span className="text-xs text-slate-600 tabular-nums font-mono">
                    {time || "--:--"}
                  </span>
                </div>

                <div className="grid grid-cols-[1fr_72px_72px_84px] px-5 py-2 text-[11px] text-slate-600 font-medium uppercase tracking-wide border-b border-slate-800/60">
                  <span>Machine</span>
                  <span className="text-center">Status</span>
                  <span className="text-right">OEE</span>
                  <span className="text-right">Energy</span>
                </div>

                {machines.map((m) => (
                  <div
                    key={m.label}
                    className="grid grid-cols-[1fr_72px_72px_84px] px-5 py-3 border-b border-slate-800/40 last:border-0 hover:bg-slate-800/25 transition-colors"
                  >
                    <span className="text-sm text-slate-200 font-mono truncate pr-2">
                      {m.label}
                    </span>

                    <span className="flex justify-center items-center">
                      {m.status === "running" && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-green-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />Run
                        </span>
                      )}
                      {m.status === "warning" && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />Warn
                        </span>
                      )}
                      {m.status === "alert" && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-red-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />Alert
                        </span>
                      )}
                    </span>

                    <span className="text-right text-sm font-mono text-slate-300 tabular-nums">
                      {m.oee}
                    </span>
                    <span className="text-right text-sm font-mono text-slate-500 tabular-nums">
                      {m.energy}
                    </span>
                  </div>
                ))}

                <div className="px-5 py-3 bg-slate-800/30 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    4 running · 1 warning · 1 alert
                  </span>
                  <Link
                    href="/auth/login"
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Open dashboard →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Numbers strip */}
        <section className="border-y border-slate-800/70">
          <div className="mx-auto max-w-6xl px-6 py-7 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: "6",        label: "Machine types monitored"           },
              { value: "< 2 min",  label: "Alert-to-notification latency"     },
              { value: "3 shifts", label: "Energy tracked per shift window"   },
              { value: "1 view",   label: "Unified dashboard for every role"  },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-2xl font-semibold text-white tabular-nums">{s.value}</span>
                <span className="text-xs text-slate-500 leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Platform capabilities */}
        <section id="platform" className="reveal mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-3">Platform</p>
            <h2 className="text-3xl font-semibold text-white">Built for the shop floor</h2>
            <p className="mt-3 text-sm text-slate-400 max-w-sm leading-relaxed">
              Designed around how manufacturing teams actually work — not a generic SaaS template.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition-colors"
              >
                <h3 className="text-[0.95rem] font-medium text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{cap.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Machine types */}
        <section id="machines" className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 px-8 py-10">
            <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-2">
              Supported machines
            </p>
            <h2 className="text-2xl font-semibold text-white mb-1">
              Logs, metrics, and alerts — per machine type
            </h2>
            <p className="text-sm text-slate-500 mb-8">
              Each machine has its own log view, chart history, and status feed.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "Welding Robots",
                "CNC Milling Machines",
                "Stamping Presses",
                "Painting Robots",
                "AGVs",
                "Leak Test Stations",
              ].map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-800/30 px-4 py-3 hover:border-slate-700 transition-colors"
                >
                  <span className="h-2 w-2 rounded-full bg-cyan-400/70 flex-shrink-0" />
                  <span className="text-sm text-slate-300">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-xl border border-slate-700 bg-slate-900 px-8 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Ready to connect your floor?
              </h2>
              <p className="mt-2 text-sm text-slate-400 max-w-md leading-relaxed">
                Request access and we&apos;ll set up the machine integrations your facility needs.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center flex-shrink-0">
              <Link href="/auth/signup" className="btn btn-primary whitespace-nowrap">
                Request access
              </Link>
              <Link href="/auth/login" className="btn btn-secondary whitespace-nowrap">
                Sign in
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-cyan-400 flex items-center justify-center">
              <span className="text-slate-950 font-bold text-xs leading-none">D</span>
            </div>
            <span className="text-sm font-medium text-white">DashStack</span>
            <span className="text-slate-600 text-sm">· Manufacturing Analytics</span>
          </div>
          <p className="text-xs text-slate-700">© 2026 DashStack. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
