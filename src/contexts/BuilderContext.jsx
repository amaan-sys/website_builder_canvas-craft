import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getDefaultPage, createFeaturesPage, createServicesPage, createPricingPage, createContactPage, createStartPage, createTemplatesPage, createAboutPage, createBlogPage, createCareersPage, createHelpPage, createStatusPage } from '@/lib/defaultPageData';




// Reducer
function builderReducer(state, action) {
  const saveToHistory = (newPage) => ({
    ...state,
    page: newPage,
    pages: state.pages.map((p) => (p.id === newPage.id ? newPage : p)),
    history: [...state.history.slice(0, state.historyIndex + 1), newPage],
    historyIndex: state.historyIndex + 1,
  });

  switch (action.type) {
    case 'SET_PAGE':
      return saveToHistory(action.payload);

    case 'SET_ACTIVE_PAGE': {
      const target = state.pages.find(p => p.id === action.payload);
      if (!target) return state;
      return {
        ...state,
        page: target,
        history: [target],
        historyIndex: 0,
      };
    }

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

    case 'UPDATE_PAGE': {
      const { slug, updates } = action.payload;
      const newPages = state.pages.map((p) => (p.slug === slug ? { ...p, ...updates } : p));
      const newPage = state.page.slug === slug ? { ...state.page, ...updates } : state.page;
      return { ...state, pages: newPages, page: newPage };
    }

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
      const newSections = action.payload.map((id) => sectionMap.get(id)).filter(Boolean);
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
      const duplicate = {
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
        const newComponents = action.payload.componentIds.map((id) => componentMap.get(id)).filter(Boolean);
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

    case 'UPDATE_NAV_LABEL': {
      const { href, label } = action.payload;
      const updateNavForPage = (p) => ({
        ...p,
        navbar: p.navbar
          ? { ...p.navbar, links: p.navbar.links.map((l) => (l.href === href ? { ...l, label } : l)) }
          : p.navbar,
        footer: p.footer
          ? { ...p.footer, columns: p.footer.columns.map((col) => ({
              ...col,
              links: col.links.map((l) => (l.href === href ? { ...l, label } : l)),
            })) }
          : p.footer,
      });

      const newPages = state.pages.map((p) => updateNavForPage(p));
      const newPage = updateNavForPage(state.page);
      return { ...state, pages: newPages, page: newPage };
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

    case 'ADD_PAGE': {
      const { page } = action.payload;
      // avoid duplicate slugs
      if (state.pages.some((p) => p.slug === page.slug)) {
        return state;
      }
      return {
        ...state,
        pages: [...state.pages, page],
      };
    }

    default:
      return state;
  }
}

// Context
const BuilderContext = createContext(undefined);

// Provider
export function BuilderProvider({ children, initialPage }) {
  const homePage = getDefaultPage();
  const featuresPage = createFeaturesPage();
  const servicesPage = createServicesPage();
  const pricingPage = createPricingPage();
  const contactPage = createContactPage();
  const startPage = createStartPage();
  const templatesPage = createTemplatesPage();
  const aboutPage = createAboutPage();
  const blogPage = createBlogPage();
  const careersPage = createCareersPage();
  const helpPage = createHelpPage();
  const statusPage = createStatusPage();

  const initial = initialPage ?? homePage;

  const pagesList = initialPage
    ? [initial, homePage, featuresPage, servicesPage, pricingPage, contactPage, startPage, templatesPage, aboutPage, blogPage, careersPage, helpPage, statusPage].filter((p, idx, arr) => arr.findIndex(x => x.slug === p.slug) === idx)
    : [homePage, featuresPage, servicesPage, pricingPage, contactPage, startPage, templatesPage, aboutPage, blogPage, careersPage, helpPage, statusPage];

  const initialState = {
    page: initial,
    pages: pagesList,
    editor: {
      selectedSectionId: null,
      selectedComponentId: null,
      editMode: 'content',
      isDragging: false,
      zoom: 100,
      showGrid: false,
      previewMode: false,
    },
    history: [initial],
    historyIndex: 0,
  };

  const [state, dispatch] = useReducer(builderReducer, initialState);

  // Convenience methods
  const selectSection = useCallback((id) => {
    dispatch({ type: 'SELECT_SECTION', payload: id });
  }, []);

  const selectComponent = useCallback((id) => {
    dispatch({ type: 'SELECT_COMPONENT', payload: id });
  }, []);

  const addSection = useCallback((section, index) => {
    dispatch({ type: 'ADD_SECTION', payload: { section, index } });
  }, []);

  const updateSection = useCallback((id, updates) => {
    dispatch({ type: 'UPDATE_SECTION', payload: { id, updates } });
  }, []);

  const deleteSection = useCallback((id) => {
    dispatch({ type: 'DELETE_SECTION', payload: id });
  }, []);

  const duplicateSection = useCallback((id) => {
    dispatch({ type: 'DUPLICATE_SECTION', payload: id });
  }, []);

  const reorderSections = useCallback((ids) => {
    dispatch({ type: 'REORDER_SECTIONS', payload: ids });
  }, []);

  const toggleSectionVisibility = useCallback((id) => {
    dispatch({ type: 'TOGGLE_SECTION_VISIBILITY', payload: id });
  }, []);

  const updateSectionContent = useCallback((id, content) => {
    dispatch({ type: 'UPDATE_SECTION', payload: { id, updates: { content } } });
  }, []);

  const updateSectionStyles = useCallback((id, styles) => {
    dispatch({ type: 'UPDATE_SECTION_STYLES', payload: { id, styles } });
  }, []);

  const addComponent = useCallback((sectionId, component, index) => {
    dispatch({ type: 'ADD_COMPONENT', payload: { sectionId, component, index } });
  }, []);

  const updateComponent = useCallback((sectionId, componentId, updates) => {
    dispatch({ type: 'UPDATE_COMPONENT', payload: { sectionId, componentId, updates } });
  }, []);

  const deleteComponent = useCallback((sectionId, componentId) => {
    dispatch({ type: 'DELETE_COMPONENT', payload: { sectionId, componentId } });
  }, []);

  const updateNavbar = useCallback((updates) => {
    dispatch({ type: 'UPDATE_NAVBAR', payload: updates });
  }, []);

  const updateFooter = useCallback((updates) => {
    dispatch({ type: 'UPDATE_FOOTER', payload: updates });
  }, []);

  const setActivePage = useCallback((id) => {
    dispatch({ type: 'SET_ACTIVE_PAGE', payload: id });
  }, []);

  const createPage = useCallback((page) => {
    dispatch({ type: 'ADD_PAGE', payload: { page } });
    dispatch({ type: 'SET_ACTIVE_PAGE', payload: page.id });
  }, []);

  const updatePageName = useCallback((slug, name) => {
    dispatch({ type: 'UPDATE_PAGE', payload: { slug, updates: { name } } });
    // Also update nav labels across all pages so the label is consistent everywhere
    dispatch({ type: 'UPDATE_NAV_LABEL', payload: { href: slug, label: name } });
  }, []);

  const setEditMode = useCallback((mode) => {
    dispatch({ type: 'SET_EDIT_MODE', payload: mode });
  }, []);

  const setPreviewMode = useCallback((enabled) => {
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

  const value = {
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
    pages: state.pages,
    setActivePage,
    createPage,
    updatePageName,
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
