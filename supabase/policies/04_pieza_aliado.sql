-- (ARQUITECTURA §6.3) Políticas RLS de pieza_editorial y aliado_fundador.

alter table public.pieza_editorial enable row level security;
alter table public.aliado_fundador enable row level security;

drop policy if exists pieza_select_publicada on public.pieza_editorial;
drop policy if exists pieza_cud_core on public.pieza_editorial;
drop policy if exists aliado_select_todos on public.aliado_fundador;
drop policy if exists aliado_update_core_o_propio on public.aliado_fundador;
drop policy if exists aliado_insert_delete_core on public.aliado_fundador;

create policy pieza_select_publicada on public.pieza_editorial
  for select using (estado = 'publicada');

create policy pieza_cud_core on public.pieza_editorial
  for all using (public.es_curador_core()) with check (public.es_curador_core());

create policy aliado_select_todos on public.aliado_fundador
  for select using (true);

create policy aliado_update_core_o_propio on public.aliado_fundador
  for update using (
    public.es_curador_core()
    or id = (select aliado_fundador_id from public.miembro where user_id = auth.uid())
  );

create policy aliado_insert_delete_core on public.aliado_fundador
  for all using (public.es_curador_core()) with check (public.es_curador_core());
