import { C, FONT, meta } from '@/lib/tokens';

interface EyebrowProps {
  ix: string;
  label: string;
  light?: boolean;
}

export function Eyebrow({ ix, label, light = false }: EyebrowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ width: 9, height: 9, borderRadius: '50%', background: C.MINT }} />
      <span style={{ ...meta, color: light ? C.INK5 : C.SLATE }}>
        <span style={{ color: C.MINT }}>{ix}</span> · {label}
      </span>
    </div>
  );
}
