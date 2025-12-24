import React from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { SectionItem } from './SectionItem';
import { 
  Plus, 
  Layers, 
  Sparkles, 
  Grid3X3, 
  Layout, 
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { v4 as uuidv4 } from 'uuid';
import { 
  createDefaultHeroSection, 
  createDefaultFeaturesSection, 
  createDefaultServicesSection, 
  createDefaultCTASection 
} from '@/lib/defaultPageData';

const sectionTemplates = [
  { type: 'hero', name: 'Hero Section', icon: Sparkles, create: createDefaultHeroSection },
  { type: 'features', name: 'Features', icon: Grid3X3, create: createDefaultFeaturesSection },
  { type: 'services', name: 'Services', icon: Layout, create: createDefaultServicesSection },
  { type: 'cta', name: 'Call to Action', icon: MessageSquare, create: createDefaultCTASection },
];

export function SectionsList() {
  const { state, selectSection, reorderSections, addSection } = useBuilder();
  const { page, editor } = state;
  const [templatesOpen, setTemplatesOpen] = React.useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = page.sections.findIndex((s) => s.id === active.id);
      const newIndex = page.sections.findIndex((s) => s.id === over.id);
      const newOrder = arrayMove(page.sections.map(s => s.id), oldIndex, newIndex);
      reorderSections(newOrder);
    }
  };

  const handleAddSection = (createFn: () => any) => {
    const newSection = createFn();
    addSection(newSection);
    selectSection(newSection.id);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">Sections</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Drag to reorder • Click to edit
        </p>
      </div>

      {/* Sections List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={page.sections.map(s => s.id)} 
            strategy={verticalListSortingStrategy}
          >
            {page.sections.map((section) => (
              <SectionItem
                key={section.id}
                id={section.id}
                name={section.name}
                type={section.type}
                visible={section.visible}
                isSelected={editor.selectedSectionId === section.id}
                onClick={() => selectSection(section.id)}
              />
            ))}
          </SortableContext>
        </DndContext>

        {page.sections.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Layers className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">No sections yet</p>
            <p className="text-xs">Add a section to get started</p>
          </div>
        )}
      </div>

      {/* Add Section Templates */}
      <div className="border-t border-border">
        <Collapsible open={templatesOpen} onOpenChange={setTemplatesOpen}>
          <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Add Section</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${templatesOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-2">
              {sectionTemplates.map((template) => (
                <button
                  key={template.type}
                  onClick={() => handleAddSection(template.create)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                    <template.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-medium">{template.name}</span>
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
