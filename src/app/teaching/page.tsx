import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Teaching() {
  const experiences = [
    {
      position: 'Assistant Professor',
      institution: 'University of Barishal',
      period: 'December 2014 to present',
      description: 'Teaching undergraduate and graduate Computer Science & Engineering courses:',
      courses: [
        'Artificial Intelligence and Machine Learning',
        'Digital Signal Processing',
        'Computer Vision and Image Processing',
        'Deep Learning and Neural Networks',
        'Biomedical Signal Processing',
        'Pattern Recognition',
        'Data Structures and Algorithms',
        'Multimedia Systems and Applications'
      ]
    },
    {
      position: 'Graduate Teaching Assistant',
      institution: 'Florida International University',
      period: 'August 2017 to present',
      description: 'Assisted in teaching and lab instruction for:',
      courses: [
        'Machine Learning Fundamentals (CAP5610)',
        'Computer Vision (CAP5415)'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Teaching</h1>
          <div className="w-24 h-1 bg-green-600 rounded"></div>
        </div>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border-t-4 border-green-600">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-green-600 font-bold text-2xl">{index + 1}</span>
                </div>
                <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2"> {exp.position}
                </h2>
                <p className="text-lg text-gray-700 font-medium mb-1">
                  {exp.institution}
                </p>
                <p className="text-gray-600 mb-4">
                  {exp.period}
                </p>
              </div>
              
              <p className="text-gray-700 mb-3">{exp.description}</p>
              
              <ul className="grid md:grid-cols-2 gap-3">
                {exp.courses.map((course, courseIndex) => (
                  <li key={courseIndex} className="flex items-start gap-3 bg-white p-3 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {String.fromCharCode(65 + courseIndex)}
                    </span>
                    <span className="text-gray-700 flex-1">{course}</span>
                  </li>
                ))}
              </ul>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="font-semibold text-lg">CogBio<span className="text-green-400">AV</span> Lab</p>
              <p className="text-gray-400 text-sm mt-1">University of Barishal</p>
            </div>
            <div className="text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
