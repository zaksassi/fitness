import React from 'react';
import { Dumbbell } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-black/50 backdrop-blur-lg z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-white">ZakTech Solution</span>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#services" className="text-gray-300 hover:text-blue-500 transition-colors">Services</a>
              <a href="#portfolio" className="text-gray-300 hover:text-blue-500 transition-colors">Portfolio</a>
              <a href="#calculator" className="text-gray-300 hover:text-blue-500 transition-colors">Calculator</a>
              <a href="#contact" className="btn-primary">Contact Me</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}