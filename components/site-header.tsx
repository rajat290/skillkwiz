"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = (href: string) =>
    `relative group py-3 px-3 text-sm lg:text-base transition-all ${
      pathname === href ? "text-[#f73e5d] font-semibold" : "text-[#00418d]"
    }`;

  return (
    <div className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "px-0 pt-0" : "px-4 pt-4"}`}>
      <nav className={`mx-auto flex w-full transition-all duration-300 flex-col border border-white/60 bg-white/95 text-[#00418d] backdrop-blur ${isScrolled ? "max-w-full rounded-none shadow-md" : "max-w-6xl rounded-2xl shadow-lg"}`}>
        <div className={`flex items-center justify-between px-4 py-2 md:px-6 transition-all duration-300 ${isScrolled ? "min-h-16" : "min-h-20"}`}>
          <Link href="/" className="relative z-30 flex items-center">
            <Image
              src="/images/skillkwiz-logo.svg"
              alt="SkillKwiz Logo"
              width={280}
              height={84}
              className={`w-auto object-contain transition-all duration-300 ${isScrolled ? "h-[50px]" : "h-[76px]"}`}
              priority
            />
          </Link>

          <button
            className="z-30 text-[#00418d] focus:outline-none md:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            suppressHydrationWarning
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <div className="hidden items-center justify-end gap-2 md:flex">
            <Link href="/" className={navLinkClass("/")}>
              <span>Home</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-[#f6c648] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
            <Link href="/about" className={navLinkClass("/about")}>
              <span>About Us</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-[#f6c648] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
            <Link href="/services" className={navLinkClass("/services")}>
              <span>Services</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-[#f6c648] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
            <Link href="/blog" className={navLinkClass("/blog")}>
              <span>Blog</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-[#f6c648] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
            <Link
              href="/services"
              className="ml-2 rounded-md bg-[#f73e5d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#df2849]"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="absolute left-0 top-0 flex w-full flex-col items-center rounded-2xl bg-white px-4 pb-5 pt-24 shadow-lg transition-all duration-300 ease-in-out md:hidden"
          >
            <Link
              href="/"
              className="w-full py-3 text-center text-lg text-[#00418d]"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="w-full py-3 text-center text-lg text-[#00418d]"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/services"
              className="w-full py-3 text-center text-lg text-[#00418d]"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/blog"
              className="w-full py-3 text-center text-lg text-[#00418d]"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/services"
              className="mt-2 w-full rounded-md bg-[#f73e5d] px-5 py-3 text-center font-semibold text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
