-- (O3 / ARQUITECTURA §10) Políticas RLS de Supabase Storage para los 4 buckets.
-- Las reglas operan sobre storage.objects, particionando por bucket_id.
-- Crea los buckets si no existen (idempotente).

insert into storage.buckets (id, name, public)
values
  ('avatars',  'avatars',  true),
  ('eventos',  'eventos',  true),
  ('aliados',  'aliados',  true),
  ('dossiers', 'dossiers', false)
on conflict (id) do nothing;

alter table storage.objects enable row level security;

-- ---------- avatars/ : lectura pública, escritura solo por el dueño ----------
drop policy if exists avatars_read on storage.objects;
drop policy if exists avatars_write_owner on storage.objects;
drop policy if exists avatars_update_owner on storage.objects;
drop policy if exists avatars_delete_owner on storage.objects;

create policy avatars_read on storage.objects
  for select using (bucket_id = 'avatars');

-- El dueño se identifica con la primera carpeta = auth.uid()  (avatars/{uid}/…).
create policy avatars_write_owner on storage.objects
  for insert with check (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy avatars_update_owner on storage.objects
  for update using (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy avatars_delete_owner on storage.objects
  for delete using (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );

-- ---------- eventos/ : lectura pública, escritura solo curador_core ----------
drop policy if exists eventos_read on storage.objects;
drop policy if exists eventos_write_core on storage.objects;

create policy eventos_read on storage.objects
  for select using (bucket_id = 'eventos');
create policy eventos_write_core on storage.objects
  for all using (bucket_id = 'eventos' and public.es_curador_core())
  with check (bucket_id = 'eventos' and public.es_curador_core());

-- ---------- aliados/ : lectura pública, escritura core o aliado dueño --------
-- El aliado dueño se identifica con la primera carpeta = aliado_fundador_id.
drop policy if exists aliados_read on storage.objects;
drop policy if exists aliados_write_core_o_dueno on storage.objects;

create policy aliados_read on storage.objects
  for select using (bucket_id = 'aliados');
create policy aliados_write_core_o_dueno on storage.objects
  for all using (
    bucket_id = 'aliados' and (
      public.es_curador_core()
      or (storage.foldername(name))[1] = (
        select aliado_fundador_id::text from public.miembro where user_id = auth.uid()
      )
    )
  )
  with check (
    bucket_id = 'aliados' and (
      public.es_curador_core()
      or (storage.foldername(name))[1] = (
        select aliado_fundador_id::text from public.miembro where user_id = auth.uid()
      )
    )
  );

-- ---------- dossiers/ : restringido (premium dormido) — solo core lee/escribe -
drop policy if exists dossiers_read_core on storage.objects;
drop policy if exists dossiers_write_core on storage.objects;

create policy dossiers_read_core on storage.objects
  for select using (bucket_id = 'dossiers' and public.es_curador_core());
create policy dossiers_write_core on storage.objects
  for all using (bucket_id = 'dossiers' and public.es_curador_core())
  with check (bucket_id = 'dossiers' and public.es_curador_core());
