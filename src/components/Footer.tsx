
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">About</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-base text-gray-700 hover:text-travel-blue">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-base text-gray-700 hover:text-travel-blue">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-base text-gray-700 hover:text-travel-blue">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Features</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/features" className="text-base text-gray-700 hover:text-travel-blue">
                  AI Itinerary Planning
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-base text-gray-700 hover:text-travel-blue">
                  Budget Tracking
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-base text-gray-700 hover:text-travel-blue">
                  Real-time Weather Alerts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-base text-gray-700 hover:text-travel-blue">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-base text-gray-700 hover:text-travel-blue">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-700 hover:text-travel-blue">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Connect</h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-travel-blue">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-travel-blue">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-travel-blue">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-travel-blue">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-travel-blue">
                <Mail className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Subscribe to our newsletter</p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 border border-gray-300 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-travel-blue"
                />
                <button className="bg-travel-blue text-white px-4 py-2 rounded-r-md hover:bg-travel-blue/90">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link to="/terms" className="text-sm text-gray-500 hover:text-travel-blue">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-travel-blue">
              Privacy
            </Link>
            <Link to="/cookies" className="text-sm text-gray-500 hover:text-travel-blue">
              Cookies
            </Link>
          </div>
          <p className="mt-8 text-base text-gray-500 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} AI Itinerary Planner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
