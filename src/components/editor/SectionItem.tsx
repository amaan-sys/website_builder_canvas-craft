import React from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  GripVertical, 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2, 
  Settings,
  Layout,
  Sparkles,
  Grid3X3,
  Image,
  MessageSquare
} from 'lucide-react';
import { SectionType } from '@/types/builder';

interface SectionItemProps {
  id: string;
  name: string;
  type: SectionType;
  visible: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const sectionIcons: Record<SectionType, React.ElementType> = {
  hero: Sparkles,
  features: Grid3X3,
  services: Layout,
  cta: MessageSquare,
  testimonials: MessageSquare,
  gallery: Image,
  pricing: Grid3X3,
  contact: MessageSquare,
  custom: Layout,
};

const sectionColors: Record<SectionType, string> = {
  hero: 'from-blue-500 to-blue-600',
  features: 'from-purple-500 to-purple-600',
  services: 'from-green-500 to-green-600',
  cta: 'from-amber-500 to-amber-600',
  testimonials: 'from-pink-500 to-pink-600',
  gallery: 'from-cyan-500 to-cyan-600',
  pricing: 'from-indigo-500 to-indigo-600',
  contact: 'from-rose-500 to-rose-600',
  custom: 'from-gray-500 to-gray-600',
};

export function SectionItem({ id, name, type, visible, isSelected, onClick }: SectionItemProps) {
  const { toggleSectionVisibility, duplicateSection, deleteSection } = useBuilder();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = sectionIcons[type] || Layout;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer
        ${isSelected 
          ? 'bg-primary/20 border border-primary/50' 
          : 'bg-secondary/50 border border-transparent hover:bg-secondary hover:border-border'
        }
        ${isDragging ? 'opacity-50 scale-105 shadow-lg' : ''}
        ${!visible ? 'opacity-50' : ''}`}
      onClick={onClick}
    >
      {/* Drag Handle */}
      <div 
        {...attributes} 
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-muted/50"
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Section Icon */}
      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${sectionColors[type]} flex items-center justify-center`}>
        <Icon className="w-4 h-4 text-white" />
      </div>

      {/* Section Name */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-xs text-muted-foreground capitalize">{type}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); toggleSectionVisibility(id); }}
          className="p-1.5 rounded-md hover:bg-muted/50 transition-colors"
          title={visible ? 'Hide section' : 'Show section'}
        >
          {visible ? (
            <Eye className="w-4 h-4 text-muted-foreground" />
          ) : (
            <EyeOff className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); duplicateSection(id); }}
          className="p-1.5 rounded-md hover:bg-muted/50 transition-colors"
          title="Duplicate section"
        >
          <Copy className="w-4 h-4 text-muted-foreground" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); deleteSection(id); }}
          className="p-1.5 rounded-md hover:bg-destructive/20 transition-colors"
          title="Delete section"
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </button>
      </div>
    </div>
  );
}
