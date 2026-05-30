-- (ARQUITECTURA §6.3) Políticas RLS de la tabla senial.

alter table public.senial enable row level security;

drop policy if exists senial_select_publicada on public.senial;
drop policy if exists senial_select_propia_o_core on public.senial;
drop policy if exists senial_insert_curadores on public.senial;
drop policy if exists senial_update_autor_o_core on public.senial;
drop policy if exists senial_delete_core on public.senial;

-- Lectura: señales publicadas para todos; borradores/revisión solo autor o core.
create policy senial_select_publicada on public.senial
  for select using (estado = 'publicada');

create policy senial_select_propia_o_core on public.senial
  for select using (curador_id = public.current_miembro_id() or public.es_curador_core());

-- Inserción: solo curadores, y como autor de la propia señal.
create policy senial_insert_curadores on public.senial
  for insert with check (
    public.current_rol() in ('curador_comunidad','curador_core')
    and curador_id = public.current_miembro_id()
  );

-- Edición: autor (propias) o core (cualquiera).
create policy senial_update_autor_o_core on public.senial
  for update using (curador_id = public.current_miembro_id() or public.es_curador_core());

-- Borrado: solo core.
create policy senial_delete_core on public.senial
  for delete using (public.es_curador_core());
