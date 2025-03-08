import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Support Column */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-600 hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/aircover" className="text-gray-600 hover:underline">
                  AirCover
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-gray-600 hover:underline">
                  Safety information
                </Link>
              </li>
              <li>
                <Link
                  to="/disabilities"
                  className="text-gray-600 hover:underline"
                >
                  Supporting people with disabilities
                </Link>
              </li>
              <li>
                <Link
                  to="/cancellation"
                  className="text-gray-600 hover:underline"
                >
                  Cancellation options
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Listing Column */}
          <div>
            <h3 className="font-semibold mb-4">Shop Listing</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/try-listing"
                  className="text-gray-600 hover:underline"
                >
                  Try Listing
                </Link>
              </li>
              <li>
                <Link
                  to="/aircover-owners"
                  className="text-gray-600 hover:underline"
                >
                  AirCover for Owners
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:underline">
                  Explore listing resources
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:underline">
                  Visit our community forum
                </Link>
              </li>
              <li>
                <Link
                  to="/responsible"
                  className="text-gray-600 hover:underline"
                >
                  How to list responsibly
                </Link>
              </li>
            </ul>
          </div>

          {/* Nylour Column */}
          <div>
            <h3 className="font-semibold mb-4">Nylour</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/newsroom" className="text-gray-600 hover:underline">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-600 hover:underline">
                  Learn about new features
                </Link>
              </li>
              <li>
                <Link to="/founders" className="text-gray-600 hover:underline">
                  Letter from our founders
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/investors" className="text-gray-600 hover:underline">
                  Investors
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-gray-600">© 2024-25 Nylour.com</span>
            <span className="text-gray-300">·</span>
            <Link
              to="/privacy"
              className="text-sm text-gray-600 hover:underline"
            >
              Privacy
            </Link>
            <span className="text-gray-300">·</span>
            <Link to="/terms" className="text-sm text-gray-600 hover:underline">
              Terms
            </Link>
            <span className="text-gray-300">·</span>
            <Link
              to="/sitemap"
              className="text-sm text-gray-600 hover:underline"
            >
              Sitemap
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-600 hover:underline">
              English (US)
            </button>
            <button className="text-sm text-gray-600 hover:underline">
              INR
            </button>
            <button className="text-sm text-gray-600 hover:underline">
              Support & resources
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
