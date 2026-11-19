# Cordant Authority Incident Prototype — UI System

A compact interface system for investigating regulated blockchain incidents and compiling controlled remediation. The visual language is restrained and precise: white and soft-gray surfaces, near-black text, blue for active/actionable states, thin borders, compact sans-serif type, and deliberate whitespace. Aim for the calm craft of Linear, Granola, and Vercel while keeping evidence, uncertainty, and approval boundaries explicit.

## Design principles

- **Show the chain of authority.** Make source, signer, delegation, policy, and execution relationships legible.
- **Separate fact from interpretation.** AI claims always carry Verified, Inferred, or Unknown status and a traceable source.
- **Make change reviewable.** Expected and observed state sit side by side; remediation is previewed before approval or execution.
- **Keep consequential actions deliberate.** Two-person approval and external finality are distinct, visible stages.
- **Prefer density with breathing room.** Tables and timelines may be information-dense, but headings, grouping, and spacing preserve scanability.

## Tokens

| Token | Value | Use |
|---|---|---|
| `color.canvas` | `#FFFFFF` | Main application canvas |
| `color.surface` | `#FFFFFF` | Cards, menus, dialogs |
| `color.surface-muted` | `#F7F8FA` | Sidebar, table headers, secondary panels |
| `color.surface-hover` | `#F2F4F7` | Hover and selected-row backgrounds |
| `color.text` | `#17191C` | Primary text |
| `color.text-secondary` | `#626B76` | Supporting copy, metadata |
| `color.text-muted` | `#89919B` | Timestamps, placeholders |
| `color.border` | `#E4E7EB` | Default 1px dividers and outlines |
| `color.border-strong` | `#CDD3DA` | Emphasized boundaries |
| `color.accent` | `#2563EB` | Active navigation, links, primary actions, focus |
| `color.accent-soft` | `#EFF6FF` | Selected/active background |
| `color.success` | `#16825D` | Verified, approved, finalized |
| `color.warning` | `#A96608` | Inferred, pending, attention |
| `color.danger` | `#C43D42` | Failed, revoked, mismatch |
| `color.unknown` | `#697386` | Unknown or unavailable evidence |
| `font.family` | `Inter, ui-sans-serif, system-ui, sans-serif` | All UI; use tabular numerals for IDs and quantities |
| `font.size-xs` | `11px / 16px` | Dense metadata |
| `font.size-sm` | `12px / 18px` | Table cells, labels |
| `font.size-md` | `14px / 20px` | Default interface text |
| `font.size-lg` | `16px / 24px` | Section titles |
| `font.size-xl` | `20px / 28px` | Page title |
| `font.size-display` | `26px / 32px` | Portfolio headline or incident identity |
| `space` | 4px base; 4, 8, 12, 16, 24, 32, 48, 64 | Spacing scale |
| `radius-sm` | `4px` | Inputs, badges, compact controls |
| `radius-md` | `8px` | Cards, popovers |
| `radius-lg` | `12px` | Drawers and dialogs |
| `shadow-popover` | `0 8px 24px rgba(20,28,38,.10)` | Menus and floating surfaces only |

Use regular 400 body text, 500 labels, and 600 titles. Avoid heavy weights, gradients, decorative illustrations, and large shadows. Use icons from one consistent 16px outline set; pair icon-only actions with accessible names.

## Layout and responsive rules

- Desktop shell: 240px navigation rail, flexible content, optional 320–360px evidence/inspector panel. Keep the main reading column around 1100px maximum.
- Page header: title and incident/portfolio context at left; primary action and overflow at right. Keep breadcrumbs quiet and short.
- Use 24px page gutters at wide widths, 16px below 900px, and 12px on narrow phones. Main section gaps: 24–32px.
- Tables use compact 40–44px rows, sticky headers when long, and horizontal scrolling only for truly tabular data. On narrow screens, convert rows into labeled stacked records; never hide status or critical values.
- At ≤900px, collapse navigation to a menu or bottom navigation and move inspectors into a drawer. At ≤600px, stack headers and action groups, keep primary actions full-width when useful, and use full-screen approval/remediation sheets.
- Do not encode meaning through color alone. Keep status text and icons visible at all widths.

## Component inventory

### App shell and navigation
- **Workspace rail:** portfolio, incidents, policies, activity, settings; active item uses blue text and a soft-blue pill/row, with a slim blue marker.
- **Top context bar:** organization/network selector, environment label, help, user menu. Environment must remain visible in incident and execution flows.
- **Breadcrumbs:** compact hierarchy for portfolio → incident → remediation; current item is plain text.

### Portfolio dashboard
- **Portfolio summary:** incident counts, exposure/at-risk value, unresolved approvals, and finality health; each metric has a label, value, period/context, and source timestamp.
- **Network/authority table:** network, authority owner, policy/version, observed health, open incidents, last verified time.
- **Incident queue:** severity, affected authority/network, short cause, state, age, owner. Default sort prioritizes active risk, then age.
- **Health strip:** concise finality/connector status with last check and an explanation link; avoid implying live monitoring when data is stale.

