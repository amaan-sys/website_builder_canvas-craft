import React, { useState } from 'react';
import { BuilderProvider } from '@/contexts/BuilderContext';
import { EditorToolbar } from './EditorToolbar';
import { SectionsList } from './SectionsList';
import { CanvasPreview } from './CanvasPreview';
import { PropertiesPanel } from './PropertiesPanel';
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from '@/components/ui/resizable';
import { useBuilder } from '@/contexts/BuilderContext';

function EditorContent() {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const { state } = useBuilder();
  const { editor } = state;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Toolbar */}
      <EditorToolbar 
        viewport={viewport} 
        onViewportChange={setViewport} 
      />

      {/* Main Editor Area */}
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Sections List */}
          {!editor.previewMode && (
            <>
              <ResizablePanel 
                defaultSize={20} 
                minSize={15} 
                maxSize={30}
                className="bg-sidebar border-r border-sidebar-border"
              >
                <SectionsList />
              </ResizablePanel>
              <ResizableHandle className="w-1 bg-border hover:bg-primary/50 transition-colors" />
            </>
          )}

          {/* Center - Canvas */}
          <ResizablePanel defaultSize={editor.previewMode ? 100 : 55}>
            <CanvasPreview viewport={viewport} />
          </ResizablePanel>

          {/* Right Panel - Properties */}
          {!editor.previewMode && (
            <>
              <ResizableHandle className="w-1 bg-border hover:bg-primary/50 transition-colors" />
              <ResizablePanel 
                defaultSize={25} 
                minSize={20} 
                maxSize={35}
                className="bg-sidebar border-l border-sidebar-border"
              >
                <PropertiesPanel />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export function WebsiteEditor() {
  return (
    <BuilderProvider>
      <EditorContent />
    </BuilderProvider>
  );
}
