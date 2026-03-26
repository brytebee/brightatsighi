Role & Goal: You are an elite Frontend Engineer and UI/UX Designer. I need a complete, ground-up aesthetic and structural rewrite of my /lab/fintech page (and its associated components: RiskMetrics, TransactionStream, ComplianceAlerts). This page serves as an "AI Compliance & Fraud Detection Perimeter." The current UI is too flat and basic. I want a jaw-dropping, premium, and dynamic dashboard that feels like a state-of-the-art, high-stakes security console built for a hyper-growth fintech.

Design Aesthetics & Vibe:

Theme: "Cyber-Premium Dark Mode." The background should be deep obsidian (bg-[#050505]), elevated by massive, subtle, slow-breathing radial gradients in the background (using emerald and neon chartreuse).
Materials (Glassmorphism): Ditch standard solid cards. All panels should be translucent (bg-white/[0.02] or bg-black/40), featuring intense backdrop-blur-2xl, and framed by delicate 1px borders (border-white/[0.05]) that illuminate slightly (border-white/[0.15]) when hovered.
Color Palette:
Action/Accent: Neon Chartreuse/Volt (#ccff00) for primary buttons and active terminal states.
Success/Nominal: Cybernetic Emerald (#00e676).
Critical/Alert: Radiant Crimson (#ff3366) that actively pulses for unresolved threats.
Typography: Use a sleek, modern sans-serif (like Inter, Outfit, or Geist) for readable text, paired strictly with a crisp monospace font (like JetBrains Mono) for all metrics, transaction hashes, and system statuses.
Core Layout & Component Upgrades:

Sticky Header (Command Center):
Upgrade the "Trigger Burst" button to look like a high-tech tactical switch. It should feature a sweeping gradient hover effect, a pinging status dot, and satisfying click feedback.
Telemetry Pods (Risk Metrics):
Redesign the metrics row. Each metric card should feature glowing, oversized typography for the numbers. Include subtle animated details, like a slow-spinning ring or a glowing sparkline graph in the background of the card.
Main Grid (The Feed & The Perimeter):
Transaction Stream (Left): Transform this into a high-speed data ticker. Individual transaction rows should stagger into view. When hovered, the row should shift slightly to the right with a soft glow, revealing deeper metadata or action icons.
Alerts & Perimeter Status (Right): Critical alerts should demand attention with a pulsing crimson border. The Perimeter Status block should look like a monolithic, authentic terminal readout, featuring an animated striped progress bar for the "System Load."
Animations & Micro-Interactions (Crucial for the "Killer" feel):

Stagger the entry of all dashboard elements on page load so they float into place smoothly.
When a new transaction is generated via the "Trigger Burst" action, it should animate smoothly into the top of the stream without jarring layout shifts.
Override the default text selection color to match the theme: selection:bg-[#ccff00]/20 selection:text-[#ccff00].
Deliverables: Proceed to rewrite the

page.tsx
and all imported UI components. Do not give me minimalist placeholders. The code must be drop-in ready, fully responsive, and visually phenomenal.
