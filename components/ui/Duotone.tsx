import { C } from '@/lib/tokens';

interface DuotoneProps {
  ratio?: string;
  label?: string;
  radius?: number;
  seed?: number;
}

export function Duotone({
  ratio = '4 / 5',
  label = 'retrato · duotono verde',
  radius = 8,
  seed = 0,
}: DuotoneProps) {
  const angle = 14 + ((seed * 23) % 40);
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        borderRadius: radius,
        overflow: 'hidden',
        border: `1px solid ${C.PETROL7}`,
        background: `linear-gradient(150deg, ${C.PETROL8}, #0a2c2b 55%, ${C.PETROL})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          backgroundImage: `repeating-linear-gradient(${angle}deg, rgba(67,153,115,.22) 0 2px, transparent 2px 9px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '42%',
          transform: 'translate(-50%,-50%)',
          width: '46%',
          aspectRatio: '1',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 38%, rgba(102,235,172,.16), rgba(67,153,115,.10) 60%, transparent 72%)',
        }}
      />
      <span
        style={{
          position: 'absolute',
          left: 14,
          bottom: 12,
          fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace',
          fontSize: 10.5,
          letterSpacing: '.04em',
          color: 'rgba(196,214,207,.62)',
        }}
      >
        {label}
      </span>
    </div>
  );
}
