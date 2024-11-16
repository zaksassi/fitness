import React, { useState } from 'react';
import { Calculator as CalcIcon, Info } from 'lucide-react';

export default function Calculator() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [result, setResult] = useState<null | {
    bmi: number;
    bodyFat: number;
    calories: number;
    status: string;
    idealWeight: number;
  }>(null);

  const calculateMetrics = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // convert to meters
    const ageNum = parseInt(age);

    if (weightNum && heightNum && ageNum) {
      const bmi = weightNum / (heightNum * heightNum);
      
      // Estimated body fat percentage using BMI
      const bodyFat = (1.20 * bmi) + (0.23 * ageNum) - (10.8 * (gender === 'male' ? 1 : 0)) - 5.4;
      
      // Basic BMR using Mifflin-St Jeor Equation
      const bmr = gender === 'male'
        ? (10 * weightNum) + (6.25 * (heightNum * 100)) - (5 * ageNum) + 5
        : (10 * weightNum) + (6.25 * (heightNum * 100)) - (5 * ageNum) - 161;
      
      // Daily calories with moderate activity
      const calories = bmr * 1.55;

      // Ideal weight using Hamwi formula
      const idealWeight = gender === 'male'
        ? 48 + 2.7 * ((heightNum * 100) - 152.4) / 2.54
        : 45.5 + 2.2 * ((heightNum * 100) - 152.4) / 2.54;

      let status = '';
      if (bmi < 18.5) status = 'Underweight';
      else if (bmi < 25) status = 'Healthy';
      else if (bmi < 30) status = 'Overweight';
      else status = 'Obese';

      setResult({
        bmi: parseFloat(bmi.toFixed(1)),
        bodyFat: parseFloat(bodyFat.toFixed(1)),
        calories: Math.round(calories),
        status,
        idealWeight: Math.round(idealWeight)
      });
    }
  };

  return (
    <section id="calculator" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center">Body Metrics Calculator</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                <input
                  type="number"
                  className="input-field"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Weight</label>
                <input
                  type="number"
                  className="input-field"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Height</label>
                <input
                  type="number"
                  className="input-field"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="cm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select
                  className="input-field"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <button
              onClick={calculateMetrics}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <CalcIcon className="h-5 w-5" />
              Calculate
            </button>

            {result && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">BMI</p>
                  <p className="text-2xl font-bold">{result.bmi}</p>
                  <p className="text-sm text-blue-500">{result.status}</p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Body Fat</p>
                  <p className="text-2xl font-bold">{result.bodyFat}%</p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Daily Calories (Maintenance)</p>
                  <p className="text-2xl font-bold">{result.calories} kcal</p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Ideal Weight</p>
                  <p className="text-2xl font-bold">{result.idealWeight} kg</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-lg border border-gray-700">
            <div className="flex items-start gap-3 mb-6">
              <Info className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Why Professional Guidance Matters</h3>
                <p className="text-gray-300 mb-4">
                  While these calculations provide a baseline, achieving your ideal physique requires personalized attention and expertise. Our approach goes beyond numbers to consider:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Your unique body composition and metabolism</li>
                  <li>• Lifestyle and daily activity patterns</li>
                  <li>• Dietary preferences and restrictions</li>
                  <li>• Previous training experience</li>
                  <li>• Medical history and limitations</li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800">
              <h4 className="font-semibold mb-2">Ready to Transform?</h4>
              <p className="text-gray-300 mb-4">
                Get a customized nutrition and training plan tailored specifically to your goals and body type. Our proven methods have helped hundreds achieve their dream physique.
              </p>
              <a href="#contact" className="btn-primary block text-center">
                Start Your Journey Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}