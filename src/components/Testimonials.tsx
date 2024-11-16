import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Michael Chen',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    text: 'The personalized approach and dedication to my success were incredible. Transformed my life completely!',
    rating: 5
  },
  {
    name: 'Sarah Williams',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    text: 'Not just a trainer, but a mentor who helped me achieve what I thought was impossible.',
    rating: 5
  },
  {
    name: 'Ahmed Hassan',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    text: 'The nutrition advice and workout plans were perfectly tailored to my needs. Outstanding results!',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center">Client Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-lg border border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-400">{testimonial.country}</p>
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}