import Navigation from '@/components/Navigation';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 md:p-8 border-t-4 border-indigo-600">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Profile</h1>
          
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Md Mahbub E Noor</h2>
            <p className="text-base sm:text-lg text-indigo-600 font-semibold mb-3 sm:mb-4">
              Assistant Professor, Department of CSE, University of Barisal
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Principal Investigator, Cognitive Audio-Visual Biomedical Research Laboratory (CogBioAV Lab)
            </p>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Research Interests</h3>
            <ul className="text-sm sm:text-base text-gray-700 space-y-2">
              <li>Audio Signal Processing for Healthcare</li>
              <li>Computer Vision and Medical Imaging</li>
              <li>Machine Learning and Deep Learning</li>
              <li>Biomedical Signal Analysis</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
