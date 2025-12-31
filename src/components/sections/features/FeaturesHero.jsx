import React from "react";

export default function FeaturesHero({ section, isEditing }) {
  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1
          className="text-5xl font-bold mb-6"
          contentEditable={isEditing}
          suppressContentEditableWarning
        >
          {section.title}
        </h1>

        <p
          className="text-lg opacity-70 max-w-2xl mx-auto"
          contentEditable={isEditing}
          suppressContentEditableWarning
        >
          {section.subtitle}
        </p>
      </div>
    </section>
  );
}
