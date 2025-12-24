import React from 'react';
import { BuilderSection } from '@/types/builder';
import { Linkedin, Twitter, Github } from 'lucide-react';

interface TeamSectionProps {
  section: BuilderSection;
  isSelected: boolean;
  isEditing: boolean;
  onContentChange?: (field: string, value: any) => void;
}

export function TeamSection({ section, isSelected, isEditing, onContentChange }: TeamSectionProps) {
  const { content, styles } = section;
  const members = content.members || [];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return Linkedin;
      case 'twitter': return Twitter;
      case 'github': return Github;
      default: return Linkedin;
    }
  };

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
            {content.headline || 'Meet Our Team'}
          </h2>
          <p 
            className="text-lg opacity-80"
            style={{ color: '#64748b' }}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onContentChange?.('subheadline', e.currentTarget.textContent)}
          >
            {content.subheadline || 'The talented people behind our success'}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member: any, index: number) => (
            <div
              key={member.id || index}
              className="group text-center"
            >
              <div className="relative mb-6 overflow-hidden rounded-3xl">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-3">
                    {(member.social || []).map((s: any, i: number) => {
                      const Icon = getSocialIcon(s.platform);
                      return (
                        <a
                          key={i}
                          href={s.url}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
              <h4 className="font-semibold text-lg text-slate-900 mb-1">{member.name}</h4>
              <p className="text-blue-600 text-sm font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
