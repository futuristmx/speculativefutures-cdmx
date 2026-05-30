'use client';
import { useState, useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { MiembroAvatar } from '@/components/MiembroAvatar';
import { Button, useToast } from '@/components/ui';
import { subirAvatar } from '@/features/perfil/actions/subir-avatar';

interface Props {
  nombre: string;
  foto: string | null;
  userId: string;
}

export function AvatarUploader({ nombre, foto, userId }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(foto);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('avatar', file);
    startTransition(async () => {
      const res = await subirAvatar(fd);
      if (res.ok) {
        setPreview(res.url);
        toast({ title: 'Avatar actualizado' });
        router.refresh();
      } else {
        toast({ variant: 'error', title: 'No se pudo subir', description: res.error });
      }
    });
  }

  return (
    <div className="flex items-center gap-5">
      <MiembroAvatar nombre={nombre} foto={preview} id={userId} size={80} />
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFile}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={() => inputRef.current?.click()}
        >
          {pending ? 'Subiendo…' : 'Cambiar avatar'}
        </Button>
        <p className="mt-2 text-[12px] text-slate-500">JPG, PNG o WebP · máx. 2MB</p>
      </div>
    </div>
  );
}
