import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Resources() {
  const resources = [
    {
      title: 'TensorFlow & PyTorch',
      description: 'Deep learning frameworks for building and training neural networks for biometric systems and cognitive computing applications.',
      link: 'https://www.tensorflow.org'
    },
    {
      title: 'OpenCV',
      description: 'Open source computer vision library for image processing, facial recognition, and biometric analysis.',
      link: 'https://opencv.org'
    },
    {
      title: 'Scikit-learn',
      description: 'Machine learning library for Python with tools for classification, regression, and clustering for biometric pattern recognition.',
      link: 'https://scikit-learn.org'
    },
    {
      title: 'Keras',
      description: 'High-level neural networks API for building deep learning models for cognitive biometric systems.',
      link: 'https://keras.io'
    },
    {
      title: 'Face Recognition Libraries',
      description: 'OpenFace, DeepFace, and FaceNet for facial recognition and biometric authentication research.',
      link: '#'
    },
    {
      title: 'Kaggle',
      description: 'Platform for data science competitions, datasets, and machine learning projects including biometric datasets.',
      link: 'https://www.kaggle.com'
    },
    {
      title: 'Google Colab',
      description: 'Free cloud-based Jupyter notebook environment with GPU support for training deep learning models.',
      link: 'https://colab.research.google.com'
    },
    {
      title: 'Papers with Code',
      description: 'Machine learning papers with implementation code for state-of-the-art biometric and AI research.',
      link: 'https://paperswithcode.com'
    },
    {
      title: 'ArXiv CS.CV',
      description: 'Computer Vision and Pattern Recognition preprints for latest research in biometric systems.',
      link: 'https://arxiv.org/list/cs.CV/recent'
    },
    {
      title: 'UCI Machine Learning Repository',
      description: 'Collection of datasets for machine learning research including biometric datasets.',
      link: 'https://archive.ics.uci.edu/ml'
    },
    {
      title: 'Biometric Dataset Collections',
      description: 'CASIA, FERET, LFW, and other biometric databases for research purposes.',
      link: '#'
    },
    {
      title: 'Deep Learning Course',
      description: 'Fast.ai practical deep learning course for coders focusing on neural networks and applications.',
      link: 'https://www.fast.ai'
    },
    {
      title: 'Hugging Face',
      description: 'Pre-trained models and transformers for NLP, computer vision, and multimodal AI applications.',
      link: 'https://huggingface.co'
    },
    {
      title: 'Weights & Biases',
      description: 'ML experiment tracking and model visualization for deep learning research.',
      link: 'https://wandb.ai'
    },
    {
      title: 'Google Scholar',
      description: 'Search for academic papers and research in AI, machine learning, and biometric systems.',
      link: 'https://scholar.google.com'
    },
    {
      title: 'IEEE Xplore',
      description: 'Digital library for IEEE publications on biometrics, AI, and computer vision research.',
      link: 'https://ieeexplore.ieee.org'
    },
    {
      title: 'Anaconda',
      description: 'Python distribution with data science and machine learning packages pre-installed.',
      link: 'https://www.anaconda.com'
    },
    {
      title: 'Jupyter Notebooks',
      description: 'Interactive computing environment for developing and sharing ML code and visualizations.',
      link: 'https://jupyter.org'
    },
    {
      title: 'Git & GitHub',
      description: 'Version control system and collaboration platform for research code and projects.',
      link: 'https://github.com'
    },
    {
      title: 'NVIDIA CUDA',
      description: 'Parallel computing platform for GPU-accelerated deep learning and AI applications.',
      link: 'https://developer.nvidia.com/cuda-toolkit'
    },
    {
      title: 'Matplotlib & Seaborn',
      description: 'Python visualization libraries for creating plots and graphs for research papers.',
      link: '#'
    },
    {
      title: 'NumPy & Pandas',
      description: 'Essential Python libraries for numerical computing and data manipulation in ML research.',
      link: '#'
    },
    {
      title: 'Model Zoo',
      description: 'Pre-trained models for computer vision, biometrics, and deep learning applications.',
      link: 'https://modelzoo.co'
    },
    {
      title: 'Biometric Standards',
      description: 'ISO/IEC standards for biometric systems, data formats, and performance testing.',
      link: '#'
    },
    {
      title: 'NIST Biometric Resources',
      description: 'National Institute of Standards and Technology biometric evaluation and testing resources.',
      link: 'https://www.nist.gov/programs-projects/biometrics'
    },
    {
      title: 'Research Gate',
      description: 'Academic social network for sharing research papers and collaborating with scientists.',
      link: 'https://www.researchgate.net'
    },
    {
      title: 'Stack Overflow',
      description: 'Q&A platform for programming questions related to ML, AI, and software development.',
      link: 'https://stackoverflow.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Research Resources</h1>
          <p className="text-gray-600">Essential tools for audio-visual biomedical research</p>
          <div className="w-24 h-1 bg-green-600 rounded mt-4"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-t-4 border-green-600 hover:scale-105 hover:-translate-y-1 duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
              <h2 className="text-lg font-bold text-gray-800 flex-1">
                {resource.title}
              </h2>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                {resource.description}
              </p>
              {resource.link !== '#' && (
                <a 
                  href={resource.link}
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Visit Resource</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
              )}
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
