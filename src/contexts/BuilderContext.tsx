import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  PageSchema, 
  BuilderSection, 
  BuilderComponent, 
  EditorState, 
  NavbarConfig, 
  FooterConfig,
  SectionStyles,
  ComponentStyles
} from '@/types/builder';
import { getDefaultPage } from '@/lib/defaultPageData';

// State
interface BuilderState {
  page: PageSchema;
  editor: EditorState;
  history: PageSchema[];
  historyIndex: number;
}

// Actions
type BuilderAction =
  | { type: 'SET_PAGE'; payload: PageSchema }
  | { type: 'SELECT_SECTION'; payload: string | null }
  | { type: 'SELECT_COMPONENT'; payload: string | null }
  | { type: 'SET_EDIT_MODE'; payload: 'content' | 'layout' }
  | { type: 'SET_PREVIEW_MODE'; payload: boolean }
  | { type: 'SET_DRAGGING'; payload: boolean }
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'TOGGLE_GRID'; payload?: boolean }
  | { type: 'ADD_SECTION'; payload: { section: BuilderSection; index?: number } }
  | { type: 'UPDATE_SECTION'; payload: { id: string; updates: Partial<BuilderSection> } }
  | { type: 'DELETE_SECTION'; payload: string }
  | { type: 'REORDER_SECTIONS'; payload: string[] }
  | { type: 'TOGGLE_SECTION_VISIBILITY'; payload: string }
  | { type: 'DUPLICATE_SECTION'; payload: string }
  | { type: 'ADD_COMPONENT'; payload: { sectionId: string; component: BuilderComponent; index?: number } }
  | { type: 'UPDATE_COMPONENT'; payload: { sectionId: string; componentId: string; updates: Partial<BuilderComponent> } }
  | { type: 'DELETE_COMPONENT'; payload: { sectionId: string; componentId: string } }
  | { type: 'REORDER_COMPONENTS'; payload: { sectionId: string; componentIds: string[] } }
  | { type: 'UPDATE_NAVBAR'; payload: Partial<NavbarConfig> }
  | { type: 'UPDATE_FOOTER'; payload: Partial<FooterConfig> }
  | { type: 'UPDATE_SECTION_STYLES'; payload: { id: string; styles: Partial<SectionStyles> } }
  | { type: 'UPDATE_COMPONENT_STYLES'; payload: { sectionId: string; componentId: string; styles: Partial<ComponentStyles> } }
  | { type: 'UNDO' }
  | { type: 'REDO' };

