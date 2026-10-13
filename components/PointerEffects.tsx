"use client";

import { useEffect } from "react";

// One document-level listener feeds CSS variables; all visuals live in globals.css.
//   --px / --py  pointer position in the viewport, 0..1 (background drift)
//   --cx / --cy  pointer position in the viewport, in px (cursor glow)
//   --mx / --my  pointer position inside the hovered .glass panel, in px (spotlight)
//   --tx / --ty  pointer offset inside a [data-tilt] element, -0.5..0.5 (tilt)
export default function PointerEffects() {
  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const root = document.documentElement;
    let frame = 0;
    let tilted: HTMLElement | null = null;

    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.dataset.pointer = "";
        root.style.setProperty("--cx", `${event.clientX}px`);
        root.style.setProperty("--cy", `${event.clientY}px`);
        root.style.setProperty("--px", String(event.clientX / window.innerWidth));
        root.style.setProperty("--py", String(event.clientY / window.innerHeight));

        const target = event.target instanceof Element ? event.target : null;

        const panel = target?.closest<HTMLElement>(".glass");
        if (panel) {
          const rect = panel.getBoundingClientRect();
          panel.style.setProperty("--mx", `${event.clientX - rect.left}px`);
          panel.style.setProperty("--my", `${event.clientY - rect.top}px`);
        }

        const tilt = target?.closest<HTMLElement>("[data-tilt]") ?? null;
        if (tilted && tilted !== tilt) {
          tilted.style.removeProperty("--tx");
          tilted.style.removeProperty("--ty");
        }
        if (tilt) {
          const rect = tilt.getBoundingClientRect();
          tilt.style.setProperty("--tx", String((event.clientX - rect.left) / rect.width - 0.5));
          tilt.style.setProperty("--ty", String((event.clientY - rect.top) / rect.height - 0.5));
        }
        tilted = tilt;
      });
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div aria-hidden="true" className="cursor-glow">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
