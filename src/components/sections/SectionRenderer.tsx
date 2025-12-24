import React from 'react';
import { BuilderSection } from '@/types/builder';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { ServicesSection } from './ServicesSection';
import { CTASection } from './CTASection';
import { TestimonialsSection } from './TestimonialsSection';
import { PricingSection } from './PricingSection';
import { GallerySection } from './GallerySection';
import { ContactSection } from './ContactSection';
import { StatsSection } from './StatsSection';
import { TeamSection } from './TeamSection';
import { FAQSection } from './FAQSection';
import { LogoCloudSection } from './LogoCloudSection';

interface SectionRendererProps {
  section: BuilderSection;
  isSelected: boolean;
  isEditing: boolean;
  onContentChange?: (field: string, value: any) => void;
}

export function SectionRenderer({ section, isSelected, isEditing, onContentChange }: SectionRendererProps) {
  const commonProps = { section, isSelected, isEditing, onContentChange };

  switch (section.type) {
    case 'hero':
      return <HeroSection {...commonProps} />;
    case 'features':
      return <FeaturesSection {...commonProps} />;
    case 'services':
      return <ServicesSection {...commonProps} />;
    case 'cta':
      return <CTASection {...commonProps} />;
    case 'testimonials':
      return <TestimonialsSection {...commonProps} />;
    case 'pricing':
      return <PricingSection {...commonProps} />;
    case 'gallery':
      return <GallerySection {...commonProps} />;
    case 'contact':
      return <ContactSection {...commonProps} />;
    case 'stats':
      return <StatsSection {...commonProps} />;
    case 'team':
      return <TeamSection {...commonProps} />;
    case 'faq':
      return <FAQSection {...commonProps} />;
    case 'logocloud':
      return <LogoCloudSection {...commonProps} />;
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
