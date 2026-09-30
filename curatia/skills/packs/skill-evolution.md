# Skill Evolution

## Curatia agents / flows
Skill Router, future Skill Scout, capability-gap review.

## Adopted upstream skills
- `skill-discovery`: search-before-reinventing pattern and reuse of proven capabilities.
- `universal-skills-manager`: multi-source discovery/synchronization concepts. Do not adopt its local tool paths or auto-install behavior into production Curatia.
- `persona-create` / `persona-import`: useful separation of agent identity, tools, boundaries, and quality checks when Curatia agent definitions evolve.

## Runtime
The Skill Router receives task, agent, channel, format, operation, and artifact state and selects the smallest sufficient set of active skills.

It never injects the entire upstream repository into model context.

## Capability gaps
When no active skill adequately covers a task:
1. Complete safely with existing capabilities when possible.
2. Record the capability gap.
3. Skill Scout later searches approved upstream sources for a candidate.
4. Candidate is evaluated/adapted.
5. Promotion to Active is explicit and versioned.

## Periodic update
Skill Scout periodically compares adopted skill source versions and searches for recorded gaps. Upstream changes are proposals, never silent production updates.
