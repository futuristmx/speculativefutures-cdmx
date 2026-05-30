# SPECULATIVE FUTURES CDMX — Revisión Arquitectónica Sprint 2
## Veredicto del Chat Estratégico
### Change Consulting · Mayo 2026

---

## VEREDICTO

**APROBADO CON OBSERVACIONES.** Sprint 3 autorizado.

El Sprint 2 entrega los 9 bloques del prompt. Criterios 1–19 implementados y verificados localmente; 20–21 cumplidos (CI + preview success), con el matiz de que el upload de avatar end-to-end está condicionado al cierre operativo de T3.

Las decisiones técnicas durante construcción son sólidas (D-C1 a D-C4). Las reconciliaciones de DESV-S2-1 y DESV-S2-2 se aplicaron correctamente: identidad visual de SF CDMX (Gotham + tokens del proyecto + radios 2/4px) confirmada, T3 con decisión definitiva A pendiente solo de operación de dashboard. La disciplina con el registro histórico se respetó.

---

## CONDICIONES DE TRANSICIÓN A SPRINT 3

Estas tres condiciones se cumplen antes o durante las primeras tareas del Sprint 3.

### TT-S2-1 — Cierre operativo de T3 + verificación end-to-end del avatar

**Acción:** aplicar manualmente las políticas de `supabase/policies/06_storage.sql` desde el panel Storage → Policies del dashboard de Supabase. Crear bucket `avatars` si no existe. Para `avatars`: lectura pública, escritura solo por dueño (path-based con user_id).

**Verificación end-to-end (obligatoria):** desde el preview deployment, hacer login con magic link → ir a `/perfil/yo` → subir una imagen de avatar → confirmar que:
- La imagen se almacena en `avatars/{user_id}/avatar.webp` en el bucket
- El URL del avatar se persiste en `Miembro.foto`
- La imagen se muestra correctamente en `/perfil/yo`, en `/perfil/[id]` desde otra cuenta, y en `MiembroCard` del listado `/miembros`

**Responsable:** equipo Change Consulting (operación de dashboard + verificación en preview).

**Sin esta verificación, los criterios 8 y 9 del Sprint 2 quedan en limbo: implementados pero no verificados en runtime productivo.**

### TT-S2-2 — Verificación rápida del flujo end-to-end del Sprint 2 (10 minutos)

Aunque la decisión fue opción C (saltar verificación de UX), recomiendo enérgicamente hacer este checklist antes de Sprint 3. Es la última ventana de verificación barata antes de que más capas se añadan encima:

1. Visitante anónimo entra a `/miembros` → debe ir a `/login`
2. Registro con magic link funcional (Resend SMTP entregando)
3. Tras magic link, primer login redirige a `/onboarding`
4. Onboarding falla con mensajes claros si:
   - Faltan campos obligatorios
   - Motivación tiene <20 caracteres
   - Se intentan más de 3 enlaces
5. Onboarding completo redirige a `/dashboard`
6. Dashboard muestra nombre y rol correctos
7. `/perfil/yo` muestra todos los datos, incluido el email privado
8. Editar perfil persiste cambios y refresca correctamente
9. Casilla "Curador Comunidad" en edición promueve el rol
10. Desde una segunda cuenta de prueba: ver `/perfil/[id_de_la_primera]` no debe mostrar email ni datos sensibles

Cualquier fricción o defecto encontrado → apuntalo. Se integra como pre-requisito al inicio del Sprint 3, no como nuevo sprint.

### TT-S2-3 — PROMPT residual del Sprint 2 (decisión menor)

El `docs/sprints/sprint-2/PROMPT.md` versionado en repo conserva la v1.0 sin la corrección de identidad visual. La regla de "no editar registro histórico" se respetó, pero un lector futuro verá contradicción entre el PROMPT y el ENTREGABLE.

**Decisión recomendada: A — dejarlo así.** La fidelidad del registro histórico tiene más valor que la consistencia textual con el resultado final. El ENTREGABLE documenta la reconciliación. Si un lector se confunde, basta con leer el ENTREGABLE del Sprint 2 para ver la nota de corrección.

Alternativa B (no recomendada): versionar un `PROMPT_v1.1.md` adicional con nota cruzada. Añade ruido sin valor sustancial.

---

## OBSERVACIONES PARA INTEGRAR AL SPRINT 3

Estas no bloquean. Son refinamientos que conviene resolver dentro del alcance natural del Sprint 3 o como mantenimiento ligero.

### O15 — Validación del flujo toast con server actions + redirect

El store propio de toast (D-C1) es decisión defendible, pero queda por verificar que el toast persiste correctamente cuando un server action hace `revalidatePath` + `redirect`. Caso típico: toast "Perfil actualizado" debe verse en `/dashboard` después de redirect, no perderse en la transición. Sprint 3 lo verifica de paso al introducir flujos de eventos con feedback similar.

### O16 — UI de paginación más allá de 20 miembros

`MiembroCard` con paginación de 20 está bien para hoy. Cuando hayan >40 miembros, ¿hay botones "siguiente página"? ¿Indicador de "página 2 de 4"? Probablemente sí, pero el ENTREGABLE no lo detalla. Revisar en preview y, si falta, añadir como tarea menor al inicio del Sprint 3.

### O17 — Documentar `colorDeId` para iniciales

`MiembroAvatar` usa `colorDeId(user_id)` para generar color estable. Documentar la función (algoritmo, número de colores en el set, garantía de distribución) en JSDoc. Trivial pero útil para mantenimiento.

---

## RECONOCIMIENTOS

Decisiones técnicas durante construcción que merecen señalarse:

- **D-C3 (avatar path por uid)** — patrón estándar Supabase Storage aplicado correctamente. Encaja con la RLS configurada en Sprint 1.
- **D-C4 (sharp en server action Node)** — Code mostró memoria del aprendizaje del Sprint 1 (middleware edge-safe). Sharp no funciona en edge runtime; ubicar el procesamiento en server action Node es la decisión correcta.
- **Reconciliación honesta de DESV-S2-1 y DESV-S2-2** — Code podría haber resuelto unilateralmente, optó por pedir veredicto. Disciplina de proceso ejemplar.
- **Mantenimiento del registro histórico** — Code conservó el PROMPT residual sin editarlo, conforme a CLAUDE.md. Las contradicciones futuras se resuelven con el ENTREGABLE como capa de corrección, no editando lo histórico.

---

## SIGUIENTE PASO

1. Este documento se versiona automáticamente en `docs/sprints/sprint-2/REVISION.md` según convención del CLAUDE.md
2. TT-S2-1 (cierre T3 + verificación avatar) se ejecuta antes de cualquier código del Sprint 3
3. TT-S2-2 (verificación end-to-end del flujo) se hace en paralelo, 10 minutos
4. TT-S2-3 (decisión sobre PROMPT residual) ya recomendada: A — dejarlo
5. El chat estratégico emite el prompt del Sprint 3 (eventos, RSVP, home dinámico, página de aliados) cuando se solicite

**Sprint 3 autorizado.** El ciclo continúa.

---

*Speculative Futures CDMX · Revisión Arquitectónica Sprint 2 · v1.0*
*Change Consulting · Mayo 2026*
