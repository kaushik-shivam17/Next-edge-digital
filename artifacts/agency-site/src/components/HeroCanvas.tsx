import { useEffect, useRef } from "react";

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    const isMobile = window.innerWidth < 768;
    const CONNECTION_DIST = isMobile ? 90 : 130;
    const MOUSE_DIST = isMobile ? 0 : 160;
    const COUNT = isMobile ? 25 : 70;
    const CONN_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
    const MOUSE_DIST_SQ = MOUSE_DIST * MOUSE_DIST;
    const goldR = 202, goldG = 163, goldB = 83;

    const px = new Float32Array(COUNT);
    const py = new Float32Array(COUNT);
    const pvx = new Float32Array(COUNT);
    const pvy = new Float32Array(COUNT);
    const psize = new Float32Array(COUNT);
    const popacity = new Float32Array(COUNT);
    const ppulse = new Float32Array(COUNT);
    const ppulseSpeed = new Float32Array(COUNT);

    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();

    for (let i = 0; i < COUNT; i++) {
      px[i] = Math.random() * W;
      py[i] = Math.random() * H;
      pvx[i] = (Math.random() - 0.5) * 0.25;
      pvy[i] = (Math.random() - 0.5) * 0.25;
      psize[i] = Math.random() * 1.4 + 0.4;
      popacity[i] = Math.random() * 0.4 + 0.1;
      ppulse[i] = Math.random() * Math.PI * 2;
      ppulseSpeed[i] = 0.008 + Math.random() * 0.012;
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    canvas.addEventListener("mousemove", onMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize, { passive: true });

    const CELL_SIZE = CONNECTION_DIST;

    const draw = () => {
      if (document.hidden) {
        animId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (let i = 0; i < COUNT; i++) {
        px[i] += pvx[i];
        py[i] += pvy[i];
        ppulse[i] += ppulseSpeed[i];

        if (px[i] < 0) px[i] = W;
        else if (px[i] > W) px[i] = 0;
        if (py[i] < 0) py[i] = H;
        else if (py[i] > H) py[i] = 0;

        if (MOUSE_DIST > 0) {
          const ddx = mx - px[i];
          const ddy = my - py[i];
          const distSq = ddx * ddx + ddy * ddy;
          if (distSq < MOUSE_DIST_SQ && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (MOUSE_DIST - dist) / MOUSE_DIST;
            pvx[i] -= (ddx / dist) * force * 0.06;
            pvy[i] -= (ddy / dist) * force * 0.06;
          }
        }
        pvx[i] *= 0.99;
        pvy[i] *= 0.99;

        const pulsed = popacity[i] * (0.7 + 0.3 * Math.sin(ppulse[i]));
        ctx.beginPath();
        ctx.arc(px[i], py[i], psize[i], 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${goldR},${goldG},${goldB},${pulsed.toFixed(2)})`;
        ctx.fill();
      }

      const cellsX = Math.ceil(W / CELL_SIZE) + 1;
      const grid = new Map<number, number[]>();

      for (let i = 0; i < COUNT; i++) {
        const cx = Math.floor(px[i] / CELL_SIZE);
        const cy = Math.floor(py[i] / CELL_SIZE);
        const key = cx + cy * cellsX;
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key)!.push(i);
      }

      ctx.lineWidth = 0.6;
      for (let i = 0; i < COUNT; i++) {
        const cx = Math.floor(px[i] / CELL_SIZE);
        const cy = Math.floor(py[i] / CELL_SIZE);

        for (let ncx = cx - 1; ncx <= cx + 1; ncx++) {
          for (let ncy = cy - 1; ncy <= cy + 1; ncy++) {
            const neighbors = grid.get(ncx + ncy * cellsX);
            if (!neighbors) continue;
            for (const j of neighbors) {
              if (j <= i) continue;
              const dx = px[i] - px[j];
              const dy = py[i] - py[j];
              const dSq = dx * dx + dy * dy;
              if (dSq < CONN_DIST_SQ) {
                const alpha = (1 - Math.sqrt(dSq) / CONNECTION_DIST) * 0.12;
                ctx.beginPath();
                ctx.moveTo(px[i], py[i]);
                ctx.lineTo(px[j], py[j]);
                ctx.strokeStyle = `rgba(${goldR},${goldG},${goldB},${alpha.toFixed(2)})`;
                ctx.stroke();
              }
            }
          }
        }

        if (MOUSE_DIST > 0) {
          const mdx = mx - px[i];
          const mdy = my - py[i];
          const mdSq = mdx * mdx + mdy * mdy;
          if (mdSq < MOUSE_DIST_SQ) {
            const alpha = (1 - Math.sqrt(mdSq) / MOUSE_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(px[i], py[i]);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(${goldR},${goldG},${goldB},${alpha.toFixed(2)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.lineWidth = 0.6;
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.7 }}
    />
  );
}
