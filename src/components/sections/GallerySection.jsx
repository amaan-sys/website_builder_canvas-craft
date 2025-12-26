import React from 'react';
import { ExternalLink } from 'lucide-react';

export function GallerySection({ section, isSelected, isEditing, onContentChange }) {
  const { content, styles } = section;
  const images = content.images || [];

  return (
    <section
      className="relative"
      style={{
        background: styles.backgroundGradient || styles.backgroundColor || '#ffffff',
        padding: styles.padding || '100px 0',
      }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: '#0f172a' }}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onContentChange?.('headline', e.currentTarget.textContent)}
          >
            {content.headline || 'Our Portfolio'}
          </h2>
          <p 
            className="text-lg opacity-80"
            style={{ color: '#64748b' }}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onContentChange?.('subheadline', e.currentTarget.textContent)}
          >
            {content.subheadline || 'A showcase of our finest work'}
          </p>
        </div>

        {/* Gallery Grid - Masonry-like */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id || index}
              className={`relative group overflow-hidden rounded-2xl ${
                index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={image.url}
                alt={image.title || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white font-semibold">{image.title}</h4>
                  <p className="text-white/70 text-sm">{image.category}</p>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
