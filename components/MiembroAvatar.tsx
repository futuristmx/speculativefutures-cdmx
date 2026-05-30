import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { iniciales, colorDeId } from '@/lib/avatar';
import { cn } from '@/lib/utils';

interface MiembroAvatarProps {
  nombre: string;
  foto?: string | null;
  id: string;
  size?: number;
  className?: string;
}

/** Avatar de miembro: muestra la foto si existe, o iniciales sobre color estable. */
export function MiembroAvatar({
  nombre,
  foto,
  id,
  size = 40,
  className,
}: MiembroAvatarProps) {
  return (
    <Avatar className={cn(className)} style={{ width: size, height: size }}>
      {foto ? <AvatarImage src={foto} alt={nombre} /> : null}
      <AvatarFallback
        style={{ background: colorDeId(id), color: '#F4F7F5', fontSize: size * 0.36 }}
      >
        {iniciales(nombre)}
      </AvatarFallback>
    </Avatar>
  );
}
