'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './HeroIntro.module.css';

interface HeroIntroProps {
  onComplete: () => void;
  forcePlay?: boolean;
}

const NAME = 'Prince Baah-Mensah';

/* ── Verilog code lines ── */
const CODE_LINES = [
  { kw: 'module', kwC: '#c678dd', rest: ' Prince_Baah_Mensah (', restC: '#61afef' },
  { kw: '  input', kwC: '#e06c75', rest: '  wire        clk,', restC: '#e8e8ed' },
  { kw: '  input', kwC: '#e06c75', rest: '  wire        rst_n,', restC: '#e8e8ed' },
  { kw: '  output', kwC: '#e06c75', rest: ' reg  [7:0]  data_out,', restC: '#e8e8ed' },
  { kw: '  output', kwC: '#e06c75', rest: ' wire        valid', restC: '#e8e8ed' },
  { kw: ');', kwC: '#e8e8ed', rest: '', restC: '' },
  { kw: '', kwC: '', rest: '', restC: '' },
  { kw: 'reg', kwC: '#c678dd', rest: ' [4:0] idx;', restC: '#e8e8ed' },
  { kw: 'reg', kwC: '#c678dd', rest: ' [7:0] name_rom [0:17];', restC: '#e8e8ed' },
  { kw: '', kwC: '', rest: '', restC: '' },
  { kw: 'initial', kwC: '#c678dd', rest: ' begin', restC: '#e8e8ed' },
  { kw: '  ', kwC: '', rest: 'name_rom[0]  = "P";', restC: '#98c379' },
  { kw: '  ', kwC: '', rest: 'name_rom[1]  = "r";', restC: '#98c379' },
  { kw: '  ', kwC: '', rest: 'name_rom[2]  = "i";', restC: '#98c379' },
  { kw: '  // ... 18 chars loaded', kwC: '#5c6370', rest: '', restC: '' },
  { kw: 'end', kwC: '#c678dd', rest: '', restC: '' },
  { kw: '', kwC: '', rest: '', restC: '' },
  { kw: 'assign', kwC: '#c678dd', rest: ' valid = (idx < 18);', restC: '#e8e8ed' },
  { kw: '', kwC: '', rest: '', restC: '' },
  { kw: 'always', kwC: '#c678dd', rest: ' @(posedge clk) begin', restC: '#e8e8ed' },
  { kw: '  if', kwC: '#c678dd', rest: ' (!rst_n)', restC: '#e8e8ed' },
  { kw: '    ', kwC: '', rest: 'idx <= 0;', restC: '#61afef' },
  { kw: '  else if', kwC: '#c678dd', rest: ' (valid) begin', restC: '#e8e8ed' },
  { kw: '    ', kwC: '', rest: 'data_out <= name_rom[idx];', restC: '#61afef' },
  { kw: '    ', kwC: '', rest: 'idx      <= idx + 1;', restC: '#61afef' },
  { kw: '  end', kwC: '#c678dd', rest: '', restC: '' },
  { kw: 'end', kwC: '#c678dd', rest: '', restC: '' },
  { kw: 'endmodule', kwC: '#c678dd', rest: '', restC: '' },
];