### Authority lineage
- **Lineage graph:** nodes for root authority, delegates, policy, signer/key, contract or wallet, and external executor. Directed edges are labeled with relationship and scope. Selection highlights only connected paths; provide a companion ordered list for keyboard and screen-reader users.
- **Authority node:** name/identifier, type, current state, validity window, source link. Revoked or expired authority is visually distinct and never appears healthy.
- **Lineage inspector:** selected node’s parent, children, permissions, limits, provenance, and observed-at timestamp.

### Expected-vs-observed matrix
- **Comparison table:** rows are control/field; columns show expected value, observed value, delta, source, and status. Pin row/column labels where helpful.
- **Mismatch treatment:** concise textual delta plus warning/danger state; provide the underlying raw value and source on expansion.
- **Filters:** all, mismatch, missing, stale; active filters are visible and removable.

### Incident timeline
- **Event stream:** time, actor/system, action, result, evidence link. Group related events by phase; newest/oldest ordering is explicit.
- **Event marker:** distinct but restrained icons for observation, policy evaluation, human action, submission, and finality. Include timezone and relative time with exact timestamp on demand.
- **Timeline filters:** source, actor, event type. Empty/loading/error states retain the time-range context.

### AI evidence claims
- **Claim card:** claim text, status badge, concise rationale, evidence references, confidence only when calibrated, and last evaluated time.
- **Claim statuses:** **Verified** means directly supported by cited evidence; **Inferred** means reasoned from evidence and must say why; **Unknown** means evidence is missing, stale, or conflicting. Never style an inference as a fact.
- **Evidence citation:** source type, immutable identifier/hash where available, timestamp, and open/view action. Preserve citation when copied or exported.
- **Conflict view:** show competing sources side by side; do not silently choose one.

### Blast radius
- **Impact summary:** affected networks, authorities, contracts/accounts, policies, transaction/value exposure, and dependent workflows.
- **Impact graph/list:** provide graph for relationships plus a sortable accessible table/list with the same information. Mark confirmed versus estimated reach explicitly.
- **Scope badge:** label “confirmed”, “potential”, or “unknown”; include the computation time and assumptions.

### Remediation compilation
- **Plan builder:** ordered proposed operations, preconditions, expected postconditions, affected entities, and reversibility. Each step points back to the incident evidence and policy basis.
- **Diff preview:** expected before/after state with additions, removals, and unchanged values clearly separated. Include machine-readable payload inspection.
- **Validation panel:** policy checks, simulation result, blockers, and compiler/version metadata. A failed or stale validation disables submission and explains why.
- **Compile action:** produces a versioned immutable plan summary and hash; compiling is separate from approving or executing.

### Two-person approvals
- **Approval panel:** named requester and independent approver, role/authority, plan hash, scope, expiry, and decision history.
- **Approval states:** requested, awaiting second person, approved, rejected, expired, revoked. The same identity cannot satisfy both roles.
- **Decision controls:** approve/reject with reason; show exact plan hash and scope immediately beside the action. Require a clear confirmation step for approval.

### External execution and finality
- **Execution panel:** target system/network, connector identity, submitted payload/hash, transaction/reference ID, and submitter.
- **Execution states:** ready, submitting, submitted, pending finality, finalized, failed, reverted, unknown. “Submitted” never implies “finalized.”
- **Finality receipt:** external proof/reference, block/sequence, confirmations or finality rule, timestamp, and verification status. Distinguish observed external result from local submission acknowledgement.
- **Retry controls:** only when safe and permitted; explain duplicate-execution risk and preserve prior attempts.

## Shared interaction states

Every interactive component defines default, hover, focus-visible, pressed, selected, disabled, loading, empty, error, and stale states as applicable. Use skeletons only for known layout regions. Keep errors adjacent to the affected field or action and offer a recovery path. Stale data shows its age and source. Destructive or externally consequential actions use explicit verbs and display target, scope, and plan/version identity.

Badges use a light tint, 1px border, small icon, and visible label. Blue means current selection or available action; green means evidence-backed success; amber means pending or inferred; red means failure or mismatch; gray means neutral/unknown. Never use color as the sole state cue.

## Accessibility

- Meet WCAG 2.2 AA contrast for text and controls; test muted text and tinted badges rather than assuming they pass.
- Ensure full keyboard operation, logical focus order, visible focus rings, and focus restoration after dialogs/drawers.
- Give graphs an equivalent navigable list/table and expose node/edge labels to assistive technology.
- Use semantic headings, table headers, labels, button names, and live regions for async status changes. Announce state changes without repeatedly announcing timeline refreshes.
- Pair status color with words/icons; do not rely on hover for evidence or critical data.
- Support 200% zoom and reduced motion. Touch targets should be at least 44×44px on mobile; compact desktop controls may be 32px high with sufficient spacing.

## Motion

Motion clarifies selection, navigation, and progress; never use it to imply a transaction has finalized. Use `cubic-bezier(.2,.8,.2,1)` for entrances and `cubic-bezier(.4,0,.2,1)` for exits.

- Hover/focus color: 100–140ms.
- Press feedback: 80–120ms.
- Selection, tab, and small layout changes: 160–200ms.
- Popover/drawer entrance: 180–240ms; exit: 140–180ms.
- Route transition: 180–240ms with minimal opacity/position change.
- Progress indicators may loop subtly; finality is represented by actual state and evidence, never celebratory animation.
- Respect `prefers-reduced-motion`: remove nonessential movement and use immediate state changes or short opacity fades.
