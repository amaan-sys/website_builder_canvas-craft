import React from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Type, Palette, Settings2, ChevronDown, Layout } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getVariantsForSection } from '@/lib/sectionVariants';

export function PropertiesPanel() {
  const { state, selectedSection, updateSection, updateSectionStyles, selectSection } = useBuilder();
  const [contentOpen, setContentOpen] = React.useState(true);
  const [stylesOpen, setStylesOpen] = React.useState(true);
  const [layoutOpen, setLayoutOpen] = React.useState(true);
  const variants = selectedSection ? getVariantsForSection(selectedSection.type) : [];
  if (!selectedSection) return <div className="h-full flex flex-col items-center justify-center p-8 text-center"><Settings2 className="w-12 h-12 text-muted-foreground/50 mb-4" /><h3 className="font-medium mb-2">No Section Selected</h3><p className="text-sm text-muted-foreground">Click on a section to edit</p></div>;

  const handleContentChange = (field, value) => updateSection(selectedSection.id, { content: { ...selectedSection.content, [field]: value } });
  const handleStyleChange = (field, value) => updateSectionStyles(selectedSection.id, { [field]: value });

  const renderContentFields = () => {
    const { content } = selectedSection;
    switch (selectedSection.type) {
      case 'hero': case 'cta': return (<>
        <div className="space-y-2"><Label className="text-xs text-muted-foreground">Headline</Label><Input value={content.headline || ''} onChange={(e) => handleContentChange('headline', e.target.value)} className="bg-secondary border-border" /></div>
        <div className="space-y-2"><Label className="text-xs text-muted-foreground">Subheadline</Label><Textarea value={content.subheadline || ''} onChange={(e) => handleContentChange('subheadline', e.target.value)} className="bg-secondary border-border resize-none" rows={3} /></div>
        <div className="space-y-2"><Label className="text-xs text-muted-foreground">Primary Button</Label><Input value={content.ctaText || ''} onChange={(e) => handleContentChange('ctaText', e.target.value)} className="bg-secondary border-border" /></div>
        <div className="space-y-2"><Label className="text-xs text-muted-foreground">Image URL</Label><Input value={content.imageUrl || ''} onChange={(e) => handleContentChange('imageUrl', e.target.value)} className="bg-secondary border-border" placeholder="https://..." /></div>
        <div className="space-y-2"><Label className="text-xs text-muted-foreground">Video URL (YouTube embed link)</Label><Input value={content.videoUrl || ''} onChange={(e) => handleContentChange('videoUrl', e.target.value)} className="bg-secondary border-border" placeholder="https://www.youtube.com/embed/..." /></div>
      </>);

      case 'features': return (
        <div className="space-y-4">
          <div className="space-y-2"><Label className="text-xs text-muted-foreground">Headline</Label><Input value={content.headline || ''} onChange={(e) => handleContentChange('headline', e.target.value)} className="bg-secondary border-border" /></div>
          <div className="space-y-2"><Label className="text-xs text-muted-foreground">Subheadline</Label><Textarea value={content.subheadline || ''} onChange={(e) => handleContentChange('subheadline', e.target.value)} className="bg-secondary border-border resize-none" rows={2} /></div>

          <div>
            <Label className="text-xs text-muted-foreground">Features</Label>
            <div className="space-y-2 mt-2">
              {(content.features || []).map((f, idx) => (
                <div key={f.id} className="p-3 bg-secondary rounded-md border border-border">
                  <div className="flex gap-2">
                    <Input value={f.icon || ''} onChange={(e) => {
                      const updated = (content.features || []).map((x) => x.id === f.id ? { ...x, icon: e.target.value } : x);
                      handleContentChange('features', updated);
                    }} className="flex-1" placeholder="Icon name (e.g., Layers)" />
                    <Input value={f.title || ''} onChange={(e) => {
                      const updated = (content.features || []).map((x) => x.id === f.id ? { ...x, title: e.target.value } : x);
                      handleContentChange('features', updated);
                    }} className="flex-2" placeholder="Title" />
                    <button className="ml-2 text-red-500" onClick={() => {
                      const updated = (content.features || []).filter(x => x.id !== f.id);
                      handleContentChange('features', updated);
                    }}>Remove</button>
                  </div>
                  <Textarea value={f.description || ''} onChange={(e) => {
                    const updated = (content.features || []).map((x) => x.id === f.id ? { ...x, description: e.target.value } : x);
                    handleContentChange('features', updated);
                  }} rows={2} className="mt-2" />
                </div>
              ))}

              <button className="mt-2 px-3 py-2 rounded bg-primary text-white" onClick={() => {
                const newFeature = { id: (Math.random()+1).toString(36).substring(7), icon: 'Layers', title: 'New Feature', description: 'Describe this feature.' };
                const updated = [...(content.features || []), newFeature];
                handleContentChange('features', updated);
              }}>Add Feature</button>
            </div>
          </div>
        </div>
      );

      case 'services': return (
        <div className="space-y-4">
          <div className="space-y-2"><Label className="text-xs text-muted-foreground">Headline</Label><Input value={content.headline || ''} onChange={(e) => handleContentChange('headline', e.target.value)} className="bg-secondary border-border" /></div>
          <div className="space-y-2"><Label className="text-xs text-muted-foreground">Subheadline</Label><Textarea value={content.subheadline || ''} onChange={(e) => handleContentChange('subheadline', e.target.value)} className="bg-secondary border-border resize-none" rows={2} /></div>

          <div>
            <Label className="text-xs text-muted-foreground">Services</Label>
            <div className="space-y-2 mt-2">
              {(content.services || []).map((s) => (
                <div key={s.id} className="p-3 bg-secondary rounded-md border border-border">
                  <div className="flex gap-2 items-center">
                    <Input value={s.imageUrl || ''} onChange={(e) => {
                      const updated = (content.services || []).map((x) => x.id === s.id ? { ...x, imageUrl: e.target.value } : x);
                      handleContentChange('services', updated);
                    }} className="w-36" placeholder="Image URL" />
                    <Input value={s.title || ''} onChange={(e) => {
                      const updated = (content.services || []).map((x) => x.id === s.id ? { ...x, title: e.target.value } : x);
                      handleContentChange('services', updated);
                    }} className="flex-1" placeholder="Title" />
                    <button className="ml-2 text-red-500" onClick={() => {
                      const updated = (content.services || []).filter(x => x.id !== s.id);
                      handleContentChange('services', updated);
                    }}>Remove</button>
                  </div>
                  <Textarea value={s.description || ''} onChange={(e) => {
                    const updated = (content.services || []).map((x) => x.id === s.id ? { ...x, description: e.target.value } : x);
                    handleContentChange('services', updated);
                  }} rows={2} className="mt-2" />
                </div>
              ))}

              <button className="mt-2 px-3 py-2 rounded bg-primary text-white" onClick={() => {
                const newService = { id: (Math.random()+1).toString(36).substring(7), imageUrl: '', title: 'New Service', description: 'Service description', link: '#' };
                const updated = [...(content.services || []), newService];
                handleContentChange('services', updated);
              }}>Add Service</button>
            </div>
          </div>
        </div>
      );

      case 'gallery': return (
        <div className="space-y-4">
          <div className="space-y-2"><Label className="text-xs text-muted-foreground">Headline</Label><Input value={content.headline || ''} onChange={(e) => handleContentChange('headline', e.target.value)} className="bg-secondary border-border" /></div>
          <div>
            <Label className="text-xs text-muted-foreground">Images</Label>
            <div className="space-y-2 mt-2">
              {(content.images || []).map((img) => (
                <div key={img.id} className="p-3 bg-secondary rounded-md border border-border flex items-start gap-2">
                  <Input value={img.url || ''} onChange={(e) => {
                    const updated = (content.images || []).map((x) => x.id === img.id ? { ...x, url: e.target.value } : x);
                    handleContentChange('images', updated);
                  }} className="flex-1" placeholder="Image URL" />
                  <Input value={img.title || ''} onChange={(e) => {
                    const updated = (content.images || []).map((x) => x.id === img.id ? { ...x, title: e.target.value } : x);
                    handleContentChange('images', updated);
                  }} className="w-44" placeholder="Title" />
                  <button className="ml-2 text-red-500" onClick={() => {
                    const updated = (content.images || []).filter(x => x.id !== img.id);
                    handleContentChange('images', updated);
                  }}>Remove</button>
                </div>
              ))}

              <button className="mt-2 px-3 py-2 rounded bg-primary text-white" onClick={() => {
                const newImage = { id: (Math.random()+1).toString(36).substring(7), url: '', title: '' };
                const updated = [...(content.images || []), newImage];
                handleContentChange('images', updated);
              }}>Add Image</button>
            </div>
          </div>
        </div>
      );

      case 'contact': return (
        <div className="space-y-4">
          <div className="space-y-2"><Label className="text-xs text-muted-foreground">Headline</Label><Input value={content.headline || ''} onChange={(e) => handleContentChange('headline', e.target.value)} className="bg-secondary border-border" /></div>
          <div className="space-y-2"><Label className="text-xs text-muted-foreground">Subheadline</Label><Textarea value={content.subheadline || ''} onChange={(e) => handleContentChange('subheadline', e.target.value)} className="bg-secondary border-border resize-none" rows={2} /></div>
          <div className="space-y-2"><Label className="text-xs text-muted-foreground">Email</Label><Input value={content.email || ''} onChange={(e) => handleContentChange('email', e.target.value)} className="bg-secondary border-border" /></div>
          <div className="space-y-2"><Label className="text-xs text-muted-foreground">Phone</Label><Input value={content.phone || ''} onChange={(e) => handleContentChange('phone', e.target.value)} className="bg-secondary border-border" /></div>
          <div className="space-y-2"><Label className="text-xs text-muted-foreground">Address</Label><Input value={content.address || ''} onChange={(e) => handleContentChange('address', e.target.value)} className="bg-secondary border-border" /></div>
          <div className="space-y-2"><Label className="text-xs text-muted-foreground">Map Embed URL</Label><Input value={content.mapEmbed || ''} onChange={(e) => handleContentChange('mapEmbed', e.target.value)} className="bg-secondary border-border" placeholder="https://www.google.com/maps/embed?..." /></div>
        </div>
      );

      case 'team': return (
        <div className="space-y-4">
          <div className="space-y-2"><Label className="text-xs text-muted-foreground">Headline</Label><Input value={content.headline || ''} onChange={(e) => handleContentChange('headline', e.target.value)} className="bg-secondary border-border" /></div>
          <div>
            <Label className="text-xs text-muted-foreground">Members</Label>
            <div className="space-y-2 mt-2">
              {(content.members || []).map((m) => (
                <div key={m.id} className="p-3 bg-secondary rounded-md border border-border flex items-start gap-2">
                  <Input value={m.avatar || ''} onChange={(e) => {
                    const updated = (content.members || []).map((x) => x.id === m.id ? { ...x, avatar: e.target.value } : x);
                    handleContentChange('members', updated);
                  }} className="w-44" placeholder="Avatar URL" />
                  <div className="flex-1">
                    <Input value={m.name || ''} onChange={(e) => {
                      const updated = (content.members || []).map((x) => x.id === m.id ? { ...x, name: e.target.value } : x);
                      handleContentChange('members', updated);
                    }} placeholder="Name" />
                    <Input value={m.role || ''} onChange={(e) => {
                      const updated = (content.members || []).map((x) => x.id === m.id ? { ...x, role: e.target.value } : x);
                      handleContentChange('members', updated);
                    }} placeholder="Role" className="mt-1" />
                  </div>
                  <button className="ml-2 text-red-500" onClick={() => {
                    const updated = (content.members || []).filter(x => x.id !== m.id);
                    handleContentChange('members', updated);
                  }}>Remove</button>
                </div>
              ))}

              <button className="mt-2 px-3 py-2 rounded bg-primary text-white" onClick={() => {
                const newMember = { id: (Math.random()+1).toString(36).substring(7), name: 'New Member', role: '', avatar: '' };
                const updated = [...(content.members || []), newMember];
                handleContentChange('members', updated);
              }}>Add Member</button>
            </div>
          </div>
        </div>
      );

      case 'pricing': return (
        <div className="space-y-4">
          <div className="space-y-2"><Label className="text-xs text-muted-foreground">Headline</Label><Input value={content.headline || ''} onChange={(e) => handleContentChange('headline', e.target.value)} className="bg-secondary border-border" /></div>
          <div>
            <Label className="text-xs text-muted-foreground">Plans</Label>
            <div className="space-y-2 mt-2">
              {(content.plans || []).map((p) => (
                <div key={p.id} className="p-3 bg-secondary rounded-md border border-border">
                  <div className="flex gap-2 items-center">
                    <Input value={p.name || ''} onChange={(e) => {
                      const updated = (content.plans || []).map((x) => x.id === p.id ? { ...x, name: e.target.value } : x);
                      handleContentChange('plans', updated);
                    }} className="flex-1" placeholder="Plan name" />
                    <Input value={p.price || ''} onChange={(e) => {
                      const updated = (content.plans || []).map((x) => x.id === p.id ? { ...x, price: e.target.value } : x);
                      handleContentChange('plans', updated);
                    }} className="w-28" placeholder="Price" />
                    <button className="ml-2 text-red-500" onClick={() => {
                      const updated = (content.plans || []).filter(x => x.id !== p.id);
                      handleContentChange('plans', updated);
                    }}>Remove</button>
                  </div>
                  <Textarea value={(p.features || []).join(', ')} onChange={(e) => {
                    const updated = (content.plans || []).map((x) => x.id === p.id ? { ...x, features: e.target.value.split(',').map(s => s.trim()) } : x);
                    handleContentChange('plans', updated);
                  }} rows={2} className="mt-2" />
                </div>
              ))}

              <button className="mt-2 px-3 py-2 rounded bg-primary text-white" onClick={() => {
                const newPlan = { id: (Math.random()+1).toString(36).substring(7), name: 'New Plan', price: '', features: [], ctaText: 'Get Started' };
                const updated = [...(content.plans || []), newPlan];
                handleContentChange('plans', updated);
              }}>Add Plan</button>
            </div>
          </div>
        </div>
      );

      default: return <p className="text-sm text-muted-foreground">Edit content in the canvas</p>;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between"><div><h2 className="font-semibold">{selectedSection.name}</h2><p className="text-xs text-muted-foreground capitalize">{selectedSection.type} section</p></div><button onClick={() => selectSection(null)} className="p-2 rounded-lg hover:bg-secondary transition-colors"><X className="w-4 h-4" /></button></div>
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {variants.length > 0 && <Collapsible open={layoutOpen} onOpenChange={setLayoutOpen} className="border-b border-border"><CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-secondary/50"><div className="flex items-center gap-2"><Layout className="w-4 h-4 text-emerald-500" /><span className="text-sm font-medium">Layout Variant</span></div><ChevronDown className={`w-4 h-4 transition-transform ${layoutOpen ? 'rotate-180' : ''}`} /></CollapsibleTrigger><CollapsibleContent className="p-4 pt-0 space-y-4"><Select value={selectedSection.variant || variants[0]?.id} onValueChange={(value) => updateSection(selectedSection.id, { variant: value })}><SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Select variant" /></SelectTrigger><SelectContent>{variants.map((variant) => <SelectItem key={variant.id} value={variant.id}>{variant.name}</SelectItem>)}</SelectContent></Select></CollapsibleContent></Collapsible>}
        <Collapsible open={contentOpen} onOpenChange={setContentOpen} className="border-b border-border"><CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-secondary/50"><div className="flex items-center gap-2"><Type className="w-4 h-4 text-primary" /><span className="text-sm font-medium">Content</span></div><ChevronDown className={`w-4 h-4 transition-transform ${contentOpen ? 'rotate-180' : ''}`} /></CollapsibleTrigger><CollapsibleContent className="p-4 pt-0 space-y-4">{renderContentFields()}</CollapsibleContent></Collapsible>
        <Collapsible open={stylesOpen} onOpenChange={setStylesOpen} className="border-b border-border"><CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-secondary/50"><div className="flex items-center gap-2"><Palette className="w-4 h-4 text-accent" /><span className="text-sm font-medium">Styles</span></div><ChevronDown className={`w-4 h-4 transition-transform ${stylesOpen ? 'rotate-180' : ''}`} /></CollapsibleTrigger><CollapsibleContent className="p-4 pt-0 space-y-4"><div className="space-y-2"><Label className="text-xs text-muted-foreground">Background Color</Label><div className="flex gap-2"><input type="color" value={selectedSection.styles.backgroundColor || '#ffffff'} onChange={(e) => handleStyleChange('backgroundColor', e.target.value)} className="w-10 h-10 rounded-lg border border-border cursor-pointer" /><Input value={selectedSection.styles.backgroundColor || ''} onChange={(e) => handleStyleChange('backgroundColor', e.target.value)} className="bg-secondary border-border flex-1" placeholder="#ffffff" /></div></div>

          <div className="flex items-center justify-between">
            <Label className="text-sm">Use Gradient</Label>
            <Switch checked={!!selectedSection.styles.useGradient} onCheckedChange={(checked) => handleStyleChange('useGradient', checked)} />
          </div>

          {selectedSection.styles.useGradient && (
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Background Gradient</Label>
              <Input value={selectedSection.styles.backgroundGradient || ''} onChange={(e) => handleStyleChange('backgroundGradient', e.target.value)} className="bg-secondary border-border" placeholder="linear-gradient(...)" />
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Padding</Label>
            <Input value={selectedSection.styles.padding || ''} onChange={(e) => handleStyleChange('padding', e.target.value)} className="bg-secondary border-border" placeholder="e.g., 120px 0" />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Min Height</Label>
            <Input value={selectedSection.styles.minHeight || ''} onChange={(e) => handleStyleChange('minHeight', e.target.value)} className="bg-secondary border-border" placeholder="e.g., 80vh" />
          </div>

          <div className="flex items-center justify-between"><Label className="text-sm">Visible</Label><Switch checked={selectedSection.visible} onCheckedChange={(checked) => updateSection(selectedSection.id, { visible: checked })} /></div></CollapsibleContent></Collapsible>
      </div>
      <div className="p-4 border-t border-border"><div className="space-y-2"><Label className="text-xs text-muted-foreground">Section Name</Label><Input value={selectedSection.name} onChange={(e) => updateSection(selectedSection.id, { name: e.target.value })} className="bg-secondary border-border" /></div></div>
    </div>
  );
}
