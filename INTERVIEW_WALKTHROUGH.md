# Cordant interview walkthrough

## Goal

Use the prototype to demonstrate four things in eight minutes:

1. Understanding of Cordant's likely value: continuous, evidence-backed assurance across fragmented operating systems.
2. Fintech judgment: authority, custody, segregation of duties, material exposure and auditability.
3. Responsible AI judgment: AI investigates and prepares; humans approve; independent evidence closes the control.
4. Product craft: the workflow turns complex evidence into a calm, reviewable decision.

Present this as a product hypothesis inspired by Cordant's positioning and partner ecosystem. Do not imply that Cordant already ships this blockchain functionality.

## Eight-minute narrative

### 0:00–0:45 — Frame the hypothesis

> I started with a question: what happens when an employee is correctly revoked in identity and custody systems, but their authority survives on-chain? In regulated fintech, closing the access ticket is not enough. The control is only restored when the real-world authority state matches policy and there is independent evidence of that match.

> I treated this as a Cordant product hypothesis, not as a claim about the current roadmap. The prototype explores how Cordant could connect identity, custody, policy and blockchain evidence into one continuous assurance loop.

Explain why this is a useful edge case:

- The control crosses organizational and technical boundaries.
- A normal IAM review can pass while the material risk remains.
- Blockchain state is transparent but not automatically connected to employee identity, policy or approval history.
- The consequence is an authority problem, not simply a transaction-monitoring problem.

### 0:45–2:00 — Reveal the broken authority lineage

Open **Investigate**.

> The alert is deliberately written as a control exception: a revoked employee still controls USDC mint authority on Solana. The first interaction reconstructs the authority lineage from the person, through Okta and Fireblocks, to the signing key and the on-chain mint authority.

Hover or focus two nodes to reveal source evidence. Press `E` to expose evidence markers.

> Cordant's advantage here is not another blockchain explorer. It is resolving how an organizational identity maps to custody access, a key and a material on-chain capability.

Drag **Expected vs observed**.

> The policy expects a treasury 3-of-5 authority on all three networks. Ethereum and Arbitrum match. Solana still points to the revoked operator. This makes the product's core comparison explicit: intended control versus observed reality.

### 2:00–3:05 — Reconstruct the failure

Press `R` or drag the timeline.

> I designed the timeline as a flight recorder rather than an activity feed. IAM was revoked, custody access was removed, and two chains were rotated. The Solana step is missing, but the operations ticket was still closed.

Pause on **14:08 Solana missing**.

> This is the key contradiction. Every individual system can look locally reasonable while the end-to-end control is broken. Cordant can add value by evaluating the lifecycle, not just collecting events.

### 3:05–4:00 — Show disciplined AI reasoning

Open the investigation claims.

> I avoided a generic chatbot. The AI presents a case and exposes the boundary of its knowledge.

- **Verified:** IAM was revoked and two chain authorities changed.
- **Inferred:** the Solana runbook step may have been skipped.
- **Unknown:** a transaction may have been prepared but never submitted.

> In a regulated workflow, uncertainty is part of the product. The AI should never visually flatten evidence, inference and missing information into one confident answer. Each claim remains traceable to its source.

### 4:00–4:45 — Establish materiality

Open **View blast radius** and select capabilities.

> Risk teams do not prioritize anomalies only by severity labels. They need materiality. This authority can still mint, freeze or delegate across $84.2 million of issued assets. Selecting a capability filters the affected programs and legal entities.

> This turns a technical mismatch into a decision about exposure and urgency.

### 4:45–5:45 — Compile a safe remediation package

Select **Prepare remediation package**.

> Cordant remains read-only. The AI assembles a reviewable package from the policy clause, target state, approved runbook, transaction parameters, required approvers and verification conditions.

Edit the new authority field briefly.

> A material parameter change invalidates the package and clears approvals. This is critical: approval must attach to the exact proposed action, not to a mutable ticket.

Refresh or return to the valid package before continuing.

### 5:45–6:35 — Make segregation of duties tangible

Send the package to **Two-person approval**. Hold each attestation.

> The security control owner and treasury signer attest separately. Both approvals bind to the package hash. Cordant records the decision but does not pretend that approval equals execution.

> This supports the two-person rule while preserving a clear boundary between assurance, custody and transaction execution.

### 6:35–7:25 — Close with independent verification

Mark the package as externally submitted and run the verification sequence.

> After the custody platform executes, Cordant independently observes the transaction, decodes the instruction, checks the new authority, waits for finality and re-evaluates the policy.

Wait for **Control restored and independently verified**.

> The control closes only when observed state, finality and policy all agree. A successful external workflow is an input, not proof by itself.

### 7:25–8:00 — Expand to the product opportunity

Open **Authorities**.

> The incident is the entry point, but the product opportunity is portfolio-wide authority assurance: every high-impact capability continuously mapped to an owner, policy, approval path and fresh evidence.

