import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Members() {
  const principalInvestigator = {
    name: 'Md Mahbub E Noor',
    title: 'Assistant Professor',
    department: 'Department of Computer Science & Engineering',
    institution: 'University of Barishal',
    email: 'menoor@bu.ac.bd',
    description: 'Dr. Md Mahbub E Noor is an Assistant Professor in the Department of Computer Science & Engineering at the University of Barishal. His research interests include cognitive computing, biomedical signal processing, audio-visual analysis, machine learning, and deep learning applications in healthcare. He leads the CogBioAV Lab, focusing on developing intelligent systems for medical diagnostics and patient monitoring using multimodal data analysis.',
  };

  const members = [
    {
      name: 'Fahmida Rahman',
      degree: 'MS in Computer Science & Engineering',
      award: 'National Science and Technology Fellowship Award 2023 recipient',
      description: 'Fahmida is an MS in CSE (Thesis) student working on audio-based biomedical signal processing. Her research focuses on developing deep learning models for analyzing respiratory sounds, heart sounds, and other acoustic biomarkers for early disease detection using convolutional neural networks and time-frequency analysis techniques.',
    },
    {
      name: 'Sujit Halder',
      degree: 'MS in Computer Science & Engineering',
      award: 'National Science and Technology Fellowship Award 2023 recipient',
      description: 'Sujit is an MS (thesis) student in the CSE department. His research project focuses on video-based patient monitoring systems using computer vision and deep learning. The project involves developing algorithms for analyzing patient movements, facial expressions, and behavioral patterns for healthcare applications using multimodal neural network architectures.',
    },
    {
      name: 'Rumana Islam',
      degree: 'MS in Computer Science & Engineering',
      award: '',
      description: 'Rumana completed her BSc in Computer Science & Engineering from the University of Barishal and is now continuing her studies as an MS student. She is working on integrated audio-visual signal analysis for medical diagnostics. Her research interests include multimodal fusion techniques, speech-based emotion recognition, and visual symptom detection using advanced machine learning approaches.',
    },
    {
      name: 'Shamo Rahman',
      degree: 'MS in Computer Science & Engineering',
      award: '',
      description: 'Shamo is currently an MS student in the Department of Computer Science & Engineering at the University of Barishal. His research focuses on cognitive signal processing for assistive healthcare technologies. He is developing intelligent systems for medical image analysis, gait analysis from video, and acoustic-based health monitoring using deep learning and pattern recognition techniques.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Principal Investigator Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Principal Investigator</h1>
          <div className="w-24 h-1 bg-green-600 rounded mb-8"></div>
          
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-600">
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:flex-shrink-0">
                  <div className="w-48 h-48 bg-green-50 rounded-xl border-4 border-green-100 flex items-center justify-center mx-auto md:mx-0 overflow-hidden">
                    <span className="text-green-600 text-xs font-medium">Photo</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{principalInvestigator.name}</h2>
                  <p className="text-xl text-green-600 font-semibold mb-1">{principalInvestigator.title}</p>
                  <p className="text-lg text-gray-600 mb-1">{principalInvestigator.department}</p>
                  <p className="text-lg text-gray-600 mb-3">{principalInvestigator.institution}</p>
                  <p className="text-gray-600 mb-3">
                    <span className="font-semibold">Email:</span>{' '}
                    <a href={`mailto:${principalInvestigator.email}`} className="text-green-600 hover:underline">
                      {principalInvestigator.email}
                    </a>
                  </p>
                  <p className="text-gray-600 leading-relaxed">{principalInvestigator.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lab Members Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Current Lab Members</h1>
          <div className="w-24 h-1 bg-green-600 rounded"></div>
        </div>
        
        <div className="space-y-6">
          {members.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-600">
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                <div className="md:flex-shrink-0">
                  <div className="w-40 h-40 bg-green-50 rounded-xl border-4 border-green-100 flex items-center justify-center mx-auto md:mx-0 overflow-hidden">
                    <span className="text-green-600 text-xs font-medium">Photo</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-1">{member.name}</h2>
                      <p className="text-lg text-green-600 font-semibold">{member.degree}</p>
                    </div>
                  </div>
                  {member.award && (
                    <div className="bg-green-50 border-l-4 border-green-600 p-3 mb-4">
                      <p className="text-sm text-green-700 font-medium">{member.award}</p>
                    </div>
                  )}
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </div>
              </div>
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
