import React from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { NavbarPreview } from '@/components/preview/NavbarPreview';
import { FooterPreview } from '@/components/preview/FooterPreview';
import { SectionRenderer } from '@/components/sections/SectionRenderer';

interface CanvasPreviewProps {
  viewport: 'desktop' | 'tablet' | 'mobile';
}

const viewportWidths = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

export function CanvasPreview({ viewport }: CanvasPreviewProps) {
  const { state, selectSection, updateSectionContent, selectedSection } = useBuilder();
  const { page, editor } = state;

  const handleSectionClick = (sectionId: string, e: React.MouseEvent) => {
    if (!editor.previewMode) {
      e.stopPropagation();
      selectSection(sectionId);
    }
  };

  const handleContentChange = (sectionId: string, field: string, value: any) => {
    const section = page.sections.find(s => s.id === sectionId);
    if (section) {
      updateSectionContent(sectionId, { ...section.content, [field]: value });
    }
  };

  const handleCanvasClick = () => {
    if (!editor.previewMode) {
      selectSection(null);
    }
  };

  return (
    <div 
      className="h-full overflow-y-auto p-8 scrollbar-thin"
      style={{ backgroundColor: 'hsl(var(--builder-panel))' }}
      onClick={handleCanvasClick}
    >
      <div
        className={`mx-auto transition-all duration-300 shadow-elevated rounded-xl overflow-hidden ${
          viewport !== 'desktop' ? 'border-4 border-border' : ''
        }`}
        style={{ 
          maxWidth: viewportWidths[viewport],
          backgroundColor: '#ffffff'
        }}
      >
        {/* Preview Content */}
        <div className="light-canvas">
          {/* Navbar */}
          <NavbarPreview 
            config={page.navbar} 
            isEditing={!editor.previewMode}
          />

          {/* Sections */}
          {page.sections
            .filter((section) => section.visible)
            .map((section) => (
              <div
                key={section.id}
                onClick={(e) => handleSectionClick(section.id, e)}
                className={`relative transition-all duration-200 ${
                  !editor.previewMode ? 'cursor-pointer' : ''
                } ${
                  editor.selectedSectionId === section.id && !editor.previewMode
                    ? 'ring-2 ring-primary ring-inset'
                    : ''
                }`}
              >
                <SectionRenderer
                  section={section}
                  isSelected={editor.selectedSectionId === section.id}
                  isEditing={editor.selectedSectionId === section.id && !editor.previewMode}
                  onContentChange={(field, value) => handleContentChange(section.id, field, value)}
                />

                {/* Section Overlay in Edit Mode */}
                {!editor.previewMode && (
                  <div 
                    className={`absolute inset-0 transition-opacity pointer-events-none ${
                      editor.selectedSectionId === section.id
                        ? 'bg-transparent'
                        : 'bg-transparent hover:bg-primary/5'
                    }`}
                  />
                )}

                {/* Section Label */}
                {!editor.previewMode && editor.selectedSectionId === section.id && (
                  <div className="absolute top-2 left-2 z-10 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium shadow-lg">
                    {section.name}
                  </div>
                )}
              </div>
            ))}

          {/* Footer */}
          <FooterPreview 
            config={page.footer} 
            isEditing={!editor.previewMode}
          />
        </div>
      </div>

      {/* Empty State */}
      {page.sections.filter(s => s.visible).length === 0 && (
        <div className="flex items-center justify-center h-[60vh] text-muted-foreground">
          <div className="text-center">
            <p className="text-lg font-medium">No visible sections</p>
            <p className="text-sm">Add or show sections from the left panel</p>
          </div>
        </div>
      )}
    </div>
  );
}
