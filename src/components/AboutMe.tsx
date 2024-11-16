import React from 'react';
import { Award, Users, Scroll, Trophy } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '500+',
    label: 'Transformations'
  },
  {
    icon: Scroll,
    value: '15+',
    label: 'Certifications'
  },
  {
    icon: Trophy,
    value: '10+',
    label: 'Years Experience'
  },
  {
    icon: Award,
    value: '50+',
    label: 'Awards'
  }
];

const certifications = [
  'NASM Certified Personal Trainer',
  'ISSA Nutrition Specialist',
  'ACE Fitness Instructor',
  'CrossFit Level 2 Trainer',
  'Precision Nutrition Coach'
];

export default function AboutMe() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center">About Me</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-lg border border-gray-700">
              <h3 className="text-2xl font-semibold mb-4">Professional Journey</h3>
              <p className="text-gray-300 leading-relaxed">
                With over a decade of experience in fitness and nutrition coaching, I've dedicated my life to helping people achieve their dream physique and optimal health. My approach combines cutting-edge science with practical, sustainable methods that deliver real results.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-lg border border-gray-700">
              <h3 className="text-2xl font-semibold mb-4">Certifications</h3>
              <ul className="space-y-2">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Scroll className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-300">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-lg border border-gray-700 flex flex-col items-center justify-center text-center">
                <stat.icon className="h-8 w-8 text-blue-500 mb-2" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}