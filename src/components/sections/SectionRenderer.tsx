import React from 'react';
import { BuilderSection } from '@/types/builder';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { ServicesSection } from './ServicesSection';
import { CTASection } from './CTASection';

interface SectionRendererProps {
  section: BuilderSection;
  isSelected: boolean;
  isEditing: boolean;
  onContentChange?: (field: string, value: any) => void;
}

export function SectionRenderer({ section, isSelected, isEditing, onContentChange }: SectionRendererProps) {
  switch (section.type) {
    case 'hero':
      return (
        <HeroSection 
          section={section} 
          isSelected={isSelected} 
          isEditing={isEditing}
          onContentChange={onContentChange}
        />
      );
    case 'features':
      return (
        <FeaturesSection 
          section={section} 
          isSelected={isSelected} 
          isEditing={isEditing}
          onContentChange={onContentChange}
        />
      );
    case 'services':
      return (
        <ServicesSection 
          section={section} 
          isSelected={isSelected} 
          isEditing={isEditing}
          onContentChange={onContentChange}
        />
      );
    case 'cta':
      return (
        <CTASection 
          section={section} 
          isSelected={isSelected} 
          isEditing={isEditing}
          onContentChange={onContentChange}
        />
      );
    default:
      return (
        <div 
          className={`p-20 text-center ${isSelected ? 'ring-2 ring-primary' : ''}`}
          style={{ 
            background: section.styles.backgroundGradient || section.styles.backgroundColor || '#f8fafc',
            padding: section.styles.padding 
          }}
        >
          <p className="text-muted-foreground">Custom Section: {section.name}</p>
        </div>
      );
  }
}
