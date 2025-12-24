import React from 'react';
import { BuilderSection } from '@/types/builder';
import { ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  section: BuilderSection;
  isSelected: boolean;
  isEditing: boolean;
  onContentChange?: (field: string, value: any) => void;
}

export function HeroSection({ section, isSelected, isEditing, onContentChange }: HeroSectionProps) {
  const { content, styles } = section;

  const handleTextEdit = (field: string, e: React.FocusEvent<HTMLElement>) => {
    if (onContentChange && isEditing) {
      onContentChange(field, e.currentTarget.textContent || '');
    }
  };

  const sectionStyle: React.CSSProperties = {
    background: styles.backgroundGradient || styles.backgroundColor,
    padding: styles.padding,
    minHeight: styles.minHeight,
  };

  return (
    <section 
      className={`relative overflow-hidden transition-all duration-300 ${
        isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
      }`}
      style={sectionStyle}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: '#ffffff' }}
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => handleTextEdit('headline', e)}
            >
              {content.headline}
            </h1>
            
            <p 
              className="text-lg md:text-xl opacity-80 max-w-lg"
              style={{ color: '#e2e8f0' }}
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => handleTextEdit('subheadline', e)}
            >
              {content.subheadline}
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                className="group px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-glow flex items-center gap-2"
                style={{ 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  color: '#ffffff'
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
                className="group px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 hover:bg-white/10 flex items-center gap-2"
                style={{ 
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: '#ffffff'
                }}
              >
                <Play className="w-5 h-5" />
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextEdit('ctaSecondaryText', e)}
                >
                  {content.ctaSecondaryText}
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-white/10">
              {[
                { value: '10K+', label: 'Users' },
                { value: '50K+', label: 'Websites' },
                { value: '99%', label: 'Uptime' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#ffffff' }}>{stat.value}</div>
                  <div className="text-sm opacity-60" style={{ color: '#e2e8f0' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img 
                src={content.imageUrl}
                alt="Hero"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-xl opacity-80 animate-pulse-glow" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-lg opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
}
