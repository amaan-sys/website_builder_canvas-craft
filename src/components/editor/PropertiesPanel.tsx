import React from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  X, 
  Type, 
  Image, 
  Palette, 
  Settings2,
  ChevronDown,
  Layout
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getVariantsForSection } from '@/lib/sectionVariants';

export function PropertiesPanel() {
  const { state, selectedSection, updateSection, updateSectionStyles, selectSection } = useBuilder();
  const [contentOpen, setContentOpen] = React.useState(true);
  const [stylesOpen, setStylesOpen] = React.useState(true);
  const [layoutOpen, setLayoutOpen] = React.useState(true);

  const variants = selectedSection ? getVariantsForSection(selectedSection.type) : [];

  if (!selectedSection) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <Settings2 className="w-12 h-12 text-muted-foreground/50 mb-4" />
        <h3 className="font-medium mb-2">No Section Selected</h3>
        <p className="text-sm text-muted-foreground">
          Click on a section in the canvas or sections list to edit its properties
        </p>
      </div>
    );
  }

  const handleContentChange = (field: string, value: any) => {
    updateSection(selectedSection.id, {
      content: { ...selectedSection.content, [field]: value }
    });
  };

  const handleStyleChange = (field: string, value: any) => {
    updateSectionStyles(selectedSection.id, { [field]: value });
  };

  const renderContentFields = () => {
    const { content } = selectedSection;
    
    switch (selectedSection.type) {
      case 'hero':
      case 'cta':
        return (
          <>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Headline</Label>
              <Input
                value={content.headline || ''}
                onChange={(e) => handleContentChange('headline', e.target.value)}
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Subheadline</Label>
              <Textarea
                value={content.subheadline || ''}
                onChange={(e) => handleContentChange('subheadline', e.target.value)}
                className="bg-secondary border-border resize-none"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Primary Button Text</Label>
              <Input
                value={content.ctaText || ''}
                onChange={(e) => handleContentChange('ctaText', e.target.value)}
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Secondary Button Text</Label>
              <Input
                value={content.ctaSecondaryText || ''}
                onChange={(e) => handleContentChange('ctaSecondaryText', e.target.value)}
                className="bg-secondary border-border"
              />
            </div>
            {selectedSection.type === 'hero' && (
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Image URL</Label>
                <Input
                  value={content.imageUrl || ''}
                  onChange={(e) => handleContentChange('imageUrl', e.target.value)}
                  className="bg-secondary border-border"
                  placeholder="https://..."
                />
              </div>
            )}
          </>
        );

      case 'features':
      case 'services':
        return (
          <>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Headline</Label>
              <Input
                value={content.headline || ''}
                onChange={(e) => handleContentChange('headline', e.target.value)}
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Subheadline</Label>
              <Textarea
                value={content.subheadline || ''}
                onChange={(e) => handleContentChange('subheadline', e.target.value)}
                className="bg-secondary border-border resize-none"
                rows={2}
              />
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">
                {selectedSection.type === 'features' ? 'Features' : 'Services'}: {(content.features || content.services)?.length || 0} items
              </p>
              <p className="text-xs text-muted-foreground italic">
                Click directly on items in the canvas to edit them
              </p>
            </div>
          </>
        );

      default:
        return (
          <p className="text-sm text-muted-foreground">
            Content editing for this section type is available in the canvas
          </p>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="font-semibold">{selectedSection.name}</h2>
          <p className="text-xs text-muted-foreground capitalize">{selectedSection.type} section</p>
        </div>
        <button 
          onClick={() => selectSection(null)}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Properties */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Layout/Variant Section */}
        {variants.length > 0 && (
          <Collapsible open={layoutOpen} onOpenChange={setLayoutOpen} className="border-b border-border">
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium">Layout Variant</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${layoutOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Choose Layout Style</Label>
                <Select
                  value={selectedSection.variant || variants[0]?.id}
                  onValueChange={(value) => updateSection(selectedSection.id, { variant: value })}
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select variant" />
                  </SelectTrigger>
                  <SelectContent>
                    {variants.map((variant) => (
                      <SelectItem key={variant.id} value={variant.id}>
                        <div className="flex flex-col">
                          <span>{variant.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Variant Preview Cards */}
              <div className="grid grid-cols-2 gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => updateSection(selectedSection.id, { variant: variant.id })}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      (selectedSection.variant || variants[0]?.id) === variant.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-muted-foreground/50'
                    }`}
                  >
                    <div className="text-xs font-medium">{variant.name}</div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{variant.description}</div>
                  </button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Content Section */}
        <Collapsible open={contentOpen} onOpenChange={setContentOpen} className="border-b border-border">
          <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Content</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${contentOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 space-y-4">
            {renderContentFields()}
          </CollapsibleContent>
        </Collapsible>

        {/* Styles Section */}
        <Collapsible open={stylesOpen} onOpenChange={setStylesOpen} className="border-b border-border">
          <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Styles</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${stylesOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Background Color</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedSection.styles.backgroundColor || '#ffffff'}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                />
                <Input
                  value={selectedSection.styles.backgroundColor || ''}
                  onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                  className="bg-secondary border-border flex-1"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Background Gradient</Label>
              <Input
                value={selectedSection.styles.backgroundGradient || ''}
                onChange={(e) => handleStyleChange('backgroundGradient', e.target.value)}
                className="bg-secondary border-border"
                placeholder="linear-gradient(135deg, #000 0%, #333 100%)"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Padding</Label>
              <Input
                value={selectedSection.styles.padding || ''}
                onChange={(e) => handleStyleChange('padding', e.target.value)}
                className="bg-secondary border-border"
                placeholder="80px 0"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Min Height</Label>
              <Input
                value={selectedSection.styles.minHeight || ''}
                onChange={(e) => handleStyleChange('minHeight', e.target.value)}
                className="bg-secondary border-border"
                placeholder="50vh"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm">Visible</Label>
              <Switch
                checked={selectedSection.visible}
                onCheckedChange={(checked) => updateSection(selectedSection.id, { visible: checked })}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Section Name */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Section Name</Label>
          <Input
            value={selectedSection.name}
            onChange={(e) => updateSection(selectedSection.id, { name: e.target.value })}
            className="bg-secondary border-border"
          />
        </div>
      </div>
    </div>
  );
}
