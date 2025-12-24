import React from 'react';
import { BuilderSection } from '@/types/builder';

interface LogoCloudSectionProps {
  section: BuilderSection;
  isSelected: boolean;
  isEditing: boolean;
  onContentChange?: (field: string, value: any) => void;
}

export function LogoCloudSection({ section, isSelected, isEditing, onContentChange }: LogoCloudSectionProps) {
  const { content, styles } = section;
  const logos = content.logos || [];

  return (
    <section
      className="relative"
      style={{
        background: styles.backgroundGradient || styles.backgroundColor || '#ffffff',
        padding: styles.padding || '60px 0',
      }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {content.headline && (
          <p 
            className="text-center text-slate-500 text-sm uppercase tracking-wider mb-8"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onContentChange?.('headline', e.currentTarget.textContent)}
          >
            {content.headline}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo: any, index: number) => (
            <div
              key={logo.id || index}
              className="opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
