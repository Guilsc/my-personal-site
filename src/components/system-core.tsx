import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useLanguage } from "../lib/i18n";

/** Decorative system diagram. No telemetry, microphone, or assistant connection. */
export function SystemCore() {
  const { language } = useLanguage();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const context = element.getContext("2d");
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;
    let width = 600;
    let phase = 0;
    let last = 0;
    const draw = () => {
      const c = context;
      c.clearRect(0, 0, width, width);
      const scale = width / 600;
      c.save(); c.scale(scale, scale); c.translate(300, 300);
      const arc = (r: number, start: number, end: number, color: string, line = 1) => {
        c.beginPath(); c.strokeStyle = color; c.lineWidth = line;
        c.arc(0, 0, r, start, end); c.stroke();
      };
      for (const r of [72, 100, 142, 192, 246]) arc(r, 0, Math.PI * 2, "#28414c");
      c.strokeStyle = "#21343f"; c.lineWidth = 1;
      for (let i = 0; i < 48; i++) {
        const a = i * Math.PI / 24;
        c.beginPath(); c.moveTo(Math.cos(a) * 239, Math.sin(a) * 239);
        c.lineTo(Math.cos(a) * (i % 4 ? 244 : 255), Math.sin(a) * (i % 4 ? 244 : 255)); c.stroke();
      }
      // Slow segmented orbit; the four connections are fixed, readable structure.
      for (let i = 0; i < 4; i++) {
        const a = i * Math.PI / 2 + phase * 0.06;
        arc(170, a, a + 0.58, "#70bca6", 3);
        arc(116, -a, -a + 0.85, "#b8d0d5", 1.5);
      }
      const nodes: Array<[number, number]> = [[-157,-157], [171,-119], [171,151], [-166,151]];
      nodes.forEach(([x, y], i) => {
        c.beginPath(); c.strokeStyle = i === 2 ? "#d5b26e" : "#94dbbd";
        c.moveTo(x, y); c.lineTo(x * 0.58, y * 0.58);
        c.lineTo(x * 0.33, y * 0.58); c.lineTo(x * 0.2, y * 0.2); c.stroke();
        c.beginPath(); c.fillStyle = "#112733"; c.arc(x, y, 18, 0, Math.PI * 2); c.fill(); c.stroke();
        const pulse = reduced.matches || paused ? 0.7 : 0.55 + 0.35 * Math.sin(phase * 1.2 - i * 0.9);
        c.globalAlpha = pulse; c.beginPath(); c.fillStyle = i === 2 ? "#ebc47b" : "#b0efcf";
        c.arc(x, y, 4, 0, Math.PI * 2); c.fill(); c.globalAlpha = 1;
      });
      const breath = reduced.matches || paused ? 0 : Math.sin(phase * 0.8) * 3;
      arc(58 + breath, 0, Math.PI * 2, "#b0efcf", 2);
      arc(64 + breath, 0.1, 2.1, "#5d9486", 1);
      arc(64 + breath, 3.2, 5.2, "#5d9486", 1);
      c.restore();
    };
    const animate = (time: number) => {
      if (last && time - last >= 16) { phase += Math.min(time - last, 64) / 1000; last = time; draw(); }
      if (!last) last = time;
      frame = requestAnimationFrame(animate);
    };
    const sync = () => {
      cancelAnimationFrame(frame); frame = 0; last = 0; draw();
      if (visible && !document.hidden && !paused && !reduced.matches) frame = requestAnimationFrame(animate);
    };
    const resize = new ResizeObserver(() => {
      width = element.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      element.width = Math.round(width * dpr); element.height = Math.round(width * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
    });
    resize.observe(element);
    const intersection = new IntersectionObserver(([entry]) => { if (entry) visible = entry.isIntersecting; sync(); });
    intersection.observe(element);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); intersection.disconnect();
      reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, [paused]);
  return (
    <div className="system-diagram">
      <div className="system-orbit" aria-hidden="true">
        <canvas ref={canvas} width={600} height={600} />
        <span className="system-center">GC</span>
        <span className="system-node system-node-ba">Business<br />Analysis</span>
        <span className="system-node system-node-product">{language === "pt" ? "Produto" : "Product"}</span>
        <span className="system-node system-node-ai">{language === "pt" ? "IA aplicada" : "Applied AI"}</span>
        <span className="system-node system-node-qa">Systems<br />& QA</span>
      </div>
      <div className="system-diagram-footer">
        <p>{language === "pt" ? "Negócios, produto e tecnologia conectados." : "Business, product, and technology connected."}</p>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {language === "pt" ? paused ? "Retomar animação" : "Pausar animação" : paused ? "Resume animation" : "Pause animation"}
        </button>
      </div>
    </div>
  );
}
