# Cordant Authority Incident Prototype — Interaction Spec

## Interaction model

The prototype presents an incident as a reviewable chain of authority: observed state, expected state, evidence, affected capabilities, remediation, approvals, external execution, and verified closure. Keep the current incident context visible while users move between these stages. Every action that changes the proposed transaction must visibly invalidate downstream approvals and execution readiness.

Use one source of truth for incident state. The graph, timeline, diff, claim evidence, blast-radius results, package hash, approvals, and execution status must all derive from that state. Distinguish observed facts from expected policy and proposed actions using labels and visual treatment; color alone is insufficient. Provide a persistent incident status and a clear indication of whether the displayed information is live, replayed, or stale.

## Required interactions

### 1. Lineage graph: draw, snap, and broken-edge recoil

- Draw an edge by pointer-down on a valid source port, dragging the connector, and releasing over a compatible target port. Show a live preview line, source and target affordances, and a textual “Connecting …” status for assistive technology.
- On a valid drop, snap the edge cleanly to both ports, create the relationship, and announce the connection. The edge must remain attached as nodes move or the viewport changes.
- On an invalid drop, animate the preview back to its source (“recoil”), then remove it. Do not create a dangling relationship. Explain the rejection in nearby text or an announced status (for example, incompatible authority type).
- During drag, keep the source node and candidate target visible. Escape cancels the in-progress edge. Pointer cancellation, loss of capture, or leaving the graph must also safely cancel.
- Support a keyboard equivalent: focus a source port, press Enter or Space to begin, move among valid targets with arrow keys or Tab, press Enter or Space to connect, and Escape to cancel. Announce valid/invalid targets and the result.
- Reduced motion replaces recoil animation with an immediate return and a concise status message. Do not rely on animation to communicate success or rejection.

### 2. Node evidence hover and focus

- Hovering a node opens a compact evidence preview anchored to it: node name/type, authority or capability, observed/expected status, and the strongest supporting evidence reference with timestamp/source.
- Keep the preview open while the pointer is over the node or preview. Close it on pointer exit after a short grace period; moving into the preview must not cause flicker. Escape closes it.
- Keyboard focus produces the same preview. Focus remains on the graph node, with the preview exposed as a description or non-modal detail; it must not trap focus.
- Clicking or pressing Enter opens the full evidence detail in the designated side panel. Provide an explicit close control and preserve the graph's selection on close.
- If evidence is missing, stale, or unavailable, say so directly; do not present an empty tooltip as proof.

### 3. Draggable expected-versus-observed diff

- Provide a labeled divider between “Expected” and “Observed” states. Dragging the divider changes the visible comparison proportion without changing incident data.
- The divider has a generous hit area, a visible focus ring, and a slider role with accessible name and current value. Arrow keys move it in small increments; Home/End move to either extreme. Announce the percentage or pane boundary.
- Keep both labels visible at all positions, including the extremes. Ensure text remains readable and the handle remains reachable at narrow viewport widths.
- A non-drag control (for example, a range input or “Show expected / Show observed” buttons) must provide equivalent access for keyboard, touch, and assistive technology.

### 4. Timeline replay and scrub updates the graph

- Timeline items are ordered by event time and show event type, source, and time. Selecting an event enters replay at that event; scrubbing selects the closest available event and updates the graph, node evidence, and expected/observed comparison to the same point in time.
- Show a persistent “Replay” indicator with the selected timestamp and an explicit “Return to live” action. Never imply a replayed graph is current live state.
- While replaying, graph topology and node statuses reflect the selected event snapshot. Evidence references must match that snapshot or be marked as later/current evidence.
- Scrubber keyboard behavior: Left/Right moves one event, Home/End selects first/last, and Space toggles play/pause when focus is on the timeline control. Provide an accessible name and announce the event and timestamp after changes.
- Play advances through events at a steady, user-controlled rate. Pause on reaching the end. Reduced motion disables decorative transitions; state updates remain immediate and understandable.
- Returning to live restores the latest graph and clears replay-only selection without losing the incident's selected node or panel context where possible.

### 5. AI claim hover/click evidence highlighting

- Each AI-generated claim has a clear “AI claim” label and confidence/context indicator. Hover or keyboard focus highlights the graph nodes, lineage edges, and evidence records that support that claim; de-emphasize unrelated items without hiding them.
- Clicking or pressing Enter pins the highlighting and opens claim details: claim text, supporting evidence, counterevidence or gaps, source/time, and a clear distinction between inference and verified fact.
- Clicking again, Escape, or an explicit clear action removes the pinned highlight. Moving focus away must not silently clear a pinned claim.
- Evidence references are actionable and lead to the corresponding evidence record. Missing or contradictory evidence is surfaced as a gap; it must not be silently omitted.
- Announce the claim and number/type of highlighted sources. Use shape, labels, or outlines in addition to color for highlights.

