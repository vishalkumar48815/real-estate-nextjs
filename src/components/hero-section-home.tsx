import HeroSearchBar from "./hero-search-bar";
import { Meteors } from "./magicui/meteors";
import { TypingAnimation } from "./magicui/typing-animation";

// components/HeroSection.jsx
const HeroSection = () => {
  return (
    <>
      <section className="text-center py-6 lg:pt-40 lg:pb-20 bg-neutral-100 rounded-lg">
        <TypingAnimation startOnView className="text-4xl md:text-8xl font-bold text-gray-900 mb-4">Find your next home </TypingAnimation>
        <p className="text-md md:text-lg text-gray-600 mb-2 md:mb-8 px-2">
          Search a list of properties for rent or sale
        </p>
        <HeroSearchBar />
      </section>
    </>
  );
};

export default HeroSection;