// Reducer
function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  const saveToHistory = (newPage: PageSchema): BuilderState => ({
    ...state,
    page: newPage,
    history: [...state.history.slice(0, state.historyIndex + 1), newPage],
    historyIndex: state.historyIndex + 1,
  });

  switch (action.type) {
    case 'SET_PAGE':
      return saveToHistory(action.payload);

    case 'SELECT_SECTION':
      return {
        ...state,
        editor: { ...state.editor, selectedSectionId: action.payload, selectedComponentId: null },
      };

    case 'SELECT_COMPONENT':
      return {
        ...state,
        editor: { ...state.editor, selectedComponentId: action.payload },
      };

    case 'SET_EDIT_MODE':
      return {
        ...state,
        editor: { ...state.editor, editMode: action.payload },
      };

    case 'SET_PREVIEW_MODE':
      return {
        ...state,
        editor: { 
          ...state.editor, 
          previewMode: action.payload,
          selectedSectionId: null,
          selectedComponentId: null,
        },
      };

    case 'SET_DRAGGING':
      return {
        ...state,
        editor: { ...state.editor, isDragging: action.payload },
      };

    case 'SET_ZOOM':
      return {
        ...state,
        editor: { ...state.editor, zoom: action.payload },
      };

    case 'TOGGLE_GRID':
      return {
        ...state,
        editor: { ...state.editor, showGrid: action.payload ?? !state.editor.showGrid },
      };

    case 'ADD_SECTION': {
      const newSections = [...state.page.sections];
      const index = action.payload.index ?? newSections.length;
      newSections.splice(index, 0, action.payload.section);
      return saveToHistory({ ...state.page, sections: newSections });
    }

    case 'UPDATE_SECTION': {
      const newSections = state.page.sections.map((s) =>
        s.id === action.payload.id ? { ...s, ...action.payload.updates } : s
      );
      return saveToHistory({ ...state.page, sections: newSections });
    }

    case 'DELETE_SECTION': {
      const newSections = state.page.sections.filter((s) => s.id !== action.payload);
      return saveToHistory({ ...state.page, sections: newSections });
    }

    case 'REORDER_SECTIONS': {
      const sectionMap = new Map(state.page.sections.map((s) => [s.id, s]));
      const newSections = action.payload.map((id) => sectionMap.get(id)!).filter(Boolean);
      return saveToHistory({ ...state.page, sections: newSections });
    }

    case 'TOGGLE_SECTION_VISIBILITY': {
      const newSections = state.page.sections.map((s) =>
        s.id === action.payload ? { ...s, visible: !s.visible } : s
      );
      return saveToHistory({ ...state.page, sections: newSections });
    }

    case 'DUPLICATE_SECTION': {
      const sectionIndex = state.page.sections.findIndex((s) => s.id === action.payload);
      if (sectionIndex === -1) return state;
      const original = state.page.sections[sectionIndex];
      const duplicate: BuilderSection = {
        ...original,
        id: uuidv4(),
        name: `${original.name} (Copy)`,
        components: original.components.map((c) => ({ ...c, id: uuidv4() })),
      };
      const newSections = [...state.page.sections];
      newSections.splice(sectionIndex + 1, 0, duplicate);
      return saveToHistory({ ...state.page, sections: newSections });
    }

    case 'ADD_COMPONENT': {
      const newSections = state.page.sections.map((s) => {
        if (s.id !== action.payload.sectionId) return s;
        const newComponents = [...s.components];
        const index = action.payload.index ?? newComponents.length;
        newComponents.splice(index, 0, action.payload.component);
        return { ...s, components: newComponents };
      });
      return saveToHistory({ ...state.page, sections: newSections });
    }

    case 'UPDATE_COMPONENT': {
      const newSections = state.page.sections.map((s) => {
        if (s.id !== action.payload.sectionId) return s;
        const newComponents = s.components.map((c) =>
          c.id === action.payload.componentId ? { ...c, ...action.payload.updates } : c
        );
        return { ...s, components: newComponents };
      });
      return saveToHistory({ ...state.page, sections: newSections });
    }

    case 'DELETE_COMPONENT': {
      const newSections = state.page.sections.map((s) => {
        if (s.id !== action.payload.sectionId) return s;
        return { ...s, components: s.components.filter((c) => c.id !== action.payload.componentId) };
      });
      return saveToHistory({ ...state.page, sections: newSections });
    }

    case 'REORDER_COMPONENTS': {
      const newSections = state.page.sections.map((s) => {
        if (s.id !== action.payload.sectionId) return s;
        const componentMap = new Map(s.components.map((c) => [c.id, c]));
        const newComponents = action.payload.componentIds.map((id) => componentMap.get(id)!).filter(Boolean);
        return { ...s, components: newComponents };
      });
      return saveToHistory({ ...state.page, sections: newSections });
    }

    case 'UPDATE_NAVBAR':
      return saveToHistory({
        ...state.page,
        navbar: { ...state.page.navbar, ...action.payload },
      });

    case 'UPDATE_FOOTER':
      return saveToHistory({
        ...state.page,
        footer: { ...state.page.footer, ...action.payload },
      });

    case 'UPDATE_SECTION_STYLES': {
      const newSections = state.page.sections.map((s) =>
        s.id === action.payload.id
          ? { ...s, styles: { ...s.styles, ...action.payload.styles } }
          : s
      );
      return saveToHistory({ ...state.page, sections: newSections });
    }

    case 'UPDATE_COMPONENT_STYLES': {
      const newSections = state.page.sections.map((s) => {
        if (s.id !== action.payload.sectionId) return s;
        const newComponents = s.components.map((c) =>
          c.id === action.payload.componentId
            ? { ...c, styles: { ...c.styles, ...action.payload.styles } }
            : c
        );
        return { ...s, components: newComponents };
      });
      return saveToHistory({ ...state.page, sections: newSections });
    }

    case 'UNDO':
      if (state.historyIndex <= 0) return state;
      return {
        ...state,
        page: state.history[state.historyIndex - 1],
        historyIndex: state.historyIndex - 1,
      };

    case 'REDO':
      if (state.historyIndex >= state.history.length - 1) return state;
      return {
        ...state,
        page: state.history[state.historyIndex + 1],
        historyIndex: state.historyIndex + 1,
      };

    default:
      return state;
  }
}

