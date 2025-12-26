import React from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { Undo2, Redo2, Eye, Monitor, Tablet, Smartphone, Download, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function EditorToolbar({ viewport, onViewportChange }) {
  const { state, undo, redo, canUndo, canRedo, setPreviewMode } = useBuilder();
  const { editor, page } = state;
  const handleExport = () => { const json = JSON.stringify(page, null, 2); const blob = new Blob([json], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${page.slug === '/' ? 'home' : page.slug}-page.json`; a.click(); URL.revokeObjectURL(url); };

  return (
    <div className="h-14 px-4 border-b border-border bg-builder-toolbar flex items-center justify-between">
      <div className="flex items-center gap-4"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center"><span className="text-white font-bold text-sm">S</span></div><span className="font-semibold text-lg hidden sm:inline">SiteBuilder</span></div><Separator orientation="vertical" className="h-6" /><div className="hidden md:block"><p className="text-sm font-medium">{page.name}</p><p className="text-xs text-muted-foreground">{page.slug}</p></div></div>
      <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary">{[{ id: 'desktop', icon: Monitor, label: 'Desktop' }, { id: 'tablet', icon: Tablet, label: 'Tablet' }, { id: 'mobile', icon: Smartphone, label: 'Mobile' }].map((v) => <Tooltip key={v.id}><TooltipTrigger asChild><button onClick={() => onViewportChange(v.id)} className={`p-2 rounded-lg transition-all ${viewport === v.id ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}><v.icon className="w-4 h-4" /></button></TooltipTrigger><TooltipContent>{v.label}</TooltipContent></Tooltip>)}</div>
      <div className="flex items-center gap-2"><div className="flex items-center gap-1"><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={undo} disabled={!canUndo} className="w-8 h-8"><Undo2 className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent>Undo</TooltipContent></Tooltip><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={redo} disabled={!canRedo} className="w-8 h-8"><Redo2 className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent>Redo</TooltipContent></Tooltip></div><Separator orientation="vertical" className="h-6" /><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={() => setPreviewMode(!editor.previewMode)} className={editor.previewMode ? 'bg-primary/20 text-primary' : ''}><Eye className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent>Preview Mode</TooltipContent></Tooltip><Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={handleExport}><Download className="w-4 h-4" /></Button></TooltipTrigger><TooltipContent>Export JSON</TooltipContent></Tooltip><Separator orientation="vertical" className="h-6" /><Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"><Play className="w-4 h-4" /><span className="hidden sm:inline">Publish</span></Button></div>
    </div>
  );
}
