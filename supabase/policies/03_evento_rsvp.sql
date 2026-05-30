-- (ARQUITECTURA §6.3) Políticas RLS de evento y rsvp.
-- Estados públicos según el enum EstadoEvento confirmado (Sprint 0 v1.1).

alter table public.evento enable row level security;
alter table public.rsvp   enable row level security;

drop policy if exists evento_select_publicos on public.evento;
drop policy if exists evento_cud_core on public.evento;
drop policy if exists rsvp_select_propio on public.rsvp;
drop policy if exists rsvp_insert_propio on public.rsvp;
drop policy if exists rsvp_delete_propio on public.rsvp;

create policy evento_select_publicos on public.evento
  for select using (
    estado in ('programado','lleno','en_curso','realizado','pospuesto')
    or public.es_curador_core()
  );

create policy evento_cud_core on public.evento
  for all using (public.es_curador_core()) with check (public.es_curador_core());

create policy rsvp_select_propio on public.rsvp
  for select using (miembro_id = public.current_miembro_id() or public.es_curador_core());

create policy rsvp_insert_propio on public.rsvp
  for insert with check (miembro_id = public.current_miembro_id());

create policy rsvp_delete_propio on public.rsvp
  for delete using (miembro_id = public.current_miembro_id());
