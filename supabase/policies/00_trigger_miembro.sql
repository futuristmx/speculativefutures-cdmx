-- (ARQUITECTURA §5.6) Trigger: al crearse un auth.users, crea su Miembro base
-- con capitulo_id = cdmx, rol_contribucion = regular, onboarding_completado = false.
-- El seed inicial del curador core se inserta aparte (no por este trigger).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  cdmx_id uuid;
  existente uuid;
begin
  select id into cdmx_id from public.capitulo where codigo = 'cdmx' limit 1;

  -- Reconciliación (O1): si ya existe un Miembro precargado con este email en
  -- el capítulo y sin user_id (ej. el curador core sembrado), se vincula en
  -- lugar de crear uno nuevo, preservando su rol_contribucion.
  select id into existente
  from public.miembro
  where capitulo_id = cdmx_id and email = new.email and user_id is null
  limit 1;

  if existente is not null then
    update public.miembro
      set user_id = new.id, updated_at = now()
      where id = existente;
    return new;
  end if;

  insert into public.miembro (
    id, user_id, capitulo_id, nombre, email,
    rol_contribucion, onboarding_completado, estado,
    seniales_publicadas_aprobadas, fecha_registro, updated_at
  )
  values (
    gen_random_uuid(), new.id, cdmx_id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    'regular', false, 'activo',
    0, now(), now()
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
