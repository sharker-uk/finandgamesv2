# Marketing Engine Architecture

## Pipeline

Source content -> campaign context -> content generation -> validation -> human review -> approval -> platform adapters -> publication record

## Principles

- Game-agnostic
- Platform adapters isolated
- Human approval before public publishing
- Secrets only in secure configuration
- Idempotent publishing
- Partial failure isolation
- Canonical website links
- Real gameplay/content must remain distinguishable from generated promotional material

## Future implementation

The initial implementation can be GitHub Actions plus Node.js scripts. A dashboard can be added later without changing the campaign model.
