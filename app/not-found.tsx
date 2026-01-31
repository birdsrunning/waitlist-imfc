import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#231F20] px-6 text-center text-[#EAE8E8]">
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#F4683D]/40">
        <Mail className="h-8 w-8 text-[#F4683D]" />
      </div>

      {/* Small label */}
      <p className="mt-6 text-xs uppercase tracking-widest text-[#EAE8E8]/60">
        404 — Not Found
      </p>

      {/* Headline */}
      <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
        Page not found
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-md text-[#EAE8E8]/70">
        Looks like the waitlist page you’re looking for doesn’t exist or has moved.
        Don’t worry — you can still join the waitlist or go back to the homepage.
      </p>

      {/* Action buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#EAE8E8] px-6 py-3 text-sm font-medium text-[#231F20] transition hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" />
          Go home
        </Link>

        <Link
          href="/waitlist"
          className="inline-flex items-center gap-2 rounded-xl border border-[#EAE8E8]/20 px-6 py-3 text-sm font-medium transition hover:border-[#F4683D]/60 hover:text-[#F4683D]"
        >
          <Mail className="h-4 w-4" />
          Join Waitlist
        </Link>
      </div>
    </main>
  );
}
