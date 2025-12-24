import React from 'react';
import { BuilderSection } from '@/types/builder';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CTASectionProps {
  section: BuilderSection;
  isSelected: boolean;
  isEditing: boolean;
  onContentChange?: (field: string, value: any) => void;
}

export function CTASection({ section, isSelected, isEditing, onContentChange }: CTASectionProps) {
  const { content, styles } = section;

  const handleTextEdit = (field: string, e: React.FocusEvent<HTMLElement>) => {
    if (onContentChange && isEditing) {
      onContentChange(field, e.currentTarget.textContent || '');
    }
  };

  const sectionStyle: React.CSSProperties = {
    background: styles.backgroundGradient || styles.backgroundColor,
    padding: styles.padding,
  };

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
