import React from "react";
import { HiCalendar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0c1120] text-white pt-24 pb-10 mt-20">

      {/* CTA Section */}
      <div className="text-center max-w-3xl mx-auto mb-20 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Ready to Transform Your Campus Events?
        </h2>

        <p className="text-gray-300 text-lg mb-10">
          Join leading colleges and create memorable experiences for your students
        </p>

      <button
  onClick={() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/signup");
  }}
  className="bg-white text-gray-900 font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2 mx-auto"
>
  Get Started Free →
</button>
      </div>

      {/* Footer Links Section */}
      <div className="border-t border-gray-700/50 pt-14 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

          {/* Branding Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-blue-500 text-3xl">
                <HiCalendar />
              </div>
              <h3 className="text-lg font-semibold">College Event Management</h3>
            </div>
            <p className="text-gray-400 text-sm leading-6">
              Empowering colleges to create extraordinary events
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Features</li>
              <li>Pricing</li>
              <li>Updates</li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>About</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Privacy</li>
              <li>Terms</li>
              <li>Security</li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between max-w-7xl mx-auto mt-12 text-gray-500 text-sm px-2">
          <p>© {new Date().getFullYear()} College Event Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
