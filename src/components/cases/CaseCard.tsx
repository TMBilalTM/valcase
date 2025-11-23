import type { CaseDefinition } from "@/types/valorant";
import { formatCurrency } from "@/lib/utils";

function createCaseArt(title: string, accent: string) {
  const safeTitle = title.replace(/&/g, "&amp;");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#050912" stop-opacity="0.95" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="url(#g)" />
      <circle cx="520" cy="-60" r="220" fill="rgba(255,255,255,0.12)" />
      <circle cx="120" cy="380" r="180" fill="rgba(255,255,255,0.08)" />
      <path d="M0 260 L640 140 L640 360 L0 360 Z" fill="rgba(0,0,0,0.35)" />
      <text x="40" y="300" fill="rgba(255,255,255,0.9)" font-family='"Space Grotesk", "Arial", sans-serif' font-size="46" font-weight="700" letter-spacing="6">
        ${safeTitle.toUpperCase()}
      </text>
    </svg>
  `;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

interface Props {
  data: CaseDefinition;
  onOpen?: (caseId: string, count?: 1 | 5 | 10) => void;
  disabled?: boolean;
}

export function CaseCard({ data, onOpen, disabled }: Props) {
  const accentColor = data.swatch ?? "#ff4655";
  const backgroundImage = createCaseArt(data.title, accentColor);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 text-left transition hover:border-white/25 focus-within:outline-none">
      <div className="relative aspect-video w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-2xl font-black uppercase tracking-tight text-white drop-shadow-[0_8px_25px_rgba(0,0,0,0.8)]">
            {data.title}
          </p>
          <p className="text-sm font-semibold text-white/80">{formatCurrency(data.price)} VP</p>
        </div>
      </div>
      <div className="flex gap-2 border-t border-white/10 bg-black/40 p-3">
        <button
          type="button"
          onClick={() => onOpen?.(data.id, 1)}
          disabled={disabled}
          className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          1x
        </button>
        <button
          type="button"
          onClick={() => onOpen?.(data.id, 5)}
          disabled={disabled}
          className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          5x · {formatCurrency(data.price * 5)}
        </button>
        <button
          type="button"
          onClick={() => onOpen?.(data.id, 10)}
          disabled={disabled}
          className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          10x · {formatCurrency(data.price * 10)}
        </button>
      </div>
    </div>
  );
}
