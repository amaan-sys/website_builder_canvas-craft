import React from "react";
import { useBuilder } from "@/contexts/BuilderContext";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SectionItem } from "./SectionItem";
import {
  Plus,
  Layers,
  Sparkles,
  Grid3X3,
  Layout,
  MessageSquare,
  ChevronDown,
  Quote,
  DollarSign,
  Image,
  Mail,
  BarChart2,
  Users,
  HelpCircle,
  Building2,
  FileText,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  createDefaultHeroSection,
  createDefaultFeaturesSection,
  createDefaultServicesSection,
  createDefaultCTASection,
  createDefaultTestimonialsSection,
  createDefaultPricingSection,
  createDefaultGallerySection,
  createDefaultContactSection,
  createDefaultStatsSection,
  createDefaultTeamSection,
  createDefaultFAQSection,
  createDefaultLogoCloudSection,
  createDefaultBlogListSection,
  createDefaultMasonryGallerySection,
} from "@/lib/defaultPageData";

const sectionTemplates = [
  {
    type: "hero",
    name: "Hero",
    icon: Sparkles,
    create: createDefaultHeroSection,
  },
  {
    type: "features",
    name: "Features",
    icon: Grid3X3,
    create: createDefaultFeaturesSection,
  },
  {
    type: "services",
    name: "Services",
    icon: Layout,
    create: createDefaultServicesSection,
  },
  {
    type: "cta",
    name: "CTA",
    icon: MessageSquare,
    create: createDefaultCTASection,
  },
  {
    type: "testimonials",
    name: "Testimonials",
    icon: Quote,
    create: createDefaultTestimonialsSection,
  },
  {
    type: "pricing",
    name: "Pricing",
    icon: DollarSign,
    create: createDefaultPricingSection,
  },
  {
    type: "gallery",
    name: "Gallery",
    icon: Image,
    create: createDefaultGallerySection,
  },
  {
    type: "gallery-masonry",
    name: "Gallery Masonry",
    icon: Grid3X3,
    create: createDefaultMasonryGallerySection,
  },
  {
    type: "blog",
    name: "Blog List",
    icon: FileText,
    create: createDefaultBlogListSection,
  },
  {
    type: "contact",
    name: "Contact",
    icon: Mail,
    create: createDefaultContactSection,
  },
  {
    type: "stats",
    name: "Stats",
    icon: BarChart2,
    create: createDefaultStatsSection,
  },
  { type: "team", name: "Team", icon: Users, create: createDefaultTeamSection },
  {
    type: "faq",
    name: "FAQ",
    icon: HelpCircle,
    create: createDefaultFAQSection,
  },
  {
    type: "logocloud",
    name: "Logo Cloud",
    icon: Building2,
    create: createDefaultLogoCloudSection,
  },
];

export function SectionsList() {
  const { state, selectSection, reorderSections, addSection } = useBuilder();
  const { page, editor } = state;
  const [templatesOpen, setTemplatesOpen] = React.useState(true);
  const [query, setQuery] = React.useState('');
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = page.sections.findIndex((s) => s.id === active.id);
      const newIndex = page.sections.findIndex((s) => s.id === over.id);
      const newOrder = arrayMove(
        page.sections.map((s) => s.id),
        oldIndex,
        newIndex
      );
      reorderSections(newOrder);
    }
  };
  const handleAddSection = (createFn) => {
    const newSection = createFn();
    addSection(newSection);
    selectSection(newSection.id);
  };

  const filtered = page.sections.filter((s) => {
    const q = (typeof query === 'string' ? query : '').trim().toLowerCase();
    if (!q) return true;
    return s.name.toLowerCase().includes(q) || s.type.toLowerCase().includes(q);
  });

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Layers className="w-6 h-6 text-primary" />
            <div className="min-w-0">
              <h2 className="font-semibold text-sm truncate">Sections</h2>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">Drag to reorder • Click to edit</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground mr-2 hidden sm:inline">{page.sections.length} sections</div>
            <button onClick={() => setTemplatesOpen((v) => !v)} className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"><Plus className="w-4 h-4" /> Add</button>
          </div>
        </div>

        <div className="mt-3 min-w-0">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search sections" className="w-full text-sm px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 truncate" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={filtered.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            {filtered.length > 0 ? filtered.map((section) => (
              <SectionItem key={section.id} id={section.id} name={section.name} type={section.type} visible={section.visible} isSelected={editor.selectedSectionId === section.id} onClick={() => selectSection(section.id)} />
            )) : (
              <div className="text-center py-8 text-muted-foreground">
                <Layers className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">No matching sections</p>
              </div>
            )}
          </SortableContext>
        </DndContext>

        {page.sections.length === 0 && (
          <div className="text-center py-12 text-muted-foreground"><Layers className="w-12 h-12 mx-auto mb-4 opacity-50" /><p className="text-sm">No sections yet</p></div>
        )}
      </div>

      <div className="border-t border-border flex-shrink-0">
        <Collapsible open={templatesOpen} onOpenChange={setTemplatesOpen}>
          <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-secondary/50 transition-colors">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Add Section</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${templatesOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>

          <CollapsibleContent>
            <ScrollArea className="h-[320px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 pt-0">
                {sectionTemplates.map((template) => (
                  <button key={template.type} onClick={() => handleAddSection(template.create)} className="flex items-center gap-3 p-2 rounded-md border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all duration-150 group text-left">
                    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0"><template.icon className="w-5 h-5 text-white" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{template.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{template.type}</div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
