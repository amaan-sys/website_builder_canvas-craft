import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
export function FAQSection({ section, isEditing, onContentChange }) {
  const { content, styles } = section;
  const faqs = content.faqs || [];
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="relative" style={{ background: styles.backgroundGradient || styles.backgroundColor || '#f8fafc', padding: styles.padding || '100px 0' }}>
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0f172a' }} contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => onContentChange?.('headline', e.currentTarget.textContent)}>{content.headline || 'Frequently Asked Questions'}</h2>
          <p className="text-lg opacity-80" style={{ color: '#64748b' }} contentEditable={isEditing} suppressContentEditableWarning onBlur={(e) => onContentChange?.('subheadline', e.currentTarget.textContent)}>{content.subheadline}</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (<div key={faq.id || index} className="bg-white rounded-2xl border border-slate-200 overflow-hidden"><button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"><span className="font-semibold text-slate-900 pr-4">{faq.question}</span><ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`} /></button><div className={`overflow-hidden transition-all duration-200 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}><div className="px-6 pb-5 text-slate-600 leading-relaxed">{faq.answer}</div></div></div>))}
        </div>
      </div>
    </section>
  );
}
