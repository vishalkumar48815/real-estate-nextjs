import HeroSearchBar from "./hero-search-bar";
import { TypingAnimation } from "./magicui/typing-animation";

const HeroSection = () => {
  return (
    <>
      <section className="relative text-center py-6 lg:pt-40 lg:pb-20 bg-slate-100 bg-cover bg-center" style={{ backgroundImage: "url('/home-img.webp')" }}>
      <div className="absolute inset-0 bg-slate-300" style={{ opacity: 0.5 }}></div>
        <div className="relative z-10">
          <TypingAnimation startOnView className="text-4xl md:text-8xl font-bold text-gray-900 mb-4">Find your next home </TypingAnimation>
          <p className="text-md md:text-lg text-gray-600 mb-2 md:mb-8 px-2">
            Search a list of properties for rent or sale
          </p>
          <HeroSearchBar />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
