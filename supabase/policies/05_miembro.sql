-- (ARQUITECTURA §6.3) Políticas RLS de la tabla miembro.

alter table public.miembro enable row level security;

drop policy if exists miembro_select_logueados on public.miembro;
drop policy if exists miembro_update_propio on public.miembro;

-- Perfiles visibles a miembros logueados; cada quien edita el suyo.
create policy miembro_select_logueados on public.miembro
  for select using (auth.uid() is not null);

create policy miembro_update_propio on public.miembro
  for update using (user_id = auth.uid());
