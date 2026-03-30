import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Intelligence Briefing";
  const category = searchParams.get("category") ?? "intel";
  const seed = parseInt(searchParams.get("seed") ?? "1", 10);

  // Deterministic accent color from seed
  const accents = ["#ccff00", "#00e676", "#00bcd4", "#a3ff57", "#39ff14"];
  const accent = accents[seed % accents.length];

  // Grid density from seed
  const cellSize = 40 + (seed % 3) * 10;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#050505",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0",
          fontFamily: "monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: `${cellSize}px ${cellSize}px`,
          }}
        />

        {/* Radial glow top-left */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
          }}
        />

        {/* Radial glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
          }}
        />

        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />

        {/* NODE ID label */}
        <div
          style={{
            position: "absolute",
            top: "32px",
            left: "48px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: accent,
              boxShadow: `0 0 12px ${accent}`,
            }}
          />
          <span
            style={{
              color: accent,
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: "900",
            }}
          >
            BRYTEBEE INTELLIGENCE // CLASSIFIED
          </span>
        </div>

        {/* Category badge top-right */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            right: "48px",
            padding: "6px 14px",
            border: `1px solid ${accent}40`,
            color: `${accent}cc`,
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          {category.replace(/-/g, "_").toUpperCase()}
        </div>

        {/* Bottom gradient overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "300px",
            background:
              "linear-gradient(to top, #050505 40%, transparent 100%)",
          }}
        />

        {/* Corner marks */}
        {[
          { top: "60px", left: "48px" },
          { top: "60px", right: "48px" },
          { bottom: "48px", left: "48px" },
          { bottom: "48px", right: "48px" },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              width: "20px",
              height: "20px",
              borderTop: i < 2 ? `1px solid ${accent}40` : undefined,
              borderBottom: i >= 2 ? `1px solid ${accent}40` : undefined,
              borderLeft: i % 2 === 0 ? `1px solid ${accent}40` : undefined,
              borderRight: i % 2 === 1 ? `1px solid ${accent}40` : undefined,
            }}
          />
        ))}

        {/* Main title text */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            padding: "0 48px 48px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              height: "1px",
              background: `linear-gradient(90deg, ${accent}60, transparent)`,
              marginBottom: "8px",
              width: "120px",
            }}
          />
          <div
            style={{
              fontSize:
                title.length > 80
                  ? "32px"
                  : title.length > 50
                  ? "42px"
                  : "52px",
              fontWeight: "900",
              color: "#ffffff",
              lineHeight: 1.1,
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              marginTop: "8px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "#666",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              SYNTHESIZED BY ARCHITECT-AGENT
            </span>
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: accent,
              }}
            />
            <span
              style={{
                fontSize: "10px",
                color: accent,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: "900",
              }}
            >
              LIVE FEED
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
