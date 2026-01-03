import React from 'react';
import { Quote, Star } from 'lucide-react';

export function TestimonialsSection({ section, isSelected, isEditing, onContentChange }) {
  const { content, styles } = section;
  const testimonials = content.testimonials || [];
  const variant = section.variant || 'cards';
  const background = styles.useGradient ? (styles.backgroundGradient || styles.backgroundColor) : (styles.backgroundColor || '#ffffff');
  const padding = styles.padding || '100px 0';

  if (variant === 'carousel') {
    return (
      <section className="relative" style={{ background, padding }}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => onContentChange?.('headline', e.currentTarget.textContent)}>{content.headline || 'What Our Clients Say'}</h2>
            <p className="text-lg opacity-80" contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => onContentChange?.('subheadline', e.currentTarget.textContent)}>{content.subheadline || 'Trusted by thousands of happy customers worldwide'}</p>
          </div>
          <div className="overflow-x-auto whitespace-nowrap py-4 hide-scrollbar">
            {testimonials.map((t, i) => (
              <div key={t.id || i} className="inline-block w-80 mr-4 bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <Quote className="w-8 h-8 text-blue-500/30 mb-4" />
                <p className="text-slate-600 mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-2"><img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" /><div><h4 className="font-semibold">{t.name}</h4><p className="text-sm text-slate-500">{t.role}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'quote') {
    const t = testimonials[0] || {};
    return (
      <section className="relative" style={{ background, padding }}>
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <Quote className="w-12 h-12 text-blue-500/20 mb-6" />
          <blockquote className="text-2xl md:text-3xl font-semibold">"{t.quote || 'Great product!' }"</blockquote>
          <div className="mt-6">
            <h4 className="font-semibold">{t.name}</h4>
            <p className="text-sm text-slate-500">{t.role}</p>
          </div>
        </div>
      </section>
    );
  }

  // default cards
  return (
    <section className="relative" style={{ background, padding }}>
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0f172a' }} contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => onContentChange?.('headline', e.currentTarget.textContent)}>{content.headline || 'What Our Clients Say'}</h2>
          <p className="text-lg opacity-80" style={{ color: '#64748b' }} contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => onContentChange?.('subheadline', e.currentTarget.textContent)}>{content.subheadline || 'Trusted by thousands of happy customers worldwide'}</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id || index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
              <Quote className="w-10 h-10 text-blue-500/30 mb-4" />
              <p className="text-slate-600 mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center gap-1 mb-4">{[...Array(5)].map((_, i) => (<Star key={i} className={`w-4 h-4 ${i < (testimonial.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} />))}</div>
              <div className="flex items-center gap-4"><img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" /><div><h4 className="font-semibold text-slate-900">{testimonial.name}</h4><p className="text-sm text-slate-500">{testimonial.role}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
