// Core Builder Types - JSON Schema for Page Structure

export type ComponentType = 
  | 'text'
  | 'heading'
  | 'paragraph'
  | 'button'
  | 'image'
  | 'icon'
  | 'divider'
  | 'spacer'
  | 'container'
  | 'grid'
  | 'card';

export type SectionType = 
  | 'hero'
  | 'features'
  | 'services'
  | 'cta'
  | 'testimonials'
  | 'gallery'
  | 'pricing'
  | 'contact'
  | 'stats'
  | 'team'
  | 'faq'
  | 'logocloud'
  | 'custom';

export type NavbarStyle = 'minimal' | 'centered' | 'split' | 'transparent';
export type FooterStyle = 'simple' | 'columns' | 'centered' | 'minimal';

export interface ComponentStyles {
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  border?: string;
  shadow?: string;
  width?: string;
  height?: string;
  opacity?: number;
  customClasses?: string;
}

export interface BuilderComponent {
  id: string;
  type: ComponentType;
  content: Record<string, any>;
  styles: ComponentStyles;
  children?: BuilderComponent[];
}

export type HeroVariant = 'split' | 'centered' | 'video' | 'minimal' | 'gradient';
export type FeaturesVariant = 'grid' | 'list' | 'cards' | 'icons';
export type CTAVariant = 'simple' | 'split' | 'banner' | 'floating';
export type TestimonialsVariant = 'cards' | 'carousel' | 'quote' | 'minimal';
export type PricingVariant = 'cards' | 'table' | 'toggle';
export type GalleryVariant = 'grid' | 'masonry' | 'carousel';

export type SectionVariant = HeroVariant | FeaturesVariant | CTAVariant | TestimonialsVariant | PricingVariant | GalleryVariant | string;

export interface SectionStyles {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  padding?: string;
  minHeight?: string;
  customClasses?: string;
}

export interface BuilderSection {
  id: string;
  type: SectionType;
  variant?: SectionVariant;
  name: string;
  visible: boolean;
  locked: boolean;
  styles: SectionStyles;
  content: Record<string, any>;
  components: BuilderComponent[];
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  isButton?: boolean;
}

export interface NavbarConfig {
  id: string;
  style: NavbarStyle;
  logo: {
    text?: string;
    imageUrl?: string;
  };
  links: NavLink[];
  styles: {
    backgroundColor?: string;
    textColor?: string;
    sticky?: boolean;
  };
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  id: string;
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'github';
  href: string;
}

export interface FooterConfig {
  id: string;
  style: FooterStyle;
  logo: {
    text?: string;
    imageUrl?: string;
  };
  columns: FooterColumn[];
  socialLinks: SocialLink[];
  copyright: string;
  styles: {
    backgroundColor?: string;
    textColor?: string;
  };
}

export interface PageMeta {
  title: string;
  description: string;
  favicon?: string;
}

export interface PageSchema {
  id: string;
  name: string;
  slug: string;
  meta: PageMeta;
  navbar: NavbarConfig;
  sections: BuilderSection[];
  footer: FooterConfig;
  globalStyles: {
    fontFamily?: string;
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
  };
}

export interface EditorState {
  selectedSectionId: string | null;
  selectedComponentId: string | null;
  editMode: 'content' | 'layout';
  isDragging: boolean;
  zoom: number;
  showGrid: boolean;
  previewMode: boolean;
}

export interface DragItem {
  id: string;
  type: 'section' | 'component' | 'template';
  data: any;
}

// Template presets for quick section creation
export interface SectionTemplate {
  id: string;
  name: string;
  type: SectionType;
  thumbnail: string;
  defaultContent: Record<string, any>;
  defaultStyles: SectionStyles;
  defaultComponents: BuilderComponent[];
}

export interface ComponentTemplate {
  id: string;
  name: string;
  type: ComponentType;
  icon: string;
  defaultContent: Record<string, any>;
  defaultStyles: ComponentStyles;
}
