import React from "react";

interface ProfileInfoProps {
  email: string;
  phone: string;
  name: string;
  role: string;
}

export default function ProfileInfo({
  email,
  phone,
  name,
  role,
}: ProfileInfoProps) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Profile details
          </p>
          <h2 className="mt-2 text-lg font-semibold text-slate-950">
            Account information
          </h2>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          Live
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
          <p className="text-sm text-slate-500">User name</p>
          <p className="text-sm font-semibold text-slate-950 text-right">
            {name}
          </p>
        </div>
        <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
          <p className="text-sm text-slate-500">Email</p>
          <p className="text-sm font-semibold text-slate-950 text-right break-all">
            {email}
          </p>
        </div>
        <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
          <p className="text-sm text-slate-500">Phone</p>
          <p className="text-sm font-semibold text-slate-950 text-right">
            {phone ? phone : "/"}
          </p>
        </div>
      </div>

      {role === "manager" ? (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <svg
                width="20"
                height="20"
                viewBox="0 0 27 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M21.248 2.42542L19.533 0.521423H6.02719C5.05279 0.521423 4.67619 1.24382 4.67619 1.80802V6.89002H6.57039V2.83562C6.57039 2.62002 6.75239 2.43802 6.96239 2.43802H16.6266C16.8394 2.43802 16.9458 2.47582 16.9458 2.65082V9.39882H23.824C24.0942 9.39882 24.1992 9.53882 24.1992 9.74322V26.2212C24.1992 26.5656 24.0592 26.6174 23.8492 26.6174H6.96239C6.85826 26.6149 6.75918 26.572 6.68605 26.4978C6.61292 26.4237 6.57145 26.324 6.57039 26.2198V24.7134H4.68879V27.0864C4.66359 27.9264 5.11159 28.5214 6.02719 28.5214H24.7844C25.7644 28.5214 26.099 27.8116 26.099 27.1648V7.78322L25.609 7.25122L21.248 2.42542ZM18.8708 2.64942L19.4126 3.25702L23.047 7.25122L23.2472 7.49342H19.533C19.253 7.49342 19.0757 7.44676 19.001 7.35342C18.9263 7.26196 18.8829 7.11589 18.8708 6.91522V2.64942ZM17.3448 15.4552H23.7526V17.3228H17.3434L17.3448 15.4552ZM17.3448 11.7228H23.7526V13.589H17.3434L17.3448 11.7228ZM17.3448 19.189H23.7526V21.0566H17.3434L17.3448 19.189ZM0.900391 8.39782V23.3316H15.5514V8.39782H0.900391ZM8.22659 17.0834L7.33059 18.4526H8.22659V20.1214H3.72279L6.99039 15.2074L4.09519 10.789H6.51439L8.22799 13.3594L9.94019 10.789H12.358L9.45719 15.2074L12.729 20.1214H10.2188L8.22659 17.0834Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-900">
                Manager access
              </p>
              <p className="text-sm text-emerald-700">
                Can import and manage workers list
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
