# CLAUDE.md — Reglas del repositorio

## Versionado automático de documentos del proyecto

Cualquier documento entregable que reciba este repositorio desde el chat
estratégico de Change Consulting se versiona automáticamente sin necesidad
de instrucción explícita por sprint:

- Lineamientos / decisiones estratégicas → docs/strategy/
- Prompts de sprints → docs/sprints/sprint-N/PROMPT.md
- Entregables de sprints (arquitectura, código de muestra, schemas) →
  docs/sprints/sprint-N/ENTREGABLE.md o nombre específico
- Revisiones arquitectónicas → docs/sprints/sprint-N/REVISION.md

Convenciones:

- Archivos siempre en MAYÚSCULAS_CON_GUIONES_BAJOS.md
- Commits con prefijo "docs(strategy|sprint-N):"
- Nunca borrar versiones anteriores — usar git history para trazabilidad
- INVENTARIO_TECNICO.md y README.md permanecen en raíz

## Disciplina de sprints

Ningún sprint de construcción inicia sin documento REVISION.md del sprint
anterior versionado y aprobado en el repo. Si REVISION.md no existe o no
está aprobado, esperar al chat estratégico.

## Disciplina de ramas y deploys

- El trabajo de cada sprint se construye en una rama `feat/sprint-N-*`, no
  directo en `main`. `main` despliega a producción (`speculativefutures.mx`).
- Ningún cambio que dependa de variables de entorno aún no configuradas en
  producción se mergea a `main` hasta que esas variables existan en Vercel.
- Los entregables de sprint se validan vía preview deployment + PR antes del
  merge.

## Política de Supabase Database Branching

Cada branch de Supabase cuesta $0.01344/hora mientras esté activa. La
disciplina de cleanup es obligatoria para mantener costos en mínimos.

Reglas:

1. **Auto-destrucción al merge**: configurar en Supabase Dashboard
   (Branches → Settings) la eliminación automática al cerrarse el PR
   asociado, tanto por merge como por cierre sin merge.

2. **Branching solo cuando hay cambio de schema**: si el sprint NO modifica
   prisma/schema.prisma ni archivos en supabase/policies/, no crear branch
   de Supabase. Usar Vercel preview apuntando a la DB de main (o a una
   branch de staging persistente si se requiere aislamiento).

3. **Auditoría al cierre de cada sprint**: revisar Supabase Dashboard →
   Branches y eliminar manualmente cualquier branch sin PR asociado.

4. **Branch de staging persistente (opcional)**: si en algún sprint se
   requiere un entorno persistente que no sea producción ni un PR efímero,
   crear UNA sola branch llamada "staging" y mantenerla. Costo: ~$9.60/mes
   constantes. Decisión consciente, no por descuido.

## Documentos sin atribución a herramientas de IA

Todos los entregables se producen como producto de Change Consulting.
Sin co-autoría visible, sin firmas automáticas, sin metadata de generación.

## Política de aplicación de SQL contra DB Supabase

El entorno de construcción de Claude Code no tiene acceso a los puertos
5432 (directo) ni 6543 (pooler) de Supabase. Solo tráfico web (443) está
habilitado.

Flujo obligatorio para cambios de schema o políticas:

1. Code escribe schema en prisma/schema.prisma y políticas en
   supabase/policies/
2. Code genera SQL offline vía `prisma migrate diff` y deja archivos
   listos en supabase/policies/ o en la migración correspondiente
3. El equipo Change Consulting aplica el SQL manualmente, en orden
   numérico, desde el SQL Editor de Supabase (web, 443) o desde máquina
   local con acceso directo a la DB
4. Code verifica resultado con queries SELECT vía Supabase JS client
   (fetch, edge-safe, port 443)
5. Una vez aplicado, ejecutar `prisma migrate resolve --applied <nombre>`
   desde máquina con acceso directo para sincronizar el historial de
   migraciones

Excepción: el seed (prisma/seed.ts) usa Supabase JS via fetch para
llamar Admin API; sí funciona desde el sandbox de Code una vez
configurada SUPABASE_SERVICE_ROLE_KEY.

## Email transaccional en producción (O13 / O14)

Antes del primer deploy productivo (merge a `main` → speculativefutures.mx):

- Verificar el dominio `speculativefutures.mx` en Resend (DNS: SPF, DKIM,
  DMARC). Para preview deployments es aceptable el sender de prueba
  `onboarding@resend.dev`.
- Una vez verificado, cambiar en Supabase Auth → SMTP Settings el sender de
  `onboarding@resend.dev` a `no-reply@speculativefutures.mx`.
