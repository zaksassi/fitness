import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    const mailtoLink = `mailto:zakariasassi1@gmail.com?subject=Fitness Coaching Inquiry&body=Name: ${formData.name}%0D%0APhone: ${formData.phone}%0D%0AGoal: ${formData.goal}%0D%0A%0D%0AMessage: ${formData.message}`;
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      goal: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center">Start Your Journey</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-lg border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                required
                className="input-field"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                className="input-field"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                className="input-field"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fitness Goal</label>
              <select
                name="goal"
                required
                className="input-field"
                value={formData.goal}
                onChange={handleChange}
              >
                <option value="">Select a goal</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="endurance">Endurance</option>
                <option value="general-fitness">General Fitness</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              name="message"
              rows={4}
              className="input-field"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            <Send className="h-5 w-5" />
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}