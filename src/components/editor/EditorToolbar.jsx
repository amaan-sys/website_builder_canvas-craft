import React from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { Undo2, Redo2, Eye, Download, Play, Layout, Sidebar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function EditorToolbar() {
  const { state, undo, redo, canUndo, canRedo, setPreviewMode, setLeftPanelVisible, setRightPanelVisible } = useBuilder();
  const { editor, page } = state;

  const handleExport = () => {
    const json = JSON.stringify(page, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${page.slug === '/' ? 'home' : page.slug}-page.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-14 px-4 border-b border-border bg-builder-toolbar flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">WB</span>
          </div>
          <span className="font-semibold text-lg hidden sm:inline">
            Website Builder
          </span>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="hidden md:block">
          <p className="text-sm font-medium">{page.name}</p>
          <p className="text-xs text-muted-foreground">{page.slug}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">

        {/* UNDO / REDO */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={undo}
                disabled={!canUndo}
                className="w-8 h-8"
              >
                <Undo2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={redo}
                disabled={!canRedo}
                className="w-8 h-8"
              >
                <Redo2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* TOGGLE LEFT PANEL */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLeftPanelVisible(!editor.showLeftPanel)}
              className={!editor.showLeftPanel ? 'bg-primary/20 text-primary' : ''}
            >
              <Layout className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toggle Sections Panel</TooltipContent>
        </Tooltip>

        {/* TOGGLE RIGHT PANEL */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setRightPanelVisible(!editor.showRightPanel)}
              className={!editor.showRightPanel ? 'bg-primary/20 text-primary' : ''}
            >
              <Sidebar className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toggle Properties Panel</TooltipContent>
        </Tooltip>

        {/* PREVIEW */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPreviewMode(!editor.previewMode)}
              className={editor.previewMode ? 'bg-primary/20 text-primary' : ''}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Preview Mode</TooltipContent>
        </Tooltip>

        {/* EXPORT */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleExport}
            >
              <Download className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Export JSON</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="h-6" />

        {/* PUBLISH */}
        <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90">
          <Play className="w-4 h-4" />
          <span className="hidden sm:inline">Publish</span>
        </Button>
      </div>
    </div>
  );
}
