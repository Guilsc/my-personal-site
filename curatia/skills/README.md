# Curatia Skill Library

Curatia keeps a curated, versioned runtime skill base instead of loading the entire upstream skills repository into every AI context.

## Runtime rule

1. Determine task, agent, channel, format, operation, and artifact state.
2. Route only the smallest relevant skill pack.
3. Combine selected skills with workspace audience, voice, editorial intelligence, and existing artifact.
4. Preserve the user's existing artifact intent when one exists.
5. Record capability gaps rather than injecting the whole external library at runtime.

## Upstream

Primary upstream registry: https://github.com/Guilsc/skills

The files under `manifest.json` and `packs/` define Curatia's initial curated baseline. Upstream skills are references, not blindly executable production behavior. Provider-specific IDs, creator-specific instructions, hard-coded profiles, external publishing actions, and incompatible runtime assumptions must be adapted or excluded.

## Evolution

Runtime skill changes are versioned. A future Skill Scout periodically checks approved upstream repositories for:
- updates to adopted skills
- stronger replacements
- new skills matching recorded capability gaps

Discovery never silently replaces an active production skill. New or changed skills enter Candidate/Evaluation before adoption.
