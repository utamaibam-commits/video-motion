import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const ACCENT = "#38bdf8";
const ACCENT2 = "#a78bfa";

const FadeUp: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * 60}px)` }}>
      {children}
    </div>
  );
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", textAlign: "center", padding: 80 }}
    >
      <div style={{ fontSize: 320, fontWeight: 900, color: ACCENT, transform: `scale(${scale})`, lineHeight: 1 }}>
        2026
      </div>
      <FadeUp delay={20}>
        <div style={{ fontSize: 76, fontWeight: 800, color: "white" }}>
          AI berkembang makin
        </div>
      </FadeUp>
      <FadeUp delay={35}>
        <div style={{ fontSize: 140, fontWeight: 900, color: ACCENT2 }}>GILA!</div>
      </FadeUp>
    </AbsoluteFill>
  );
};

const items = [
  "Model AI makin pintar",
  "Bisa bikin gambar & video",
  "Jadi agen yang kerja sendiri",
];

const Points: React.FC = () => (
  <AbsoluteFill style={{ justifyContent: "center", padding: 80, gap: 50 }}>
    <FadeUp>
      <div style={{ fontSize: 70, color: ACCENT, fontWeight: 800 }}>Yang berubah:</div>
    </FadeUp>
    {items.map((t, i) => (
      <FadeUp key={t} delay={20 + i * 25}>
        <div
          style={{
            fontSize: 66,
            fontWeight: 800,
            color: "white",
            background: "rgba(255,255,255,0.08)",
            padding: "40px 50px",
            borderRadius: 30,
            borderLeft: `16px solid ${ACCENT2}`,
          }}
        >
          {t}
        </div>
      </FadeUp>
    ))}
  </AbsoluteFill>
);

const Chart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const values = [15, 25, 38, 55, 78, 100];
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
      <FadeUp>
        <div style={{ fontSize: 70, fontWeight: 800, color: "white", textAlign: "center", marginBottom: 80 }}>
          Lajunya makin ngebut
        </div>
      </FadeUp>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 30, height: 700 }}>
        {values.map((v, i) => {
          const p = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 200 } });
          return (
            <div
              key={i}
              style={{
                width: 120,
                height: v * 7 * p,
                borderRadius: 20,
                background: `linear-gradient(${ACCENT2}, ${ACCENT})`,
              }}
            />
          );
        })}
      </div>
      <div style={{ fontSize: 36, color: "#94a3b8", marginTop: 40 }}>*ilustrasi</div>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center", padding: 80, gap: 30 }}>
    <FadeUp>
      <div style={{ fontSize: 86, fontWeight: 900, color: "white" }}>Siapa cepat belajar AI,</div>
    </FadeUp>
    <FadeUp delay={20}>
      <div style={{ fontSize: 110, fontWeight: 900, color: ACCENT }}>dia yang menang.</div>
    </FadeUp>
    <FadeUp delay={45}>
      <div style={{ fontSize: 48, color: "#94a3b8", marginTop: 40 }}>
        Ikuti untuk update AI terbaru
      </div>
    </FadeUp>
  </AbsoluteFill>
);

export const AIMotion: React.FC = () => {
  const frame = useCurrentFrame();
  const angle = interpolate(frame, [0, 450], [0, 360]);
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${angle}deg, #0b1020, #1e1b4b)`,
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <Sequence from={0} durationInFrames={90}><Intro /></Sequence>
      <Sequence from={90} durationInFrames={150}><Points /></Sequence>
      <Sequence from={240} durationInFrames={120}><Chart /></Sequence>
      <Sequence from={360} durationInFrames={90}><Outro /></Sequence>
    </AbsoluteFill>
  );
};