### 6. Capability-filtered blast radius

- Blast radius shows only resources and actions the active authority can affect, based on the current capability scope and incident snapshot. Display the filter basis (principal/authority, capability set, environment, and snapshot time) near the result.
- Separate directly affected resources from downstream or inferred reach. Every item links back to its graph node and states why it is included.
- If the capability set changes, the incident snapshot changes, or required policy data is missing, recompute the result and mark it stale while recomputing. Never present a stale count as current.
- Empty results state that no in-scope resources were found under the displayed filter; distinguish that from an unavailable or incomplete analysis.
- Keyboard users can navigate results, activate a resource to focus the graph node, and return to the result list without losing their place.

### 7. Remediation package compilation

- The remediation builder summarizes the intended changes, target resources, parameters, prerequisites, and expected effect before compilation.
- Compile is an explicit action. During compilation, show progress/status and prevent duplicate submissions. On success, show package identifier, canonical parameter summary, and a stable content hash; copy controls provide confirmation and an accessible label.
- On failure, preserve the draft and explain which validation or compilation step failed. Offer a retry only when the underlying error is retryable.
- A compiled package is immutable as a reviewed artifact. Any parameter edit creates a new draft/version and requires recompilation; it must not silently alter the compiled package associated with an approval.
- Show readiness requirements (for example, policy checks and required approvers) with pass/fail/unknown states and links to relevant evidence.

### 8. Approval invalidation on parameter edit

- Any edit to a package-bound parameter, target, scope, or action immediately marks the existing compiled hash and all approvals as invalid for the new draft. Remove the “ready to execute” state and any execution affordance tied to the old hash.
- Show which fields changed and identify the prior approved hash as historical. Do not erase audit history.
- Require recompilation to produce a new hash, then collect fresh approvals bound to that hash. Restoring the old parameter values does not automatically restore approval; it still requires an explicit recompile and approval decision.
- Announce invalidation to assistive technology and show a persistent inline explanation near the changed parameter and approval summary.

### 9. Hold-to-attest, two-person approval bound to hash

- Approval requires two distinct authenticated people. The first approver’s identity and attestation are recorded against the exact package hash; the same person cannot satisfy both slots.
- Before each attestation, show the package summary, hash, scope, material parameters, and consequences. Require an explicit acknowledgment that the attestation applies to the displayed hash.
- Hold the attestation control for a short, consistent duration (target 1.2 seconds). Display progress and the duration in an accessible way. Releasing early cancels without approval; pressing Escape or losing focus also cancels. Provide an equivalent keyboard hold interaction (Space/Enter held) and an accessible alternative that preserves intentional confirmation without requiring prolonged pointer contact.
- After successful attestation, show approver identity, timestamp, hash, and “1 of 2” or “2 of 2”. Never imply two-person approval after only one person attests.
- If the hash changes during or after approval, invalidate the attestations immediately and return the package to the approval-required state. A stale browser tab must re-check the active hash before accepting approval.
- Do not expose a second approval action to the first approver as a way to satisfy the two-person rule.

### 10. External execution progress and finality ring

- Execution can begin only when the currently compiled package has all required valid approvals and preflight checks pass. Bind the execution request to the approved hash and show that hash in the progress view.
- Present external execution as a state sequence such as submitted, pending, included, confirmations/finality progressing, finalized, failed, or unknown. Use precise labels supplied by the external system; do not call a transaction final before the configured finality condition is met.
- A progress/finality ring reflects the known confirmation/finality threshold, with a numeric/text equivalent and accessible name. Indeterminate or disconnected status uses an indeterminate state and explicit text, not a frozen percentage that appears complete.
- Show external transaction/reference ID, last update time, and a link/action to inspect the external record when available. Polling or reconnecting must not create duplicate execution requests.
- On reorg, reversal, timeout, or provider disagreement, move to an explicit uncertain/failed state and keep the incident open. Preserve the full execution history.
- Reduced motion uses a static or gently updated ring; state and numeric progress remain available without animation.

### 11. Verified closure

- Closure is available only after the external action reaches its required finality state and postconditions are independently checked against current evidence.
- Show each closure criterion, its evidence source and timestamp, and pass/fail/unknown status. Require all mandatory criteria to pass; unknown or stale checks block verified closure and explain why.
- “Close incident” produces a final verified-closure record containing incident ID, package hash, approvals, external execution reference/finality, postcondition evidence, and closure time. Keep a clear audit trail and an accessible confirmation.
- If postconditions later regress or the external state is reversed, reopen or flag the incident according to the product's incident model; never leave a verified badge that contradicts current evidence without a warning.

