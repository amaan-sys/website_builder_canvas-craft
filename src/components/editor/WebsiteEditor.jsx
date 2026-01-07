import React, { useEffect, useState } from 'react';
import { BuilderProvider, useBuilder } from '@/contexts/BuilderContext';
import { EditorToolbar } from './EditorToolbar';
import { SectionsList } from './SectionsList';
import { CanvasPreview } from './CanvasPreview';
import { PropertiesPanel } from './PropertiesPanel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

function EditorContent() {
  const [viewport, setViewport] = useState('desktop');
  const [theme, setTheme] = useState('light');
  const { state } = useBuilder();
  const { editor } = state;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <EditorToolbar viewport={viewport} onViewportChange={setViewport} theme={theme} onToggleTheme={toggleTheme} />
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {!editor.previewMode && editor.showLeftPanel && (<><ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-sidebar border-r border-sidebar-border"><SectionsList /></ResizablePanel><ResizableHandle className="w-1 bg-border hover:bg-primary/50 transition-colors" /></>)}
          <ResizablePanel defaultSize={editor.previewMode ? 100 : 55}><CanvasPreview viewport={viewport} /></ResizablePanel>
          {!editor.previewMode && editor.showRightPanel && (<><ResizableHandle className="w-1 bg-border hover:bg-primary/50 transition-colors" /><ResizablePanel defaultSize={25} minSize={20} maxSize={35} className="bg-sidebar border-l border-sidebar-border"><PropertiesPanel /></ResizablePanel></>)}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export function WebsiteEditor({ initialPage }) {
  return <BuilderProvider initialPage={initialPage}><EditorContent /></BuilderProvider>;
}
