import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Publications() {
  const publications = [
    {
      citation: "Rahman, F., Halder, S., Rahman, S., & Hossen, M. L. (2025). Investigating the Therapeutic Ability of Novel Antimicrobial Peptide Dendropsophin 1 and Its Analogues through Membrane Disruption and Monomeric Pore Formation, The Journal of Physical Chemistry B.",
      note: "(Featured on the cover page)",
      doi: "https://doi.org/10.1021/acs.jpcb.4c07758"
    },
    {
      citation: "Gressett, T.E., Hossen, M.L., Talkington, G., Volic, M., Perez, H., Tiwari, P.B., Chapagain, P. and Bix, G., 2023. Molecular Interactions between Perlecan LG3 and the SARS‐CoV‐2 spike protein RBD. Protein Science, p.e4843.",
      note: "(Equal/Joint First Author) (Featured on the cover page)",
      doi: "https://doi.org/10.1002/pro.4843"
    },
    {
      citation: "Hossen, M. L., Baral, P., Sharma, T., Gerstman, B., & Chapagain, P. (2022). Significance of the RBD mutations in the SARS-CoV-2 Omicron: From spike opening to antibody escape and cell attachment. Physical Chemistry Chemical Physics, 24(16), 9123-9129.",
      note: "",
      doi: "https://doi.org/10.1039/D2CP00169A"
    },
    {
      citation: "Baral, P., Bhattarai, N., Hossen, M. L., Stebliankin, V., Gerstman, B. S., Narasimhan, G., & Chapagain, P. P. (2021). Mutation-induced changes in the receptor-binding interface of the SARS-CoV-2 Delta variant B. 1.617. 2 and implications for immune evasion. Biochemical and biophysical research communications, 574, 14-19.",
      note: "",
      doi: "10.1016/j.bbrc.2021.08.036"
    },
    {
      citation: "Bhattarai, N., Pavadai, E., Pokhrel, R., Baral, P., Hossen, M. L., Stahelin, R. V., ... & Gerstman, B. S. (2022). Ebola virus protein VP40 binding to Sec24c for transport to the plasma membrane. Proteins: Structure, Function, and Bioinformatics, 90(2), 340-350.",
      note: "",
      doi: "10.1002/prot.26221"
    },
    {
      citation: "Barrios, A., Milan, M., Perozo, E., Hossen, M. L., Chapagain, P., & Moon, J. H. (2022). Effects of sidechain isomerism on polymer-based non-covalent protein delivery. Chemical Communications, 58(59), 8246-8249.",
      note: "",
      doi: "https://doi.org/10.1039/D2CC02343A"
    },
    {
      citation: "Jeanne Dit Fouque, K., Sipe, S. N., Garabedian, A., Mejia, G., Su, L., Hossen, M. L., ... & Fernandez-Lima, F. (2022). Exploring the Conformational and Binding Dynamics of HMGA2·DNA Complexes Using Trapped Ion Mobility Spectrometry–Mass Spectrometry. Journal of the American Society for Mass Spectrometry, 33 (7), 1103-1112.",
      note: "",
      doi: "https://doi.org/10.1021/jasms.2c00101"
    },
    {
      citation: "Nader, Danielle, Timothy E. Gressett, Md Lokman Hossen, Prem Chapagain, Steven W. Kerrigan, and Gregory Bix. (2022). A Dual-Receptor Mechanism Between Integrins And ACE2 Widens SARS-Cov-2 Tissue Tropism. BioRxiv (2022).",
      note: "",
      doi: "https://doi.org/10.1101/2022.01.02.474028"
    }
  ];

  const bookChapters = [
    {
      citation: "Hossen, M.L., Bhattarai, N. and Chapagain, P.P., 2024, The Role of Protonation in the PfMATE Transporter Protein. Protein Supersecondary Structures: Methods and Protocols, p.315.",
      doi: "10.1007/978-1-0716-4213-9_16"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Publications</h1>
          <p className="text-gray-600 mb-4">Peer reviewed and Preprint</p>
          <div className="w-24 h-1 bg-green-600 rounded"></div>
        </div>
        
        {/* Profile Links */}
        <div className="flex gap-4 mb-8">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 text-gray-700 hover:text-green-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm.5 4.5a.5.5 0 11-1 0 .5.5 0 011 0zm2.5 15.5h-6v-1.5h2V11h-2V9.5h3.5v9h2V20z"/>
            </svg>
            ORCiD
          </a>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.5 4.5a.5.5 0 11-1 0 .5.5 0 011 0zm2.5 15.5h-6v-1.5h2V11h-2V9.5h3.5v9h2V20z"/>
            </svg>
            Google Scholar
          </a>
        </div>

        {/* Publications List */}
        <div className="space-y-6 mb-12">
          {publications.map((pub, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-green-600">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">{index + 1}</span>
                </div>
                <div className="flex-1">
              <p className="text-gray-700 mb-3 leading-relaxed">
                {pub.citation}
                {pub.note && (
                  <span className="ml-2 inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">{pub.note}</span>
                )}
              </p>
              <a 
                href={pub.doi} 
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium bg-green-50 px-3 py-1 rounded-lg hover:bg-green-100 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                <span>View Publication</span>
              </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Book Chapters */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Chapter</h2>
          <div className="w-24 h-1 bg-green-600 rounded"></div>
        </div>
        <div className="space-y-6">
          {bookChapters.map((chapter, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <div className="flex-1">
              <p className="text-gray-700 mb-3 leading-relaxed">
                {chapter.citation}
              </p>
              <a 
                href={`https://doi.org/${chapter.doi}`} 
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium bg-orange-50 px-3 py-1 rounded-lg hover:bg-orange-100 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                <span>View Chapter</span>
              </a>
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
