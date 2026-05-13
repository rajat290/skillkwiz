import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, FileText, ShieldCheck } from "lucide-react";

export default function LoginSection() {
  return (
    <section className="bg-[#f4f8ff] py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid overflow-hidden rounded-lg bg-white shadow-xl md:grid-cols-2">
          <div className="relative min-h-[420px] bg-[#eaf4ff] p-8">
            <Image
              src="/images/homepage/futurism-perspective-digital-nomads-lifestyle 1.png"
              alt="SkillKwiz digital assessment workspace"
              fill
              className="object-cover opacity-35"
            />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#00418d]">
                  Transform Your Hiring Strategy Today
                </h2>
                <p className="mt-4 max-w-md text-[#272727]">
                  Experience a revolutionary approach to talent acquisition with
                  SkillKwiz. Sign up now and discover a world of possibilities.
                </p>
              </div>
              <div className="grid gap-3 text-sm text-[#00418d]">
                <div className="flex items-center gap-3 rounded-md bg-white/85 p-3">
                  <ShieldCheck className="h-5 w-5 text-[#f73e5d]" />
                  Secure testing centers
                </div>
                <div className="flex items-center gap-3 rounded-md bg-white/85 p-3">
                  <CheckCircle2 className="h-5 w-5 text-[#f73e5d]" />
                  Candidate authentication
                </div>
                <div className="flex items-center gap-3 rounded-md bg-white/85 p-3">
                  <FileText className="h-5 w-5 text-[#f73e5d]" />
                  Verified skill reports
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#00418d] p-8">
            <h2 className="text-2xl font-bold text-white">
              Sign in to SkillKwiz
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Access assessments, candidate reports, and scheduling options.
            </p>

            <form className="mt-7 space-y-4">
              <input
                type="email"
                placeholder="Email"
                suppressHydrationWarning
                className="w-full rounded-md bg-white p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f6c648]"
              />
              <input
                type="password"
                placeholder="Password"
                suppressHydrationWarning
                className="w-full rounded-md bg-white p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f6c648]"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="flex items-center text-white">
                  <input type="checkbox" suppressHydrationWarning className="mr-2 h-4 w-4" />
                  Remember me
                </label>
                <a
                  href="/files/dummy-resource.pdf"
                  download
                  className="text-[#c3dfff] hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <Link
                href="/services"
                className="flex w-full items-center justify-center rounded-md bg-[#f73e5d] p-3 font-semibold text-white transition hover:bg-[#df2849]"
              >
                Sign In
              </Link>

              <div className="text-center text-sm text-white">
                New to SkillKwiz?{" "}
                <Link
                  href="/services"
                  className="font-semibold text-[#f6c648] hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
