import React from 'react';

const transformations = [
  {
    before: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    after: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
    name: "John Doe",
    duration: "12 weeks",
    description: "Lost 30 lbs and gained significant muscle mass"
  },
  {
    before: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80",
    after: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80",
    name: "Jane Smith",
    duration: "16 weeks",
    description: "Achieved optimal body composition and strength goals"
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center">Transformations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {transformations.map((item, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-lg border border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <img src={item.before} alt="Before" className="w-full h-64 object-cover rounded-lg" />
                  <p className="text-center mt-2 text-gray-400">Before</p>
                </div>
                <div className="flex-1">
                  <img src={item.after} alt="After" className="w-full h-64 object-cover rounded-lg" />
                  <p className="text-center mt-2 text-gray-400">After</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-blue-500 mb-2">{item.duration}</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}