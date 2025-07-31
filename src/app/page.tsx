import FeaturedProperties from "@/components/featured-properties-section";
import HeroSection from "@/components/hero-section-home";
import { TestimonialSlider } from "@/components/testimonial-slider";
import Footer from "@/components/footer";

export default function Home() {
  return <>
    <main className="w-full">
      <HeroSection />
      <div className="px-4 sm:px-6 lg:px-8">
        <FeaturedProperties />
        <TestimonialSlider />
      </div>
    </main>
    <Footer />
  </>
}
