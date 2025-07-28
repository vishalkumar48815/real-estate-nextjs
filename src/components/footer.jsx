const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5] text-black">
      <div className="bg-[#030722] text-white text-xs sm:text-sm py-3 px-6 flex flex-col sm:flex-row justify-between items-center">
        <p>TrustNext Copyright 2024, All Rights Reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Pricing</a>
          <a href="#" className="hover:underline">Do not sell or share my personal information</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