// Context
interface BuilderContextType {
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
  // Convenience methods
  selectSection: (id: string | null) => void;
  selectComponent: (id: string | null) => void;
  addSection: (section: BuilderSection, index?: number) => void;
  updateSection: (id: string, updates: Partial<BuilderSection>) => void;
  deleteSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  reorderSections: (ids: string[]) => void;
  toggleSectionVisibility: (id: string) => void;
  updateSectionContent: (id: string, content: Record<string, any>) => void;
  updateSectionStyles: (id: string, styles: Partial<SectionStyles>) => void;
  addComponent: (sectionId: string, component: BuilderComponent, index?: number) => void;
  updateComponent: (sectionId: string, componentId: string, updates: Partial<BuilderComponent>) => void;
  deleteComponent: (sectionId: string, componentId: string) => void;
  updateNavbar: (updates: Partial<NavbarConfig>) => void;
  updateFooter: (updates: Partial<FooterConfig>) => void;
  setEditMode: (mode: 'content' | 'layout') => void;
  setPreviewMode: (enabled: boolean) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  selectedSection: BuilderSection | null;
  selectedComponent: BuilderComponent | null;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

// Provider
interface BuilderProviderProps {
  children: ReactNode;
  initialPage?: PageSchema;
}

export function BuilderProvider({ children, initialPage }: BuilderProviderProps) {
  const defaultPage = initialPage ?? getDefaultPage();
  
  const initialState: BuilderState = {
    page: defaultPage,
    editor: {
      selectedSectionId: null,
      selectedComponentId: null,
      editMode: 'content',
      isDragging: false,
      zoom: 100,
      showGrid: false,
      previewMode: false,
    },
    history: [defaultPage],
    historyIndex: 0,
  };

  const [state, dispatch] = useReducer(builderReducer, initialState);

  // Convenience methods
  const selectSection = useCallback((id: string | null) => {
    dispatch({ type: 'SELECT_SECTION', payload: id });
  }, []);

  const selectComponent = useCallback((id: string | null) => {
    dispatch({ type: 'SELECT_COMPONENT', payload: id });
  }, []);

  const addSection = useCallback((section: BuilderSection, index?: number) => {
    dispatch({ type: 'ADD_SECTION', payload: { section, index } });
  }, []);

  const updateSection = useCallback((id: string, updates: Partial<BuilderSection>) => {
    dispatch({ type: 'UPDATE_SECTION', payload: { id, updates } });
  }, []);

  const deleteSection = useCallback((id: string) => {
    dispatch({ type: 'DELETE_SECTION', payload: id });
  }, []);

  const duplicateSection = useCallback((id: string) => {
    dispatch({ type: 'DUPLICATE_SECTION', payload: id });
  }, []);

  const reorderSections = useCallback((ids: string[]) => {
    dispatch({ type: 'REORDER_SECTIONS', payload: ids });
  }, []);

  const toggleSectionVisibility = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_SECTION_VISIBILITY', payload: id });
  }, []);

  const updateSectionContent = useCallback((id: string, content: Record<string, any>) => {
    dispatch({ type: 'UPDATE_SECTION', payload: { id, updates: { content } } });
  }, []);

  const updateSectionStyles = useCallback((id: string, styles: Partial<SectionStyles>) => {
    dispatch({ type: 'UPDATE_SECTION_STYLES', payload: { id, styles } });
  }, []);

  const addComponent = useCallback((sectionId: string, component: BuilderComponent, index?: number) => {
    dispatch({ type: 'ADD_COMPONENT', payload: { sectionId, component, index } });
  }, []);

  const updateComponent = useCallback((sectionId: string, componentId: string, updates: Partial<BuilderComponent>) => {
    dispatch({ type: 'UPDATE_COMPONENT', payload: { sectionId, componentId, updates } });
  }, []);

  const deleteComponent = useCallback((sectionId: string, componentId: string) => {
    dispatch({ type: 'DELETE_COMPONENT', payload: { sectionId, componentId } });
  }, []);

  const updateNavbar = useCallback((updates: Partial<NavbarConfig>) => {
    dispatch({ type: 'UPDATE_NAVBAR', payload: updates });
  }, []);

  const updateFooter = useCallback((updates: Partial<FooterConfig>) => {
    dispatch({ type: 'UPDATE_FOOTER', payload: updates });
  }, []);

  const setEditMode = useCallback((mode: 'content' | 'layout') => {
    dispatch({ type: 'SET_EDIT_MODE', payload: mode });
  }, []);

  const setPreviewMode = useCallback((enabled: boolean) => {
    dispatch({ type: 'SET_PREVIEW_MODE', payload: enabled });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  const selectedSection = state.editor.selectedSectionId
    ? state.page.sections.find((s) => s.id === state.editor.selectedSectionId) ?? null
    : null;

  const selectedComponent = state.editor.selectedComponentId && selectedSection
    ? selectedSection.components.find((c) => c.id === state.editor.selectedComponentId) ?? null
    : null;

  const value: BuilderContextType = {
    state,
    dispatch,
    selectSection,
    selectComponent,
    addSection,
    updateSection,
    deleteSection,
    duplicateSection,
    reorderSections,
    toggleSectionVisibility,
    updateSectionContent,
    updateSectionStyles,
    addComponent,
    updateComponent,
    deleteComponent,
    updateNavbar,
    updateFooter,
    setEditMode,
    setPreviewMode,
    undo,
    redo,
    canUndo: state.historyIndex > 0,
    canRedo: state.historyIndex < state.history.length - 1,
    selectedSection,
    selectedComponent,
  };

  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>;
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
}
