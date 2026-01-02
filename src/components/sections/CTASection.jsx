import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection({ section, isSelected, isEditing, onContentChange }) {
  const { content, styles } = section;
  const variant = section.variant || 'simple';

  const background = styles.useGradient ? (styles.backgroundGradient || styles.backgroundColor) : (styles.backgroundColor || 'linear-gradient(90deg,#0ea5e9,#8b5cf6)');
  const sectionStyle = { background, padding: styles.padding };

  const handleTextEdit = (field, e) => {
    if (onContentChange && isEditing) {
      onContentChange(field, e.currentTarget.textContent || '');
    }
  };

  // Split layout
  if (variant === 'split') {
    return (
      <section className={`relative overflow-hidden transition-all duration-300 ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`} style={sectionStyle}>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => handleTextEdit('headline', e)}>{content.headline}</h2>
              <p className="text-lg text-white/80 mb-6" contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => handleTextEdit('subheadline', e)}>{content.subheadline}</p>
              <div className="flex gap-4">
                <button className="px-6 py-3 rounded-md bg-white text-blue-600 font-semibold" contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => handleTextEdit('ctaText', e)}>{content.ctaText}</button>
                <button className="px-6 py-3 rounded-md border border-white/30 text-white" contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => handleTextEdit('ctaSecondaryText', e)}>{content.ctaSecondaryText}</button>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 flex items-center justify-center">
              {content.imageUrl ? <img src={content.imageUrl} alt="CTA" className="w-full object-cover rounded-md" /> : <div className="w-full h-56 bg-white/5 rounded-md" />}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Banner layout
  if (variant === 'banner') {
    return (
      <section className={`relative overflow-hidden transition-all duration-300 ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`} style={sectionStyle}>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between gap-4 py-6">
            <div className="flex-1">
              <h3 className="text-xl text-white font-semibold" contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => handleTextEdit('headline', e)}>{content.headline}</h3>
              <p className="text-sm text-white/80" contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => handleTextEdit('subheadline', e)}>{content.subheadline}</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-md bg-white text-blue-600 font-semibold" contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => handleTextEdit('ctaText', e)}>{content.ctaText}</button>
              <button className="px-4 py-2 rounded-md border border-white/30 text-white" contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => handleTextEdit('ctaSecondaryText', e)}>{content.ctaSecondaryText}</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Floating card
  if (variant === 'floating') {
    return (
      <section className={`relative overflow-hidden transition-all duration-300 ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`} style={sectionStyle}>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-center">
            <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-3xl text-center">
              <h2 className="text-2xl font-bold mb-2" contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => handleTextEdit('headline', e)}>{content.headline}</h2>
              <p className="text-slate-600 mb-6" contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => handleTextEdit('subheadline', e)}>{content.subheadline}</p>
              <div className="flex justify-center gap-3">
                <button className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold" contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => handleTextEdit('ctaText', e)}>{content.ctaText}</button>
                <button className="px-6 py-3 rounded-md border border-slate-200" contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => handleTextEdit('ctaSecondaryText', e)}>{content.ctaSecondaryText}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default (simple) layout
  return (
    <section 
      className={`relative overflow-hidden transition-all duration-300 ${
        isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
      }`}
      style={sectionStyle}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Limited Time Offer</span>
          </div>

          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => handleTextEdit('headline', e)}
          >
            {content.headline}
          </h2>
          
          <p 
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => handleTextEdit('subheadline', e)}
          >
            {content.subheadline}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button 
              className="group px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
              style={{ 
                backgroundColor: '#ffffff',
                color: '#3b82f6'
              }}
            >
              <span
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => handleTextEdit('ctaText', e)}
              >
                {content.ctaText}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/30 text-white transition-all duration-300 hover:bg-white/10"
            >
              <span
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => handleTextEdit('ctaSecondaryText', e)}
              >
                {content.ctaSecondaryText}
              </span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-12 pt-8 border-t border-white/10">
            <span className="text-white/60 text-sm">Trusted by:</span>
            {['Google', 'Microsoft', 'Apple', 'Amazon'].map((company, i) => (
              <span key={i} className="text-white/40 font-semibold">{company}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