/* ── Vivado terminal lines ── */
const TERM_LINES = [
  { text: 'vivado> read_verilog ./src/prince_display.v', color: '#e8e8ed', delay: 0 },
  { text: 'INFO: [filemgmt 56-3] Analyzing Verilog file "./src/prince_display.v" successfully.', color: '#98c379', delay: 20 },
  { text: 'vivado> synth_design -top Prince_Baah_Mensah -part xc7a35tcsg324-1', color: '#e8e8ed', delay: 45 },
  { text: 'WARNING: [Synth 8-3331] design Prince_Baah_Mensah has unconnected port led_out[7]', color: '#e5c07b', delay: 65 },
  { text: 'INFO: [Synth 8-638] synthesizing module \'Prince_Baah_Mensah\'', color: '#e8e8ed', delay: 85 },
  { text: 'INFO: [Synth 8-256] done synthesizing module \'Prince_Baah_Mensah\' (1#1)', color: '#98c379', delay: 110 },
  { text: '---------------------------------------------------------------------------------', color: '#5c6370', delay: 125 },
  { text: 'Part Resources  |  Used  |  Available  |  Utilization %', color: '#abb2bf', delay: 140 },
  { text: 'Slice LUTs      |    38  |      20800  |          0.18', color: '#abb2bf', delay: 155 },
  { text: 'Slice Registers |    54  |      41600  |          0.13', color: '#abb2bf', delay: 170 },
  { text: 'Block RAM       |     1  |         50  |          2.00', color: '#abb2bf', delay: 185 },
  { text: '---------------------------------------------------------------------------------', color: '#5c6370', delay: 200 },
  { text: 'vivado> place_design', color: '#e8e8ed', delay: 220 },
  { text: 'INFO: [Place 30-611] Multithreading enabled for place_design using 8 logical cores.', color: '#98c379', delay: 240 },
  { text: 'INFO: [Place 30-574] Place completed. WNS = 2.144 ns (Setup Met).', color: '#98c379', delay: 260 },
  { text: 'vivado> route_design', color: '#e8e8ed', delay: 280 },
  { text: 'INFO: [Route 35-16] Router completed successfully. WHS = 0.086 ns (Hold Met).', color: '#98c379', delay: 295 },
  { text: 'vivado> write_bitstream prince_baah_mensah.bit', color: '#e8e8ed', delay: 315 },
];

/* ── Subtitle text per phase ── */
const SUBTITLES = [
  'Designing the hardware...',
  'Building the chip...',
  'Verifying the output...',
];

