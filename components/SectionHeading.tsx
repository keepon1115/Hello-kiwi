import type { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  lead
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
}) {
  return (
    <div className="section-heading reveal">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}
