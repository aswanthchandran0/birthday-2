import { useCallback, useEffect, useState } from "react";
import { Delete, Info } from "lucide-react"; // Removed PartyPopper
import CouplePhoto from '../../assets/couple.jpeg'
import WizardCat from '../../assets/wizard-cat.png'
import "./birthday-lock.css";

const BUMPS = 20;
const AMP = 3.4;
const SCALLOP_CIRCLE = (() => {
  const pts = [];
  for (let i = 0; i < 360; i++) {
    const t = (i / 360) * Math.PI * 2;
    const r = 50 - AMP + AMP * Math.abs(Math.sin((t * BUMPS) / 2));
    pts.push(`${(50 + r * Math.cos(t)).toFixed(2)}% ${(50 + r * Math.sin(t)).toFixed(2)}%`);
  }
  return `polygon(${pts.join(",")})`;
})();

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

export default function BirthdayLockScreen({
  passcode = "0810",
  couplePhoto = CouplePhoto,
  catImage = WizardCat,
  onUnlock, // <-- This is the magic button that switches pages
}) {
  const length = passcode.length;
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const press = useCallback(
    (key) => {
      setError(false);
      setCode((c) => (c.length < length ? c + key : c));
    },
    [length]
  );

  const backspace = useCallback(() => {
    setError(false);
    setCode((c) => c.slice(0, -1));
  }, []);

  const submit = useCallback(() => {
    if (code === passcode) {
      onUnlock?.(); // <-- SUCCESS! Tell App.jsx to show the SurprisePage
    } else {
      setCode("");
      setError(true);
      setAttempt((a) => a + 1);
    }
  }, [code, passcode, onUnlock]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (/^[0-9*#]$/.test(e.key)) press(e.key);
      else if (e.key === "Backspace") backspace();
      else if (e.key === "Enter") {
        if (e.target instanceof Element && e.target.closest("button")) return;
        submit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press, backspace, submit]);

  return (
    <main className="stripes ff-display relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden px-6 py-10 md:flex-row md:gap-0 md:px-12">
      {/* LEFT: polaroid area */}
      <section className="flex w-full flex-col items-center md:w-1/2">
        <h1
          className="text-7xl font-bold leading-none text-[#b79ae6] md:text-8xl lg:text-9xl"
          style={{ textShadow: "4px 4px 0 #fff, 7px 7px 0 rgba(143,111,214,0.35)" }}
        >
          Unlock
        </h1>
        <p
          className="ff-script relative z-10 -mt-3 -rotate-6 text-4xl text-white md:-mt-5 md:text-6xl"
          style={{ textShadow: "0 2px 0 #8f6fd6, 0 0 10px rgba(143,111,214,0.7)" }}
        >
          for surprise
        </p>

        <div className="mt-4 -rotate-3 drop-shadow-[0_10px_0_rgba(111,79,184,0.28)]">
          <div
            className="relative h-60 w-60 bg-[#b79ae6] sm:h-72 sm:w-72 lg:h-80 lg:w-80"
            style={{ clipPath: SCALLOP_CIRCLE }}
          >
            <div className="absolute inset-[9%] overflow-hidden rounded-full border-4 border-white bg-[#efe6fc]">
              <img src={couplePhoto} alt="The happy couple" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CENTER: wizard cat */}
      <img
        src={catImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none relative z-20 h-28 w-28 object-contain md:absolute md:left-1/2 md:top-1/2 md:h-44 md:w-44 md:-translate-x-1/2 md:-translate-y-1/2 lg:h-56 lg:w-56"
      />

      {/* RIGHT: passcode card */}
      <section className="flex w-full justify-center md:w-1/2">
        <div className="w-full max-w-sm rotate-2 drop-shadow-[0_10px_0_rgba(111,79,184,0.28)]">
          <div className="scallop-card">
            <h2 className="ff-pixel text-center text-2xl font-bold text-[#5b3fa0] md:text-3xl">
              Enter passcode
            </h2>

            <div
              key={attempt}
              className={`mt-5 flex items-center justify-center gap-2 ${error ? "shake" : ""}`}
            >
              {Array.from({ length }).map((_, i) => (
                <div
                  key={i}
                  className={`ff-pixel flex h-14 w-11 items-center justify-center rounded-lg border-2 border-dashed bg-white/70 text-4xl leading-none text-[#5b3fa0] ${
                    error ? "border-red-400" : "border-[#8f6fd6]"
                  }`}
                >
                  <span className="translate-y-1.5">{code[i] ? "*" : ""}</span>
                </div>
              ))}
              <button
                type="button"
                onClick={backspace}
                aria-label="Delete last character"
                className="ml-1 rounded-full p-2 text-[#8f6fd6] transition hover:bg-white/60"
              >
                <Delete className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-[#8f6fd6]/20 px-4 py-1.5 mx-auto w-fit">
              <Info className="h-4 w-4 text-[#5b3fa0]" />
              <p className="ff-pixel text-sm text-[#5b3fa0]">
                Hint: code (0810)
              </p>
            </div>

            <p className="ff-pixel mt-2 h-5 text-center text-sm text-red-500">
              {error ? "Wrong passcode. Try again." : ""}
            </p>

            <div className="mx-auto mt-3 grid max-w-[16rem] grid-cols-3 justify-items-center gap-3">
              {KEYS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => press(k)}
                  className="h-16 w-16 rounded-full bg-[#8f6fd6] text-2xl font-bold text-white shadow-[0_4px_0_#6f4fb8] transition active:translate-y-1 active:shadow-none hover:bg-[#9b7de0]"
                >
                  {k}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={submit}
              className="ff-pixel mx-auto mt-5 block w-full max-w-[16rem] rounded-full bg-[#6f4fb8] py-3 text-xl font-bold text-white shadow-[0_4px_0_#4d3590] transition active:translate-y-1 active:shadow-none hover:bg-[#7c5bc5]"
            >
              Enter
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}