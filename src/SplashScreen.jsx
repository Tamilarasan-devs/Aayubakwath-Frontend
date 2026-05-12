import { useState, useEffect } from "react";
import logo from './assets/images/logo.jpg'

const LETTERS = "Aayubakwath".split("");

export default function SplashScreen({ onFinish } = {}) {
  const [logoAnim, setLogoAnim] = useState(false);
  const [letterVisible, setLetterVisible] = useState([]);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [particlesVisible, setParticlesVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setParticlesVisible(true), 200);
    const t2 = setTimeout(() => setLogoAnim(true), 500);
    const t3 = setTimeout(() => {
      LETTERS.forEach((_, i) => {
        setTimeout(() => setLetterVisible(prev => [...prev, i]), i * 75);
      });
    }, 1300);
    const t4 = setTimeout(() => setTaglineVisible(true), 3000);
    const t5 = setTimeout(() => setFadeOut(true), 4600);
    const t6 = setTimeout(() => setDone(true), 5400);
    return () => [t1, t2, t3, t4, t5, t6].forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (done && typeof onFinish === 'function') {
      setTimeout(() => onFinish(), 10);
    }
  }, [done, onFinish]);

  if (done) {
    if (typeof onFinish === 'function') return null;
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "100vh", background: "#ffffff",
        fontFamily: "var(--font-body)",
        fontSize: 22, color: "var(--color-text)", letterSpacing: "0.15em"
      }}>
        Aayubakwath
      </div>
    );
  }

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: 3 + (i % 4) * 2,
    left: `${6 + (i * 4.7) % 88}%`,
    top: `${8 + (i * 7.1) % 82}%`,
    delay: `${(i * 0.2) % 2.2}s`,
    duration: `${3 + (i % 4)}s`,
    color: i % 3 === 0 ? "#5A6E52" : i % 3 === 1 ? "#B8A68C" : "#9A9A9A",
    opacity: 0.08 + (i % 5) * 0.03,
  }));

  return (
    <>
      <style>{`
        @keyframes floatDot {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-16px) rotate(12deg); }
        }
        @keyframes loadFill {
          from { width: 0% }
          to { width: 100% }
        }
        @keyframes spinOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.03); }
        }
      `}</style>
      <div style={{
        position: "fixed", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "#ffffff",
        overflow: "hidden",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.8s ease",
        zIndex: 9999,
      }}>

        <div style={{
          position: "absolute",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(90,110,82,0.06) 0%, rgba(90,110,82,0.02) 50%, transparent 72%)",
          transform: `scale(${logoAnim ? 1 : 0.2})`,
          transition: "transform 1.4s cubic-bezier(0.34,1.56,0.64,1)",
          pointerEvents: "none",
        }} />

        <svg style={{
          position: "absolute", width: "100%", height: "100%",
          pointerEvents: "none",
          opacity: logoAnim ? 0.04 : 0,
          transition: "opacity 1.5s ease 0.8s",
        }} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <circle cx="400" cy="300" r="220" stroke="#5A6E52" strokeWidth="1" fill="none" />
          <circle cx="400" cy="300" r="175" stroke="#B8A68C" strokeWidth="0.8" fill="none" />
          <circle cx="400" cy="300" r="290" stroke="#9A9A9A" strokeWidth="0.6" fill="none" />
          <circle cx="400" cy="300" r="340" stroke="#5A6E52" strokeWidth="0.4" fill="none" />
        </svg>

        <div style={{
          position: "absolute",
          width: 300, height: 300,
          borderRadius: "50%",
          border: "1px dashed rgba(90,110,82,0.1)",
          animation: logoAnim ? "spinOrbit 18s linear infinite" : "none",
          opacity: logoAnim ? 1 : 0,
          transition: "opacity 1s ease 1s",
        }}>
          <div style={{
            position: "absolute", top: -4, left: "50%", marginLeft: -4,
            width: 8, height: 8, borderRadius: "50%",
            background: "#B8A68C", opacity: 0.5,
          }} />
          <div style={{
            position: "absolute", bottom: -4, left: "50%", marginLeft: -4,
            width: 6, height: 6, borderRadius: "50%",
            background: "#9A9A9A", opacity: 0.5,
          }} />
        </div>

        {particles.map(p => (
          <div key={p.id} style={{
            position: "absolute",
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: particlesVisible ? p.opacity : 0,
            transition: `opacity 1.2s ease ${p.delay}`,
            animation: particlesVisible ? `floatDot ${p.duration} ease-in-out ${p.delay} infinite alternate` : "none",
          }} />
        ))}

        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>

          <div style={{
            width: 140, height: 112,
            marginBottom: 28,
            filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.08))",
            opacity: logoAnim ? 1 : 0,
            transform: logoAnim ? "scale(1) translateY(0)" : "scale(0.2) translateY(30px)",
            transition: "opacity 0.8s ease, transform 1s cubic-bezier(0.34,1.56,0.64,1)",
            animation: logoAnim ? "breathe 4s ease-in-out 2s infinite" : "none",
          }}>
            <img src={logo} alt="Aayubakwath Logo" className="rounded-xl" />
          </div>

          <div style={{ display: "flex", gap: 1, marginBottom: 20 }}>
            {LETTERS.map((letter, i) => (
              <span key={i} style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(24px, 4.5vw, 42px)",
                letterSpacing: "0.2em",
                color: "#1A1A1A",
                display: "inline-block",
                opacity: letterVisible.includes(i) ? 1 : 0,
                transform: letterVisible.includes(i) ? "translateY(0) scale(1)" : "translateY(20px) scale(0.7)",
                transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
              }}>
                {letter}
              </span>
            ))}
          </div>

          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: 16,
            opacity: taglineVisible ? 1 : 0,
            transform: taglineVisible ? "scaleX(1)" : "scaleX(0)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <div style={{ width: 48, height: 1, background: "linear-gradient(to right, transparent, #5A6E52, rgba(90,110,82,0.2))" }} />
            <svg width="16" height="16" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="2.5" fill="#B8A68C" />
              <circle cx="8" cy="8" r="5.5" stroke="#9A9A9A" strokeWidth="0.6" fill="none" />
              <circle cx="8" cy="8" r="7.5" stroke="#5A6E52" strokeWidth="0.3" fill="none" strokeDasharray="2,3" />
            </svg>
            <div style={{ width: 48, height: 1, background: "linear-gradient(to left, transparent, #5A6E52, rgba(90,110,82,0.2))" }} />
          </div>

          <p style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(12px, 2.2vw, 16px)",
            letterSpacing: "0.3em",
            color: "#5A6E52",
            opacity: taglineVisible ? 1 : 0,
            transform: taglineVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
            textTransform: "uppercase",
            margin: 0,
          }}>
            Nature · Wellness · Harmony
          </p>
        </div>

        <div style={{
          position: "absolute", bottom: 48,
          left: "50%", transform: "translateX(-50%)",
          width: 80, height: 2,
          background: "rgba(90,110,82,0.08)",
          borderRadius: 2, overflow: "hidden",
          opacity: taglineVisible ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(to right, #5A6E52, #B8A68C, #9A9A9A)",
            borderRadius: 2,
            animation: taglineVisible ? "loadFill 1.8s ease forwards" : "none",
          }} />
        </div>

        <div style={{
          position: "absolute", bottom: 28,
          fontFamily: "var(--font-body)",
          fontSize: 9, letterSpacing: "0.3em",
          color: "#9A9A9A", textTransform: "uppercase",
          opacity: taglineVisible ? 0.45 : 0,
          transition: "opacity 0.9s ease 0.5s",
        }}>
          Crafted with Care
        </div>
      </div>
    </>
  );
}