> The differentiator is the complete loop: discover the mismatch, explain it with bounded AI, prepare a controlled response, preserve human accountability and independently prove restoration.

## Smart build process

If Ira asks how the prototype was built, use this two-minute explanation:

> I treated the prototype itself like a small product experiment. I began with three hypotheses: that Cordant could differentiate through identity-to-chain authority resolution, evidence-bounded AI and independent post-execution verification. I then looked for proven interaction patterns rather than inventing every UI convention.

Reference patterns used:

- incident.io for operational incident structure.
- Better Stack for the audit timeline.
- Vanta for expected-versus-observed permission matrices.
- AI research products for source-linked reasoning.
- Airwallex and financial approval flows for review, attestation and state progression.

> From those references I created a reusable component library and motion language. Solid lines represent verified relationships, dotted lines represent incomplete relationships, and motion shows evidence arriving or approvals binding. I built the complete happy path, then added deliberate failure behavior: uncertainty states, approval invalidation and read-only boundaries.

> Finally, I ran a separate review agent and a browser evaluation suite. The evaluations check horizontal overflow, clipped cards, evidence overlay collisions, keyboard focus during timeline scrubbing, workflow transitions and approval invalidation. The attached tooltip bug exposed a real issue: showing all evidence overlays at once created collisions. I changed the shortcut to reveal evidence markers while keeping one contextual tooltip open at a time, and added that condition to the regression suite.

This demonstrates a repeatable build loop:

**Hypothesis → domain model → reference patterns → reusable system → working flow → independent review → rendered evaluations → repair.**

## Product decisions to emphasize

### Why blockchain belongs in the story

The interesting problem is not crypto analytics. It is the mismatch between off-chain organizational controls and on-chain authority. The chain supplies deterministic state, but Cordant supplies organizational meaning and control context.

### Why AI belongs in the story

AI is useful for resolving heterogeneous evidence, reconstructing lifecycle failures and drafting a remediation package. Deterministic checks should establish final state. AI should not manufacture certainty or execute a material transaction.

### Why Cordant remains read-only

Keeping assurance separate from execution reduces privilege, supports existing custody controls and makes independent verification credible. It also creates a safer adoption path for regulated institutions.

### What makes this defensible

The value compounds in the identity-key-authority graph, evidence lineage, control mappings and feedback from resolved exceptions. The interface is helpful, but the durable asset is the continuously reconciled control model.

## Success metrics

- Percentage of material authorities mapped to accountable identities and policies.
- Median evidence age for critical controls.
- Time from authority mismatch to qualified investigation.
- Time from approved remediation to independently verified restoration.
- Percentage of AI claims with directly inspectable evidence.
- False-positive and analyst-overturn rates.
- Exceptions prevented from closing without final-state evidence.

## Likely Ira questions

### Does Cordant currently support this?

> I am presenting it as a hypothesis. I used the partner ecosystem and Cordant's assurance model as a starting point, then chose blockchain authority because it stress-tests the product across identity, custody, policy and external state.

### Why not use a blockchain analytics vendor?

> Analytics vendors can explain addresses and transactions. This workflow asks a different question: does the observed authority correspond to the approved organizational identity, policy and control lifecycle? Cordant can connect those domains and preserve the evidence chain.

### What can go wrong?

> Identity-to-key resolution can be incomplete, RPC evidence can become stale, finality differs by network, and a chain reorganization can change confidence. The product should expose freshness and uncertainty, require human approval and move a control backward if evidence is invalidated.

### What would you build first?

> I would start with read-only authority inventory and reconciliation for one custody partner and one network. The first measurable value is finding material authorities with missing owners, stale identities or policy mismatches. Remediation packaging comes after customers trust the evidence graph.

### How would you validate demand?

> Interview security, treasury and compliance owners around their last authority rotation or employee offboarding incident. Then run a design-partner audit using read-only exports and compare Cordant's findings with their existing access reviews and custody tickets.

### Why would customers trust the AI?

> They should not need to trust a hidden model. They should inspect sources, see the distinction between verified and inferred claims, understand freshness and reproduce the deterministic verification independently.

## Questions to ask Ira

1. Where does Cordant currently draw the boundary between continuous assurance and operational remediation?
2. Which evidence gaps create the most analyst work for customers today: ownership, freshness, policy mapping or cross-system reconciliation?
3. How does the product team measure whether AI reduces investigation time without increasing false confidence?
4. Do customers think in individual controls, end-to-end operational lifecycles or both?
5. Which partner integrations have produced the most unexpected product opportunities?

## Demo safety checklist

- Start on **Investigate** and refresh before the interview.
- Keep browser zoom at 100%.
- Rehearse the eight-minute version twice and a three-minute compressed version once.
- State that blockchain support is a hypothesis within the first minute.
- Do not spend time explaining every visual detail.
- Pause after the timeline contradiction and after independent verification.
- If an interaction fails, continue the narrative using the persistent progress rail.
- End with the product thesis and one question for Ira.

