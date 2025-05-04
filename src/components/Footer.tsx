import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 px-6 bg-[#693d14] text-white text-sm mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">
          © {new Date().getFullYear()} HisTalks - Conversations Through Time
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-amber-400 transition-colors">About</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;