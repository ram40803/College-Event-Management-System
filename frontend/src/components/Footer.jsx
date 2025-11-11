import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 text-center text-gray-600 mt-10">
      <p>
        © {new Date().getFullYear()} CampusEvent. All rights reserved.
      </p>
      <p className="text-sm mt-2">
        Designed for college communities to simplify event management.
      </p>
    </footer>
  );
};

export default Footer;
