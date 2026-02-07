'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

interface Photo {
  url: string;
  caption: string;
  order: number;
}

interface Album {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  photos: Photo[];
  category: string;
  date: string;
  isPublished: boolean;
}

export default function AlbumPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<{ url: string; caption: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch('/api/albums');
        const data = await res.json();
        if (data.success) {
          setAlbums(data.data.filter((a: Album) => a.isPublished));
        }
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };
    fetchAlbums();
  }, []);

  const categories = ['All', ...new Set(albums.map(a => a.category))];
  const filteredAlbums = selectedCategory === 'All' 
    ? albums 
    : albums.filter(a => a.category === selectedCategory);

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Photo Album</h1>
            <p className="text-gray-300 text-xs sm:text-sm">Lab activities and events</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">
        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Albums Grid */}
        {filteredAlbums.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlbums.map((album) => (
              <div
                key={album._id}
                onClick={() => setSelectedAlbum(album)}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="relative h-48 bg-gray-100">
                  {album.coverImage ? (
                    <Image src={album.coverImage} alt={album.title} fill className="object-cover" />
                  ) : album.photos && album.photos.length > 0 ? (
                    <Image src={album.photos[0].url} alt={album.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2">
                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {album.photos?.length || 0} photos
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{album.title}</h3>
                  <p className="text-sm text-purple-600 mb-2">{album.category} • {new Date(album.date).toLocaleDateString()}</p>
                  {album.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{album.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">No Albums Yet</h2>
            <p className="text-gray-600">Photo albums will be displayed here once they are added.</p>
          </div>
        )}
      </main>

      {/* Album Modal */}
      {selectedAlbum && (
        <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="text-white">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1">{selectedAlbum.title}</h2>
                  <p className="text-gray-300">{selectedAlbum.category} • {new Date(selectedAlbum.date).toLocaleDateString()}</p>
                  {selectedAlbum.description && (
                    <p className="text-gray-400 mt-2 max-w-2xl">{selectedAlbum.description}</p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="text-white hover:text-gray-300 p-2"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Photos Grid */}
              {selectedAlbum.photos && selectedAlbum.photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {selectedAlbum.photos.map((photo, index) => (
                    <div
                      key={index}
                      onClick={() => setLightboxPhoto(photo)}
                      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <Image src={photo.url} alt={photo.caption || `Photo ${index + 1}`} fill className="object-cover" />
                      {photo.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                          <p className="text-white text-xs truncate">{photo.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-400">
                  <p>No photos in this album yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 bg-black z-[60] flex items-center justify-center"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            onClick={() => setLightboxPhoto(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxPhoto.url}
              alt={lightboxPhoto.caption || 'Photo'}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto object-contain"
            />
            {lightboxPhoto.caption && (
              <p className="text-white text-center mt-4 text-lg">{lightboxPhoto.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