## Shared keyboard and accessibility behavior

- All controls are reachable in a logical Tab order. Use visible focus indicators, semantic headings, buttons, sliders, lists, and status regions. Do not encode meaning only through color, motion, or hover.
- Escape cancels transient gestures and closes transient previews. Enter/Space activates focused controls. Arrow keys operate graph navigation, sliders, and the timeline according to their local context.
- Graph nodes and edges need accessible names and relationships. Provide a non-graph textual lineage/resource list so the core incident can be reviewed without spatial navigation.
- Announce important asynchronous transitions (compile result, approval count/invalidation, execution state, replay timestamp, closure readiness) through concise live regions. Avoid announcing every animation frame or scrub tick.
- Support zoom and narrow screens without clipping controls or requiring precise pointer movement. Touch targets should be comfortably sized.
- Honor `prefers-reduced-motion`: remove recoil travel, smooth graph interpolation, pulsing, and animated ring effects. Keep state changes, labels, and progress values intact.
- Preserve focus after panels open/close, validation errors, and state refreshes. Never move focus unexpectedly during replay or asynchronous updates.

## QA checklist

### Lineage and evidence

- [ ] Valid edge drag snaps to compatible source/target ports and persists when nodes move.
- [ ] Invalid edge drop recoils/removes the preview, creates no edge, and exposes a rejection reason.
- [ ] Escape, pointer cancellation, and lost pointer capture cancel a pending edge safely.
- [ ] Keyboard users can start, navigate, complete, and cancel edge creation; result is announced.
- [ ] Hover and focus expose the same node evidence; moving into the preview does not dismiss it.
- [ ] Click/Enter opens full evidence and closing it restores graph selection.
- [ ] Missing, stale, and unavailable evidence are distinguishable from valid evidence.

### Diff, timeline, and AI claims

- [ ] Divider drag changes only comparison visibility; labels stay visible at both extremes.
- [ ] Divider supports keyboard and non-drag operation and reports its value.
- [ ] Selecting/scrubbing timeline events updates graph, statuses, evidence context, and diff together.
- [ ] Replay timestamp/state are persistent; Return to live restores latest state.
- [ ] Timeline keyboard navigation, play/pause, and end behavior work and are announced.
- [ ] AI claim hover/focus highlights all cited graph/evidence items; unrelated items remain available.
- [ ] Clicking a claim pins highlights and presents supporting evidence, counterevidence/gaps, and inference labeling.
- [ ] Claim highlight can be cleared by Escape and explicit control; pinned state does not disappear on blur.

### Blast radius and package

- [ ] Blast radius lists only resources in the displayed capability scope and explains inclusion.
- [ ] Direct and downstream/inferred reach are distinguishable; results link to graph nodes.
- [ ] Scope/snapshot changes trigger stale indication and recomputation; incomplete analysis is not shown as empty.
- [ ] Compilation presents material parameters and targets, blocks duplicate submissions, and returns a stable hash.
- [ ] Compile failure preserves the draft and identifies the failing step.
- [ ] Editing any package-bound field invalidates hash, approvals, and execution readiness immediately.
- [ ] Recompilation yields a new reviewed hash; restoring old values does not revive old approvals.

### Approval, execution, and closure

- [ ] Two distinct identities are required; the first approver cannot fill both slots.
- [ ] Hold release before completion cancels; Escape/focus loss cancels; keyboard and accessible alternative work.
- [ ] Each attestation records identity, time, and exact hash; package summary/hash are visible before attestation.
- [ ] Hash change during or after approval invalidates approvals and blocks execution.
- [ ] Execution is blocked until current hash approvals and preflight checks pass.
- [ ] Progress states, finality threshold, transaction ID, and update time are clear and have text equivalents.
- [ ] Unknown, failed, timeout, reorg, and provider-disagreement states cannot be mistaken for finality.
- [ ] Duplicate submissions are prevented during retry/reconnect.
- [ ] Closure is blocked until finality and all mandatory, fresh postconditions pass.
- [ ] Closure record binds incident, hash, approvals, execution reference, evidence, and time.

### Accessibility and resilience

- [ ] Complete core flow using keyboard only, with visible focus and preserved focus after panels and updates.
- [ ] Screen reader can review lineage and evidence without relying on spatial graph layout.
- [ ] Status changes are announced concisely; animation frames and rapid scrub steps are not spammed.
- [ ] Reduced-motion mode removes decorative movement while retaining clear state/progress feedback.
- [ ] At narrow viewport and zoom, graph controls, diff handle, approval actions, and status text remain operable.
- [ ] No critical state is communicated only by color, hover, or animation.
