
import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Restore.pics</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Professional photo restoration service combining advanced AI technology with expert human touch to bring your precious memories back to life.
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">📧 hello@restore.pics</p>
              <p className="text-gray-300">📞 1-800-RESTORE</p>
              <p className="text-gray-300">🕒 24/7 Customer Support</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h4 className="text-xl font-semibold mb-6 text-center">Get a Custom Quote</h4>
          <div className="max-w-2xl mx-auto">
            <form className="grid md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <textarea 
                placeholder="Describe your photo restoration needs..." 
                rows={4}
                className="md:col-span-2 bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              ></textarea>
              <button 
                type="submit" 
                className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Request Quote
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © 2024 Restore.pics. All rights reserved. Preserving memories with care and precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
