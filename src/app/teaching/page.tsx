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

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 top-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-10 sm:py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Teaching</h1>
            <p className="text-gray-300 text-xs sm:text-sm">Courses and educational experience</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Teaching</h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-green-600 rounded"></div>
        </div>
        
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-6 md:p-8 border-t-4 border-green-600">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto sm:mx-0">
                  <span className="text-green-600 font-bold text-lg sm:text-xl md:text-2xl">{index + 1}</span>
                </div>
                <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2"> {exp.position}
                </h2>
                <p className="text-base sm:text-lg text-gray-700 font-medium mb-1">
                  {exp.institution}
                </p>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  {exp.period}
                </p>
              </div>
              
              <p className="text-sm sm:text-base text-gray-700 mb-3">{exp.description}</p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {exp.courses.map((course, courseIndex) => (
                  <li key={courseIndex} className="flex items-start gap-2 sm:gap-3 bg-white p-2 sm:p-3 rounded-lg">
                    <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                      {String.fromCharCode(65 + courseIndex)}
                    </span>
                    <span className="text-sm sm:text-base text-gray-700 flex-1">{course}</span>
                  </li>
                ))}
              </ul>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 sm:mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-3 sm:mb-4 md:mb-0">
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
