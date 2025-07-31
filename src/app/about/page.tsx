"use client";

const AboutPage = () => {
  return (
    <div className="w-full min-h-screen overflow-hidden">
      <div className="relative">
        <section className="md:relative py-6 lg:pt-25 lg:pb-10 w-full sm-[200] h-[100px] sm:h-[300px] md:h-[400px] bg-gradient-to-r from-[#FEE2C5] via-[#F9B8D0] to-[#C6C7F8] flex justify-center items-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white z-10">About Us</h1>
        </section>
      </div>

      <section className="max-w-[90%] mx-auto py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          At TrustNest, we are committed to creating a trustworthy and transparent real estate platform that empowers users to buy, sell, and rent properties with confidence. Our goal is to bridge the gap between property owners and seekers by offering a seamless, intuitive, and secure digital experience.
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Are</h2>
        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          TrustNest is built by a team of passionate developers and real estate professionals who understand the challenges of the industry. We believe in leveraging technology to simplify the property search and management process for everyone.
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mb-6">What We Offer</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
          <li>User-friendly platform with a clean interface</li>
          <li>ID proof verification to ensure trust and safety</li>
          <li>Real-time messaging and inquiries</li>
          <li>Advanced property filtering and recommendations</li>
          <li>Responsive design for all devices</li>
        </ul>

        <h2 className="text-3xl md:text-4xl font-bold mt-10 mb-6">Join Our Community</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Whether you&apos;re looking to rent a cozy apartment, buy your dream home, or list a property, TrustNest is here to help. Join our growing community today and experience a smarter way to manage real estate.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
