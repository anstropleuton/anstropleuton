import { useState, useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content?: ReactNode;
  position?: TooltipPosition;
  className?: string;
  children?: ReactNode;
}

export default function Tooltip({
  content,
  position = "top",
  className = "",
  children,
}: TooltipProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const ttRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const isHoverCapable = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  const showTimeoutRef = useRef<number | null>(null);
  const applyTo: HTMLElement = document.getElementById("app-root")!;
  const margin = 8;

  const positionTransform: Record<TooltipPosition, string> = {
    top: "translate(-50%,-100%)",
    bottom: "translate(-50%,0)",
    left: "translate(-100%,-50%)",
    right: "translate(0,-50%)",
  };

  function computeCoords() {
    const trg = triggerRef.current;
    if (!trg)
      return { left: 0, top: 0, transform: positionTransform[position] };
    const rect = trg.getBoundingClientRect();
    let left = rect.left + rect.width / 2;
    let top = rect.top + rect.height / 2;
    if (position === "top") {
      left = rect.left + rect.width / 2;
      top = rect.top - margin;
    } else if (position === "bottom") {
      left = rect.left + rect.width / 2;
      top = rect.bottom + margin;
    } else if (position === "left") {
      left = rect.left - margin;
      top = rect.top + rect.height / 2;
    } else if (position === "right") {
      left = rect.right + margin;
      top = rect.top + rect.height / 2;
    }
    return { left, top, transform: positionTransform[position] };
  }

  function show() {
    if (!isHoverCapable) return;
    if (showTimeoutRef.current || mounted) return;
    showTimeoutRef.current = window.setTimeout(() => {
      showTimeoutRef.current = null;
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    }, 700);
  }

  function hide() {
    if (!isHoverCapable) return;
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
      return;
    }
    setVisible(false);
  }

  useEffect(() => {
    const el = ttRef.current;
    if (!el) return;
    function onTransitionEnd(e: TransitionEvent) {
      if (e.propertyName === "opacity" && !visible) {
        setMounted(false);
      }
    }
    el.addEventListener("transitionend", onTransitionEnd);
    return () => el.removeEventListener("transitionend", onTransitionEnd);
  }, [visible]);

  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
        showTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    function update() {
      const coords = computeCoords();
      if (ttRef.current) {
        ttRef.current.style.left = `${coords.left}px`;
        ttRef.current.style.top = `${coords.top}px`;
        ttRef.current.style.transform = coords.transform;
      }
    }
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [mounted, position]);

  const mergedClasses = twMerge(`flex`, className);

  return (
    <div className={`group relative`}>
      <div
        ref={triggerRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        className={mergedClasses}
      >
        {children}
      </div>

      {applyTo &&
        mounted &&
        createPortal(
          <div
            ref={ttRef}
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              transform: positionTransform[position],
            }}
            className={`${visible ? "opacity-100" : "opacity-0"} z-[3000] cursor-default rounded-xl border-2 border-neutral-200 bg-white p-2 text-sm whitespace-nowrap text-black transition-[opacity,background-color,border-color,text-color] duration-200 dark:border-neutral-800 dark:bg-black dark:text-white`}
          >
            {content}
          </div>,
          applyTo,
        )}
    </div>
  );
}
