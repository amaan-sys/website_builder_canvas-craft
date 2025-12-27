import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function NavbarPreview({ config, isEditing, onUpdate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navStyle = {
    backgroundColor:
      config.styles.backgroundColor === 'transparent'
        ? 'rgba(15, 23, 42, 0.8)'
        : config.styles.backgroundColor,
    color: config.styles.textColor,
  };

  return (
    <nav
      className={`${config.styles.sticky ? 'sticky top-0' : 'relative'} z-50 backdrop-blur-md`}
      style={navStyle}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            {config.logo.imageUrl ? (
              <img src={config.logo.imageUrl} alt="Logo" className="h-10" />
            ) : (
              <span
                className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                contentEditable={isEditing}
                suppressContentEditableWarning
              >
                {config.logo.text}
              </span>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {config.links.map((link) =>
              link.isButton ? (
                <a
                  key={link.id}
                  href={link.href}
                  className="px-6 py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-glow"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    color: '#ffffff',
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.id}
                  href={link.href}
                  className="font-medium transition-colors hover:text-primary"
                  style={{ color: config.styles.textColor }}
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {config.links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`font-medium py-2 ${
                    link.isButton ? 'px-6 py-2.5 rounded-lg text-center' : ''
                  }`}
                  style={
                    link.isButton
                      ? {
                          background:
                            'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                          color: '#ffffff',
                        }
                      : { color: config.styles.textColor }
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
