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

## Documentos sin atribución a herramientas de IA

Todos los entregables se producen como producto de Change Consulting.
Sin co-autoría visible, sin firmas automáticas, sin metadata de generación.
