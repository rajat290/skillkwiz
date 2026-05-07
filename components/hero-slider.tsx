"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Say Goodbye to Technical Interviews!",
    description:
      "SkillKwiz benchmarks people in their chosen profession and gives employers access to verified skill reports.",
    image: "/images/homepage/Carousel/Pick - Laptop.jpg",
  },
  {
    title: "Assessments in Secure Centers",
    description:
      "We conduct skill testing in secure centers so every assessment is structured, supervised, and reliable.",
    image: "/images/homepage/Carousel/Secure Center.jpg",
  },
  {
    title: "Candidate Authentication Eliminating Fraud",
    description:
      "Candidates are authenticated with government-approved identification before their reports are shared.",
    image: "/images/homepage/Carousel/Drivers License.jpg",
  },
  {
    title: "The World's Largest Skill Assessment Library",
    description:
      "Choose from a huge skill library of over 3000 skills. Pick the skills and we will take care of the testing.",
    image: "/images/homepage/Carousel/Skill Library.jpg",
  },
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  const goToPrevious = () => {
    setActiveSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  };

  useEffect(() => {
    const timer = window.setInterval(goToNext, 5500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[680px] overflow-hidden bg-[#052c5f] pt-28 text-white md:min-h-[720px]">
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-700 ${
            activeSlide === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={activeSlide !== index}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001f47]/90 via-[#00418d]/70 to-[#001f47]/25" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-12">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
            Skill Assessment Solutions
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            {slides[activeSlide].title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/90 md:text-lg">
            {slides[activeSlide].description}
          </p>
          <Link
            href="/services"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-[#f73e5d] px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-[#df2849]"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-20 mx-auto flex max-w-7xl items-center justify-between px-6">
        <div className="flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                activeSlide === index ? "w-9 bg-[#f6c648]" : "w-2.5 bg-white/70"
              }`}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={goToPrevious}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#00418d] shadow transition hover:bg-white"
            aria-label="Previous banner"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#00418d] shadow transition hover:bg-white"
            aria-label="Next banner"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
