"use client";

import { useState } from "react";
import LightRays from "@/components/LightRays";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { subscribeNewsletter } from "@/lib/actions/newsletter";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Twitter, Instagram } from "lucide-react";

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending || disabled}
      className="
        rounded-md
        bg-[#F4683D]
        text-[#231F20]
        px-4 py-2 font-medium
        hover:brightness-110
        hover:scale-110
        transition duration-300
        disabled:opacity-50
      "
    >
      {pending ? "..." : "Join"}
    </Button>
  );
}

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#231F20] px-4 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#231F20]/60 via-[#231F20]/30 to-[#231F20]/80 z-0" />

      {/* Light rays */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#F4683D"
          raysSpeed={1.5}
          lightSpread={0.9}
          rayLength={2.0}
          followMouse
          mouseInfluence={0.09}
          noiseAmount={0.08}
          distortion={0.04}
          className="opacity-100"
        />
      </div>

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative z-10
          w-fit h-fit text-center space-y-6
          rounded-2xl
          bg-[#EAE8E8]/10
          backdrop-blur-xl
          border border-[#EAE8E8]/20
          shadow-[0_8px_32px_rgba(244,104,61,0.18)]
          px-8 py-10
          flex flex-col items-center
        "
      >
        {/* Glass pill */}
        <div
          className="
            h-fit w-fit flex items-center gap-2
            rounded-full
            bg-[#EAE8E8]/10
            backdrop-blur-lg
            border border-[#EAE8E8]/20
            shadow-[0_6px_20px_rgba(244,104,61,0.25)]
            px-4 py-2
            hover:bg-[#EAE8E8]/20
            hover:shadow-[0_8px_24px_rgba(244,104,61,0.3)]
            transition-all duration-300
          "
        >
          <img
            src="/images/logo/logoOrange.svg"
            alt="Logo"
            className="h-6 w-auto drop-shadow-[0_0_6px_rgba(244,104,61,0.45)]"
          />
          <p className="text-sm text-[#EAE8E8]/80 font-medium">Waitlist</p>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-semibold text-[#EAE8E8]">
          Images made for creatives.
        </h1>

        {/* Subtext */}
        <p className="text-[#EAE8E8]/70 text-sm">
          We’re validating interest before launch.
          <br />
          Join the waitlist if this sounds useful.
        </p>

        {/* Form */}
        {!submitted ? (
          <form
            action={async (formData) => {
              const res = await subscribeNewsletter(formData);
              if (res.success) {
                setEmail("");
                setSubmitted(true);
                toast.success("You’re on the newsletter list ✨");
              } else {
                toast.error(res.message ?? "Something went wrong");
              }
            }}
            className="flex gap-2 w-full items-center"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="absolute left-[-9999px]"
            />

            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                flex-1 rounded-md px-3 py-2
                bg-[#EAE8E8]/90
                text-[#231F20]
                placeholder:text-[#231F20]/40
                outline-none
                focus:ring-2 focus:ring-[#F4683D]/60
                transition
              "
            />

            <SubmitButton disabled={!email.trim()} />
          </form>
        ) : (
          <p className="text-sm text-[#F4683D]">
            You’re on the list. Thanks for the interest 👀
          </p>
        )}

        {/* Footer note */}
        <p className="text-xs text-[#EAE8E8]/40">
          No spam. One email when we’re ready.
        </p>

        {/* Socials */}
        <div className="pt-2 flex flex-col items-center gap-3">
          <p className="text-xs text-[#EAE8E8]/50">Follow us on:</p>

          <div className="flex items-center gap-4">
            <a
              href="https://x.com/image4creatives?s=20"
              target="_blank"
              rel="noopener noreferrer"
              className="
                p-2 rounded-full
                bg-[#EAE8E8]/10
                border border-[#EAE8E8]/20
                hover:bg-[#F4683D]/20
                hover:scale-110
                transition
              "
            >
              <Twitter className="h-4 w-4 text-[#EAE8E8]" />
            </a>

            <a
              href="https://www.instagram.com/image_for_creatives/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                p-2 rounded-full
                bg-[#EAE8E8]/10
                border border-[#EAE8E8]/20
                hover:bg-[#F4683D]/20
                hover:scale-110
                transition
              "
            >
              <Instagram className="h-4 w-4 text-[#EAE8E8]" />
            </a>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
