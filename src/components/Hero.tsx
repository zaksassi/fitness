import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Transform Your Body,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Transform Your Life
          </span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Professional fitness coaching tailored to your goals. Let's build your dream physique together.
        </p>
        <div className="flex justify-center gap-4">
          <a href="#services" className="btn-primary">
            Explore Services
          </a>
          <a href="#contact" className="btn-primary bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950">
            Start Now
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 animate-bounce">
        <ChevronDown className="h-8 w-8 text-blue-500" />
      </div>
    </div>
  );
}