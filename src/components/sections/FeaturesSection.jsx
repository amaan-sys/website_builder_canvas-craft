import React from 'react';
import * as Icons from 'lucide-react';

export function FeaturesSection({ section, isSelected, isEditing, onContentChange }) {
  const { content, styles } = section;

  const handleTextEdit = (field, e) => {
    if (onContentChange && isEditing) {
      onContentChange(field, e.currentTarget.textContent || '');
    }
  };

  const sectionStyle = {
    background: styles.backgroundGradient || styles.backgroundColor,
    padding: styles.padding,
  };

  // Dynamic icon component
  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent className="w-8 h-8" /> : null;
  };

  return (
    <section 
      className={`relative transition-all duration-300 ${
        isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
      }`}
      style={sectionStyle}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: '#0f172a' }}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => handleTextEdit('headline', e)}
          >
            {content.headline}
          </h2>
          <p 
            className="text-lg opacity-70"
            style={{ color: '#475569' }}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => handleTextEdit('subheadline', e)}
          >
            {content.subheadline}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features?.map((feature, index) => (
            <div 
              key={feature.id}
              className="group relative p-8 rounded-2xl transition-all duration-300 hover:shadow-soft hover:-translate-y-1"
              style={{ 
                background: '#f8fafc',
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Icon */}
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ 
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  color: '#ffffff'
                }}
              >
                {getIcon(feature.icon)}
              </div>

              {/* Content */}
              <h3 
                className="text-xl font-bold mb-3"
                style={{ color: '#0f172a' }}
                contentEditable={isEditing}
                suppressContentEditableWarning
              >
                {feature.title}
              </h3>
              <p 
                className="opacity-70 leading-relaxed"
                style={{ color: '#475569' }}
                contentEditable={isEditing}
                suppressContentEditableWarning
              >
                {feature.description}
              </p>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
