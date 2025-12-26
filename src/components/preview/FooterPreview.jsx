import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from 'lucide-react';
const socialIcons = { facebook: Facebook, twitter: Twitter, instagram: Instagram, linkedin: Linkedin, youtube: Youtube, github: Github };
export function FooterPreview({ config, isEditing }) {
  const footerStyle = { backgroundColor: config.styles.backgroundColor, color: config.styles.textColor };
  return (
    <footer className="relative" style={footerStyle}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">{config.logo.imageUrl ? <img src={config.logo.imageUrl} alt="Logo" className="h-10 mb-6" /> : <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block mb-6" contentEditable={isEditing} suppressContentEditableWarning>{config.logo.text}</span>}<p className="opacity-60 max-w-sm mb-6">Build beautiful websites without writing code.</p><div className="flex gap-4">{config.socialLinks.map((social) => { const Icon = socialIcons[social.platform]; return <a key={social.id} href={social.href} className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:scale-110" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}><Icon className="w-5 h-5" /></a>; })}</div></div>
          {config.columns.map((column) => <div key={column.id}><h4 className="font-semibold mb-4" style={{ color: '#ffffff' }} contentEditable={isEditing} suppressContentEditableWarning>{column.title}</h4><ul className="space-y-3">{column.links.map((link) => <li key={link.id}><a href={link.href} className="opacity-60 hover:opacity-100 transition-opacity hover:text-primary">{link.label}</a></li>)}</ul></div>)}
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"><p className="opacity-60 text-sm" contentEditable={isEditing} suppressContentEditableWarning>{config.copyright}</p><div className="flex gap-6 text-sm opacity-60"><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a><a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a></div></div>
      </div>
    </footer>
  );
}
