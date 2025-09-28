import { useState, useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

type PopoverPosition = "top" | "bottom" | "left" | "right";

interface PopoverProps {
  content?: ReactNode;
  position?: PopoverPosition;
  className?: string;
  children?: ReactNode;
}

export default function Popover({
  content,
  position = "top",
  className = "",
  children,
}: PopoverProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const popRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const applyTo: HTMLElement = document.getElementById("app-root")!;
  const margin = 8;

  const positionTransform: Record<PopoverPosition, string> = {
    top: "translate(-50%,-100%)",
    bottom: "translate(-50%,0)",
    left: "translate(-100%,-50%)",
    right: "translate(0,-50%)",
  };

  function computeCoords() {
    const trg = triggerRef.current;
    if (!trg) return { left: 0, top: 0, transform: positionTransform[position] };
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

  function toggle(e: any) {
    if (!mounted) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible((prev) => !prev);
    }
    e.stopPropagation();
  }

  useEffect(() => {
    const el = popRef.current;
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
    if (!mounted) return;
    function update() {
      const coords = computeCoords();
      if (popRef.current) {
        popRef.current.style.left = `${coords.left}px`;
        popRef.current.style.top = `${coords.top}px`;
        popRef.current.style.transform = coords.transform;
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
    <div className="group relative">
      <div ref={triggerRef} onClick={toggle} className={mergedClasses}>
        {children}
      </div>

      {applyTo && mounted &&
        createPortal(
          <div
            ref={popRef}
            style={{ position: "fixed", left: 0, top: 0, transform: positionTransform[position] }}
            className={`${visible ? "opacity-100" : "opacity-0"} z-[2000] transition-opacity duration-200`}
          >
            {content}
          </div>,
          applyTo,
        )}
    </div>
  );
}
