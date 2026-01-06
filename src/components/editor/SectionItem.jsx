import React from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, Copy, Trash2, Layout, Sparkles, Grid3X3, Image, MessageSquare, BarChart2, Users, HelpCircle, Building2, DollarSign, Mail, Quote } from 'lucide-react';

const sectionIcons = { hero: Sparkles, features: Grid3X3, services: Layout, cta: MessageSquare, testimonials: Quote, gallery: Image, pricing: DollarSign, contact: Mail, stats: BarChart2, team: Users, faq: HelpCircle, logocloud: Building2, custom: Layout };
const sectionColors = { hero: 'from-blue-500 to-blue-600', features: 'from-purple-500 to-purple-600', services: 'from-green-500 to-green-600', cta: 'from-amber-500 to-amber-600', testimonials: 'from-pink-500 to-pink-600', gallery: 'from-cyan-500 to-cyan-600', pricing: 'from-indigo-500 to-indigo-600', contact: 'from-rose-500 to-rose-600', stats: 'from-teal-500 to-teal-600', team: 'from-orange-500 to-orange-600', faq: 'from-violet-500 to-violet-600', logocloud: 'from-slate-500 to-slate-600', custom: 'from-gray-500 to-gray-600' };

export function SectionItem({ id, name, type, visible, isSelected, onClick }) {
  const { toggleSectionVisibility, duplicateSection, deleteSection } = useBuilder();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const Icon = sectionIcons[type] || Layout;
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${isSelected ? 'bg-primary/10 border border-primary/50 shadow-sm' : 'bg-secondary/50 border border-transparent hover:bg-white/2 hover:shadow-sm'} ${isDragging ? 'opacity-60 scale-102 shadow-lg' : ''} ${!visible ? 'opacity-50' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-muted/50">
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${sectionColors[type]} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-4 h-4 text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-muted-foreground capitalize truncate">{type}</span>
          <span className="ml-1 text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{visible ? 'visible' : 'hidden'}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={(e) => { e.stopPropagation(); toggleSectionVisibility(id); }} className="p-1.5 rounded-md hover:bg-muted/50 transition-colors" title={visible ? 'Hide section' : 'Show section'}>{visible ? <Eye className="w-4 h-4 text-muted-foreground" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}</button>
        <button onClick={(e) => { e.stopPropagation(); duplicateSection(id); }} className="p-1.5 rounded-md hover:bg-muted/50 transition-colors" title="Duplicate section"><Copy className="w-4 h-4 text-muted-foreground" /></button>
        <button onClick={(e) => { e.stopPropagation(); deleteSection(id); }} className="p-1.5 rounded-md hover:bg-destructive/20 transition-colors" title="Delete section"><Trash2 className="w-4 h-4 text-destructive" /></button>
      </div>
    </div>
  );
}
