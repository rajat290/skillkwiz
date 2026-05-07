import AuthenticateSkillsSection from "@/components/authenticate-skills-section";
import HeroSlider from "@/components/hero-slider";
import LoginSection from "@/components/login-section";
import TestimonialsSection from "@/components/testimonials-section";
import WhyChooseSection from "@/components/why-choose-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSlider />
      <AuthenticateSkillsSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <LoginSection />
    </div>
  );
}
