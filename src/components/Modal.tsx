import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

type ModalPosition = "center" | "top" | "bottom" | "left" | "right";

interface ModalProps {
  opened?: boolean;
  onClose?: () => void;
  position?: ModalPosition;
  className?: string;
  children?: ReactNode;
}

export default function Modal({
  opened = false,
  onClose = () => {},
  position = "center",
  className = "",
  children,
}: ModalProps) {
  const [mounted, setMounted] = useState(opened);
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const applyTo: HTMLElement = document.getElementById("app-root")!;

  const positionClasses: Record<ModalPosition, string> = {
    center: "scale-95",
    top: "origin-top -translate-y-[200%]",
    bottom: "origin-bottom translate-y-[200%]",
    left: "origin-left -translate-x-[200%]",
    right: "origin-right translate-x-[200%]",
  };

  const visiblePositionClasses: Record<ModalPosition, string> = {
    center: "scale-100",
    top: "translate-y-0",
    bottom: "translate-y-0",
    left: "translate-x-0",
    right: "translate-x-0",
  };

  useEffect(() => {
    if (opened) {
      setMounted(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true)),
      );
      return;
    }
    setVisible(false);
  }, [opened]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const backdrop = backdropRef.current;
    if (!dialog || !backdrop) return;

    const finished = { dialog: false, backdrop: false };

    function checkDone() {
      if (!visible && finished.dialog && finished.backdrop) {
        setMounted(false);
      }
    }

    function onDialogEnd(e: TransitionEvent) {
      if (e.propertyName === "opacity" || e.propertyName === "transform") {
        finished.dialog = true;
        checkDone();
      }
    }

    function onBackdropEnd(e: TransitionEvent) {
      if (e.propertyName === "opacity") {
        finished.backdrop = true;
        checkDone();
      }
    }

    dialog.addEventListener("transitionend", onDialogEnd);
    backdrop.addEventListener("transitionend", onBackdropEnd);

    return () => {
      dialog.removeEventListener("transitionend", onDialogEnd);
      backdrop.removeEventListener("transitionend", onBackdropEnd);
    };
  }, [visible]);

  useEffect(() => {
    if (!opened) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [opened, onClose]);

  useEffect(() => {
    if (!mounted) return;
    function onDocPointerDown(e: Event) {
      const target = e.target as Node | null;
      if (!dialogRef.current) return;
      if (!dialogRef.current.contains(target as Node)) {
        onClose();
      }
    }
    document.addEventListener(
      "pointerdown",
      onDocPointerDown as EventListener,
      true,
    );
    return () =>
      document.removeEventListener(
        "pointerdown",
        onDocPointerDown as EventListener,
        true,
      );
  }, [mounted, onClose]);

  if (!mounted) return null;

  const mergedClasses = twMerge(`m-0 flex h-auto w-auto transform p-0 align-top transition duration-300 ${visible ? "opacity-100" : "opacity-0"} ${visible ? visiblePositionClasses[position] : positionClasses[position]}`, className);

  return createPortal(
    <div className="fixed inset-0 z-[1000]">
      <div
        ref={backdropRef}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="relative flex h-full w-full">
        <div
          ref={dialogRef}
          className={mergedClasses}
        >
          {children}
        </div>
      </div>
    </div>,
    applyTo,
  );
}
