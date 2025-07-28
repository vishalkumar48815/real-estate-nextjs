import HeroSearchBar from "./hero-search-bar";

// components/HeroSection.jsx
const HeroSection = () => {
  return (
    <section className="text-center py-20 bg-neutral-100 rounded-lg">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Find your next home
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Search a list of properties for rent or sale
      </p>

      <HeroSearchBar />
    </section>
  );
};

export default HeroSection;
