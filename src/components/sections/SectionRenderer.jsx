import React from 'react';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { ServicesSection } from './ServicesSection';
import { CTASection } from './CTASection';
import { TestimonialsSection } from './TestimonialsSection';
import { PricingSection } from './PricingSection';
import { GallerySection } from './GallerySection';
import { GalleryMasonrySection } from './GalleryMasonrySection';
import { BlogListSection } from './BlogListSection';
import { ContactSection } from './ContactSection';
import { StatsSection } from './StatsSection';
import { TeamSection } from './TeamSection';
import { FAQSection } from './FAQSection';
import { LogoCloudSection } from './LogoCloudSection';
import { ContentSection } from './ContentSection';

export function SectionRenderer({ section, isSelected, isEditing, onContentChange }) {
  const commonProps = { section, isSelected, isEditing, onContentChange };
  switch (section.type) {
    case 'hero': return <HeroSection {...commonProps} />;
    case 'features': return <FeaturesSection {...commonProps} />;
    case 'services': return <ServicesSection {...commonProps} />;
    case 'cta': return <CTASection {...commonProps} />;
    case 'testimonials': return <TestimonialsSection {...commonProps} />;
    case 'pricing': return <PricingSection {...commonProps} />;
    case 'gallery': return <GallerySection {...commonProps} />;
    case 'gallery-masonry': return <GalleryMasonrySection {...commonProps} />;
    case 'blog': return <BlogListSection {...commonProps} />;
    case 'contact': return <ContactSection {...commonProps} />;
    case 'stats': return <StatsSection {...commonProps} />;
    case 'team': return <TeamSection {...commonProps} />;
    case 'faq': return <FAQSection {...commonProps} />;
    case 'logocloud': return <LogoCloudSection {...commonProps} />;
    case 'content': return <ContentSection {...commonProps} />;
    default: {
      // Legacy support: render 'image' sections inline so existing pages keep showing images
      if (section.type === 'image') {
        const content = section.content || {};
        const background = section.styles.useGradient ? (section.styles.backgroundGradient || section.styles.backgroundColor) : (section.styles.backgroundColor || '#ffffff');
        return (
          <section className={`py-12 ${isSelected ? 'ring-2 ring-primary' : ''}`} style={{ background, padding: section.styles.padding }}>
            <div className="container mx-auto px-6">
              <div className={`max-w-4xl mx-auto ${content.align === 'center' ? 'text-center' : 'text-left'}`}>
                <div className="relative rounded-lg overflow-hidden shadow-elevated">
                  <img src={content.imageUrl} alt={content.alt || ''} className="w-full h-auto object-cover" />
                </div>
                {content.caption && <p className="mt-4 text-muted-foreground">{content.caption}</p>}
              </div>
            </div>
          </section>
        );
      }

      const background = section.styles.useGradient ? (section.styles.backgroundGradient || section.styles.backgroundColor) : (section.styles.backgroundColor || '#f8fafc');
      return <div className={`p-20 text-center ${isSelected ? 'ring-2 ring-primary' : ''}`} style={{ background, padding: section.styles.padding }}><p className="text-muted-foreground">Custom Section: {section.name}</p></div>;
    }
  }
}
