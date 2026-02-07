import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Schedule() {
  const presentations = [
    {
      date: '14/05/2025',
      students: ['Ahesan', 'Oishi']
    },
    {
      date: '21/05/2025',
      students: ['Sakib', 'Rahat', 'Toma']
    },
    {
      date: '28/05/2025',
      students: ['Moon', 'Setu']
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">Presentation Schedule</h1>
            <p className="text-gray-300 text-xs sm:text-sm">Upcoming lab presentations</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">
        
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8">
          Students will present their research outcome as scheduled below:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {presentations.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-600">
              <div className="bg-green-50 p-3 sm:p-4 border-b border-green-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
                {item.date}
              </h2>
                </div>
              </div>
              <div className="p-3 sm:p-4">
              <ul className="space-y-2">
                {item.students.map((student, studentIndex) => (
                  <li key={studentIndex} className="flex items-center gap-2 sm:gap-3 p-2 hover:bg-green-50 rounded transition-colors">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-xs sm:text-sm">{studentIndex + 1}</span>
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{student}</span>
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
              <p className="font-semibold text-base sm:text-lg">CogBio<span className="text-green-400">AV</span> Lab</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">University of Barishal</p>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">
              <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
