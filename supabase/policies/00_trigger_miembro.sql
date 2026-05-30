-- (ARQUITECTURA §5.6) Trigger: al crearse un auth.users, crea su Miembro base
-- con rol_contribucion = 'regular' y onboarding_completado = false.
-- Idempotente (ON CONFLICT (user_id) DO NOTHING): previene fallo cuando el
-- seed crea un auth.users vía Admin API (el trigger inserta el Miembro) y el
-- seed luego hace upsert sobre el mismo user_id.
--
-- Nota de adaptación al schema real (señalada): el SQL de referencia del chat
-- estratégico usa capitulo_id = 'cdmx' y created_at. El schema de este
-- proyecto modela capitulo_id como UUID (FK a capitulo.id) y la columna de
-- alta se llama fecha_registro. Se resuelve el UUID del capítulo 'cdmx' por su
-- columna `codigo` y se usan los nombres de columna reales. La intención
-- (insert simple e idempotente, sin reconciliación) se conserva.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  cdmx_id uuid;
begin
  select id into cdmx_id from public.capitulo where codigo = 'cdmx' limit 1;

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
