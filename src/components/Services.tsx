import React from 'react';
import { Users, Target, Crosshair, Heart } from 'lucide-react';

const services = [
  {
    icon: Users,
    title: 'Personal Training',
    description: 'One-on-one training sessions tailored to your specific goals and needs.'
  },
  {
    icon: Target,
    title: 'Custom Workout Plans',
    description: 'Personalized workout programs designed to maximize your results.'
  },
  {
    icon: Crosshair,
    title: 'Nutrition Coaching',
    description: 'Expert guidance on nutrition to complement your fitness journey.'
  },
  {
    icon: Heart,
    title: 'Lifestyle Coaching',
    description: 'Holistic approach to transform your habits and maintain results.'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-lg border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <service.icon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}