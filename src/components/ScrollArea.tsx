import {
  useEffect,
  useRef,
  useState,
  Children,
  isValidElement,
  cloneElement,
  type ReactNode,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Button from "./Button";

export function HorizontalScrollArea({ children }: { children: ReactNode }) {
  const scrollElRef = useRef<HTMLDivElement | null>(null);

  const [showHorizBtns, setShowHorizBtns] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const childCount = Children.count(children);
  const hasChildren = childCount > 0;

  useEffect(() => {
    const el = scrollElRef.current;
    if (!el) return;

    function check() {
      if (!el) return;
      setShowHorizBtns(el.scrollWidth > el.clientWidth + 1);
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }

    check();

    const ro = new ResizeObserver(check);
    ro.observe(el);

    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [childCount]);

  function scrollHorizontal(dir: "left" | "right") {
    const el = scrollElRef.current;
    if (!el) return;
    const amt = Math.round(el.clientWidth * 0.7);
    el.scrollBy({ left: dir === "left" ? -amt : amt, behavior: "smooth" });
  }

  let clonedChild: ReactNode = null;
  if (hasChildren) {
    const only = Children.only(children);
    if (isValidElement(only)) {
      const existingClass = (only.props && only.props.className) || "";
      const mergedClass = `${existingClass} no-scrollbar overflow-x-auto overflow-y-auto`;
      clonedChild = cloneElement(only as any, {
        ref: scrollElRef,
        className: mergedClass,
        style: { ...(only.props?.style || {}) },
      });
    } else {
      clonedChild = only;
    }
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {showHorizBtns && (
        <button onClick={() => scrollHorizontal("left")}>
          <Button
            className="rounded-xl px-1 py-2"
            style="transparent"
            uninteractable={!canScrollLeft}
          >
            <ChevronLeft
              className={`h-6 w-6 ${!canScrollLeft ? "text-transparent" : ""}`}
            />
          </Button>
        </button>
      )}
      <div
        className={`no-scrollbar flex w-full gap-2 overflow-hidden transition-all ${
          canScrollLeft
            ? "mask-l-from-white mask-l-from-90% mask-l-to-transparent"
            : ""
        } ${canScrollRight ? "mask-r-from-white mask-r-from-90% mask-r-to-transparent" : ""}`}
      >
        {clonedChild}
      </div>
      {showHorizBtns && (
        <button onClick={() => scrollHorizontal("right")}>
          <Button
            className="rounded-xl px-1 py-2"
            style="transparent"
            uninteractable={!canScrollRight}
          >
            <ChevronRight
              className={`h-6 w-6 ${!canScrollRight ? "text-transparent" : ""}`}
            />
          </Button>
        </button>
      )}
    </div>
  );
}

export function VerticalScrollArea({ children }: { children: ReactNode }) {
  const scrollElRef = useRef<HTMLDivElement | null>(null);

  const [showVertBtns, setShowVertBtns] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const childCount = Children.count(children);
  const hasChildren = childCount > 0;

  useEffect(() => {
    const el = scrollElRef.current;
    if (!el) return;

    function check() {
      if (!el) return;
      setShowVertBtns(el.scrollHeight > el.clientHeight + 1);
      setCanScrollUp(el.scrollTop > 0);
      setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
    }

    check();

    const ro = new ResizeObserver(check);
    ro.observe(el);

    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [childCount]);

  function scrollVertical(dir: "up" | "down") {
    const el = scrollElRef.current;
    if (!el) return;
    const amt = Math.round(el.clientHeight * 0.7);
    el.scrollBy({ top: dir === "up" ? -amt : amt, behavior: "smooth" });
  }

  let clonedChild: ReactNode = null;
  if (hasChildren) {
    const only = Children.only(children);
    if (isValidElement(only)) {
      const existingClass = (only.props && only.props.className) || "";
      const mergedClass = `${existingClass} no-scrollbar overflow-y-auto overflow-x-auto`;
      clonedChild = cloneElement(only as any, {
        ref: scrollElRef,
        className: mergedClass,
        style: { ...(only.props?.style || {}) },
      });
    } else {
      clonedChild = only;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {showVertBtns && (
        <button onClick={() => scrollVertical("up")}>
          <Button
            className="rounded-xl px-2 py-1"
            style="transparent"
            uninteractable={!canScrollUp}
          >
            <ChevronUp
              className={`h-6 w-6 ${!canScrollUp ? "text-transparent" : ""}`}
            />
          </Button>
        </button>
      )}
      <div
        className={`no-scrollbar flex w-full flex-col gap-2 overflow-hidden transition-all ${
          canScrollUp
            ? "mask-t-from-white mask-t-from-90% mask-t-to-transparent"
            : ""
        } ${canScrollDown ? "mask-b-from-white mask-b-from-90% mask-b-to-transparent" : ""}`}
      >
        {clonedChild}
      </div>
      {showVertBtns && (
        <button onClick={() => scrollVertical("down")}>
          <Button
            className="rounded-xl px-2 py-1"
            style="transparent"
            uninteractable={!canScrollDown}
          >
            <ChevronDown
              className={`h-6 w-6 ${!canScrollDown ? "text-transparent" : ""}`}
            />
          </Button>
        </button>
      )}
    </div>
  );
}