export default function HeroIntro({ onComplete, forcePlay = false }: HeroIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('Phase 1/3 — RTL Design');

  const finish = useCallback(() => {
    setFadeOut(true);
    localStorage.setItem('heroIntroSeen', 'true');
    setTimeout(() => onComplete(), 650);
  }, [onComplete]);

  const skip = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    finish();
  }, [finish]);

  useEffect(() => {
    // Auto-skip for returning visitors (unless forced to play)
    if (!forcePlay && localStorage.getItem('heroIntroSeen') === 'true') {
      onComplete();
      return;
    }

    // Skip immediately if the user has OS-level reduced motion active
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // HiDPI setup
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width;
    const H = rect.height;

    const MONO = `${Math.max(10, Math.min(12, W * 0.012))}px JetBrains Mono, SF Mono, Fira Code, monospace`;
    const MONO_SM = `${Math.max(9, Math.min(11, W * 0.011))}px JetBrains Mono, SF Mono, Fira Code, monospace`;
    const MONO_XS = `${Math.max(8, Math.min(10, W * 0.009))}px JetBrains Mono, SF Mono, Fira Code, monospace`;

    // Phase timings (frames at 60fps) - adjusted for expanded logs
    const P1_END = 380;
    const P2_START = 390;
    const P2_END = 800;
    const P3_START = 820;
    const P3_END = 1200;

    // Pre-calc total code chars
    let totalCodeChars = 0;
    CODE_LINES.forEach(l => { totalCodeChars += l.kw.length + l.rest.length + 1; });
    const charsPerFrame = totalCodeChars / (P1_END - 20);

    let frame = 0;

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, W, H);

      // ═══ PHASE 1: CODE EDITOR ═══
      if (frame < P2_START) {
        const fadeAlpha = frame > P1_END ? Math.max(0, 1 - (frame - P1_END) / 10) : 1;
        ctx.globalAlpha = fadeAlpha;

        // Editor chrome
        ctx.fillStyle = '#111118';
        ctx.fillRect(0, 0, W, 28);
        ctx.font = MONO_XS;
        ctx.fillStyle = '#5c6370';
        ctx.fillText('  prince_display.v', 8, 17);
        ctx.fillStyle = '#e06c75'; ctx.beginPath(); ctx.arc(W - 40, 14, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#e5c07b'; ctx.beginPath(); ctx.arc(W - 28, 14, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#98c379'; ctx.beginPath(); ctx.arc(W - 16, 14, 4, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, 28); ctx.lineTo(W, 28); ctx.stroke();

        // Code content
        const totalCharsTyped = Math.floor(Math.min(frame, P1_END) * charsPerFrame);
        let charCount = 0;
        const lineH = Math.max(12, Math.min(14, H * 0.028));
        const codeY = 42;
        const codeX = 50;

        // Gutter
        ctx.strokeStyle = 'rgba(255,255,255,0.03)';
        ctx.beginPath(); ctx.moveTo(42, 30); ctx.lineTo(42, H); ctx.stroke();

        CODE_LINES.forEach((line, i) => {
          const fullText = line.kw + line.rest;
          const lineStart = charCount;
          charCount += fullText.length + 1;

          if (totalCharsTyped > lineStart && codeY + i * lineH < H - 60) {
            const vis = Math.min(totalCharsTyped - lineStart, fullText.length);

            // Line number
            ctx.font = MONO_XS;
            ctx.fillStyle = '#2a2a35';
            ctx.textAlign = 'right';
            ctx.fillText(String(i + 1), 36, codeY + i * lineH);
            ctx.textAlign = 'left';

            // Keyword
            ctx.font = MONO_SM;
            const kwLen = Math.min(vis, line.kw.length);
            if (kwLen > 0 && line.kwC) {
              ctx.fillStyle = line.kwC;
              ctx.fillText(line.kw.substring(0, kwLen), codeX, codeY + i * lineH);
            }

            // Rest
            if (vis > line.kw.length && line.rest) {
              const restLen = vis - line.kw.length;
              ctx.fillStyle = line.restC || '#e8e8ed';
              const kwW = ctx.measureText(line.kw).width;
              ctx.fillText(line.rest.substring(0, restLen), codeX + kwW, codeY + i * lineH);
            }

            // Cursor
            if (totalCharsTyped >= lineStart && totalCharsTyped <= lineStart + fullText.length) {
              const cursorText = fullText.substring(0, vis);
              const cx = codeX + ctx.measureText(cursorText).width;
              if (Math.floor(frame / 15) % 2 === 0) {
                ctx.fillStyle = '#4ecdc4';
                ctx.fillRect(cx, codeY + i * lineH - 9, 6, 12);
              }
            }
          }
        });

        // Compiled badge
        if (frame > P1_END - 15) {
          const a = Math.min((frame - (P1_END - 15)) / 15, 1);
          ctx.globalAlpha = a * fadeAlpha;
          ctx.font = MONO_XS;
          ctx.fillStyle = '#98c379';
          ctx.fillText('✓ Syntax OK — ready for synthesis', 50, H - 60);
          ctx.globalAlpha = fadeAlpha;
        }

        ctx.globalAlpha = 1;
      }

      // ═══ PHASE 2: BITSTREAM TERMINAL ═══
      if (frame >= P2_START && frame < P3_START) {
        const fadeIn = Math.min((frame - P2_START) / 15, 1);
        const fadeOut2 = frame > P2_END ? Math.max(0, 1 - (frame - P2_END) / 15) : 1;
        ctx.globalAlpha = fadeIn * fadeOut2;

        // Terminal chrome
        ctx.fillStyle = '#111118';
        ctx.fillRect(0, 0, W, 28);
        ctx.font = MONO_XS;
        ctx.fillStyle = '#5c6370';
        ctx.fillText('  Vivado TCL Console', 8, 17);
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, 28); ctx.lineTo(W, 28); ctx.stroke();

        // Terminal lines container with scrolling calculation
        const termY = 46;
        const lineH = Math.max(13, Math.min(16, H * 0.032));
        const maxLines = Math.floor((H - 145) / lineH);
        const p2Frame = frame - P2_START;

        // Filter lines that are ready to display
        const visibleLines = TERM_LINES.filter(tl => p2Frame > tl.delay);
        const startIndex = Math.max(0, visibleLines.length - maxLines);
        
        visibleLines.slice(startIndex).forEach((tl, index) => {
          const lineAlpha = Math.min((p2Frame - tl.delay) / 8, 1);
          ctx.globalAlpha = lineAlpha * fadeIn * fadeOut2;
          ctx.font = MONO_SM;
          ctx.fillStyle = tl.color;
          ctx.fillText(tl.text, 24, termY + index * lineH);
        });

        // Progress bar (positioned at the bottom to avoid overlaps)
        if (p2Frame > 330) {
          const barX = 24;
          const barY = H - 95;
          const barW = Math.min(W - 48, 600);
          const barH = 8;
          const pct = Math.min((p2Frame - 330) / 70, 1);

          ctx.globalAlpha = fadeIn * fadeOut2;
          ctx.fillStyle = '#1a1a24';
          ctx.beginPath(); ctx.roundRect(barX, barY, barW, barH, 4); ctx.fill();

          const grad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
          grad.addColorStop(0, '#4ecdc4');
          grad.addColorStop(1, '#7b68ee');
          ctx.fillStyle = grad;
          ctx.beginPath(); ctx.roundRect(barX, barY, barW * pct, barH, 4); ctx.fill();

          ctx.font = MONO_SM;
          ctx.fillStyle = '#888';
          ctx.textAlign = 'right';
          ctx.fillText(Math.floor(pct * 100) + '%', barX + barW, barY + 22);
          ctx.textAlign = 'left';

          if (pct >= 1) {
            ctx.font = MONO;
            ctx.fillStyle = '#98c379';
            ctx.fillText('✓ Bitstream generated: prince_baah_mensah.bit', 24, barY - 32);
            ctx.fillStyle = '#4ecdc4';
            ctx.fillText('JTAG> Programming device... Done.', 24, barY - 14);
          }
        }

        ctx.globalAlpha = 1;
      }

      // ═══ PHASE 3: WAVEFORM VIEWER ═══
      if (frame >= P3_START) {
        const fadeIn3 = Math.min((frame - P3_START) / 20, 1);
        ctx.globalAlpha = fadeIn3;

        // Chrome
        ctx.fillStyle = '#111118';
        ctx.fillRect(0, 0, W, 30);
        ctx.font = MONO_XS;
        ctx.fillStyle = '#5c6370';
        ctx.fillText('  Vivado ILA — Integrated Logic Analyzer', 8, 19);
        ctx.font = `${Math.max(7, W * 0.007)}px JetBrains Mono, monospace`;
        ctx.fillStyle = '#98c379';
        ctx.textAlign = 'right';
        ctx.fillText('● ARMED', W - 80, 13);
        ctx.fillStyle = '#4ecdc4';
        ctx.fillText('● TRIGGERED', W - 80, 24);
        ctx.textAlign = 'left';
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, 30); ctx.lineTo(W, 30); ctx.stroke();

        const waveFrame = frame - P3_START;
        const labelW = Math.max(60, Math.min(80, W * 0.08));
        const sigStart = labelW + 8;
        const sigEndMax = W - 15;
        const sweepX = sigStart + Math.min(waveFrame * 1.35, sigEndMax - sigStart);
        const segW = Math.max(8, Math.min(12, W * 0.012));

        // Grid
        ctx.strokeStyle = 'rgba(255,255,255,0.025)';
        ctx.lineWidth = 0.5;
        for (let x = sigStart; x < sigEndMax; x += 22) {
          ctx.beginPath(); ctx.moveTo(x, 34); ctx.lineTo(x, H - 60); ctx.stroke();
        }

        // Signals
        const signals = [
          { label: 'clk', y: 68, h: 22 },
          { label: 'rst_n', y: 115, h: 22 },
          { label: 'data[7:0]', y: 170, h: 26 },
          { label: 'valid', y: 225, h: 22 },
        ];

        // Labels panel
        ctx.fillStyle = '#0a0a12';
        ctx.fillRect(0, 30, labelW, H - 30);
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.beginPath(); ctx.moveTo(labelW, 30); ctx.lineTo(labelW, H); ctx.stroke();
        signals.forEach(sig => {
          ctx.font = MONO_SM;
          ctx.fillStyle = '#5c6370';
          ctx.fillText(sig.label, 6, sig.y + 3);
        });

        const sigEnd = Math.min(sweepX, sigEndMax);

        // CLK
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sigStart, signals[0].y + signals[0].h);
        for (let x = sigStart; x < sigEnd; x += segW) {
          const idx = Math.floor((x - sigStart) / segW);
          const hi = signals[0].y, lo = signals[0].y + signals[0].h;
          if (idx % 2 === 0) { ctx.lineTo(x, hi); ctx.lineTo(x + segW, hi); }
          else { ctx.lineTo(x, lo); ctx.lineTo(x + segW, lo); }
        }
        ctx.stroke();

        // RST_N
        ctx.strokeStyle = '#e06c75';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const rstHi = signals[1].y, rstLo = signals[1].y + signals[1].h;
        ctx.moveTo(sigStart, rstLo);
        for (let x = sigStart; x < sigEnd; x += segW) {
          const idx = Math.floor((x - sigStart) / segW);
          if (idx < 4) ctx.lineTo(x + segW, rstLo);
          else if (idx === 4) { ctx.lineTo(x, rstLo); ctx.lineTo(x, rstHi); ctx.lineTo(x + segW, rstHi); }
          else ctx.lineTo(x + segW, rstHi);
        }
        ctx.stroke();

        // DATA bus
        ctx.strokeStyle = '#61afef';
        ctx.lineWidth = 1.5;
        const busTop = signals[2].y, busMid = signals[2].y + signals[2].h / 2, busBot = signals[2].y + signals[2].h;
        ctx.beginPath();
        for (let x = sigStart; x < sigEnd; x += segW) {
          const idx = Math.floor((x - sigStart) / segW);
          if (idx < 6) {
            ctx.moveTo(x, busTop); ctx.lineTo(x + segW, busTop);
            ctx.moveTo(x, busBot); ctx.lineTo(x + segW, busBot);
          } else {
            const charIdx = Math.floor((idx - 6) / 2);
            if ((idx - 6) % 2 === 0 && charIdx < NAME.length) {
              ctx.moveTo(x, busTop); ctx.lineTo(x + 4, busMid); ctx.lineTo(x, busBot);
              ctx.moveTo(x, busBot); ctx.lineTo(x + 4, busMid);
            }
            ctx.moveTo(x, busTop); ctx.lineTo(x + segW, busTop);
            ctx.moveTo(x, busBot); ctx.lineTo(x + segW, busBot);
            if (charIdx < NAME.length && (idx - 6) % 2 === 1) {
              ctx.save();
              ctx.font = `${Math.max(7, segW * 0.7)}px JetBrains Mono, monospace`;
              ctx.fillStyle = 'rgba(97,175,239,0.5)';
              ctx.fillText('0x' + NAME.charCodeAt(charIdx).toString(16).toUpperCase(), x - segW + 2, busMid + 3);
              ctx.restore();
            }
          }
        }
        ctx.stroke();

        // VALID
        ctx.strokeStyle = '#98c379';
        ctx.lineWidth = 1.5;
        const vHi = signals[3].y, vLo = signals[3].y + signals[3].h;
        ctx.beginPath();
        ctx.moveTo(sigStart, vLo);
        for (let x = sigStart; x < sigEnd; x += segW) {
          const idx = Math.floor((x - sigStart) / segW);
          if (idx < 6) ctx.lineTo(x + segW, vLo);
          else if (idx === 6) { ctx.lineTo(x, vLo); ctx.lineTo(x, vHi); ctx.lineTo(x + segW, vHi); }
          else ctx.lineTo(x + segW, vHi);
        }
        ctx.stroke();

        // Sweep cursor
        if (sweepX < sigEndMax) {
          ctx.strokeStyle = 'rgba(78,205,196,0.3)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.beginPath(); ctx.moveTo(sweepX, 34); ctx.lineTo(sweepX, H - 60); ctx.stroke();
          ctx.setLineDash([]);
        }

        // Decode bar
        const decodeY = H - 50;
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, decodeY - 8); ctx.lineTo(W, decodeY - 8); ctx.stroke();

        const decodeStart = sigStart + 6 * segW;
        let decoded = '';
        for (let i = 0; i < NAME.length; i++) {
          if (decodeStart + i * 2 * segW < sigEnd) decoded += NAME[i];
        }

        ctx.font = MONO_SM;
        ctx.fillStyle = '#5c6370';
        ctx.fillText('Decode:', 8, decodeY + 5);

        if (decoded) {
          ctx.font = `bold ${Math.max(14, Math.min(18, W * 0.018))}px JetBrains Mono, monospace`;
          ctx.fillStyle = '#4ecdc4';
          ctx.shadowColor = 'rgba(78,205,196,0.3)';
          ctx.shadowBlur = 8;
          ctx.fillText(decoded, 70, decodeY + 7);
          ctx.shadowBlur = 0;

          if (decoded.length < NAME.length && Math.floor(frame / 12) % 2 === 0) {
            const tw = ctx.measureText(decoded).width;
            ctx.fillStyle = '#4ecdc4';
            ctx.fillRect(70 + tw + 2, decodeY - 6, 9, 16);
          }
        }

        // Completion
        if (decoded.length >= NAME.length) {
          const a = Math.min((sweepX - (decodeStart + NAME.length * 2 * segW)) / 40, 1);
          if (a > 0) {
            ctx.globalAlpha = a;
            ctx.font = MONO_XS;
            ctx.fillStyle = '#98c379';
            ctx.fillText('✓ Capture complete — 18 chars decoded, all assertions passed', 8, H - 15);
            ctx.globalAlpha = 1;
          }
        }

        ctx.globalAlpha = 1;
      }

      // ── Update subtitles & phase label via React state (throttled) ──
      if (frame % 10 === 0) {
        if (frame < P2_START) {
          setCurrentSubtitle(0);
          setCurrentPhase('Phase 1/3 — RTL Design');
        } else if (frame < P3_START) {
          setCurrentSubtitle(1);
          setCurrentPhase('Phase 2/3 — Synthesis & Programming');
        } else {
          setCurrentSubtitle(2);
          setCurrentPhase('Phase 3/3 — Logic Analyzer Capture');
        }
        setSubtitleVisible(true);
      }

      // Brief subtitle hide during phase transitions
      if (
        (frame > P1_END - 5 && frame < P2_START + 15) ||
        (frame > P2_END - 5 && frame < P3_START + 15)
      ) {
        setSubtitleVisible(false);
      }

      frame++;
      if (frame < P3_END) {
        animFrameRef.current = requestAnimationFrame(draw);
      } else {
        // Animation complete — trigger finish
        setTimeout(() => finish(), 400);
      }
    }

    // Small delay before starting so the canvas is fully mounted
    const startTimeout = setTimeout(() => {
      animFrameRef.current = requestAnimationFrame(draw);
    }, 100);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [onComplete, finish, forcePlay]);

  return (
    <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ''}`}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={`${styles.subtitle} ${subtitleVisible ? styles.visible : ''}`}>
        {SUBTITLES[currentSubtitle]}
      </div>
      <div className={styles.phaseIndicator}>{currentPhase}</div>
      <button className={styles.skipButton} onClick={skip}>
        Skip →
      </button>
    </div>
  );
}
