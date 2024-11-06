import { ReactNode } from 'react';

type InfoBoxProps = {
  mode: 'hint' | 'warning';
  severity?: 'low' | 'medium' | 'high';
  children: ReactNode;
};

export default function InfoBox({
  severity,
  mode,
  children,
}: InfoBoxProps) {
  if (mode === 'hint') {
    return <aside className="infobox infobox-hint">{children}</aside>;
  }

  return (
    <aside className={`infobox infobox-warning warning--${severity}`}>
      {children}
    </aside>
  );
}
