import Navigation from '@/components/Navigation';

export default function Album() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 top-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Photo Album</h1>
            <p className="text-gray-300 text-sm">Lab activities and events</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-indigo-600">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Photo Album</h1>
          <p className="text-gray-600">
            Lab activities, events, and research snapshots will be displayed here.
          </p>
        </div>
      </main>
    </div>
  );
}
