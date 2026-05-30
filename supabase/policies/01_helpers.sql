-- (ARQUITECTURA §6.3) Funciones auxiliares para RLS.

create or replace function public.current_miembro_id()
returns uuid language sql stable as $$
  select id from public.miembro where user_id = auth.uid()
$$;

create or replace function public.current_rol()
returns text language sql stable as $$
  select rol_contribucion::text from public.miembro where user_id = auth.uid()
$$;

create or replace function public.es_curador_core()
returns boolean language sql stable as $$
  select coalesce(public.current_rol() = 'curador_core', false)
$$;
