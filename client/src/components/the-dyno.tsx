import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import logoMark from "@assets/Asset_6_1770967674840.png";

interface DynoData {
  rpm: number;
  rpmMax: number;
  speed: number;
  temp: number;
  tempRaw: number;
  fuel: number;
  fuelMax: number;
  boost: number;
  totalReads: number;
  totalShares: number;
  totalClicks: number;
  totalBacklinks: number;
  publishedPosts: number;
  activeSubscribers: number;
  totalRatings: number;
  deliveredCount: number;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

function GaugeSVG({
  value,
  max,
  label,
  unit,
  displayValue,
  size = 180,
  startAngle = -225,
  endAngle = 45,
  color = "#FF192C",
  warningZone = 0.8,
  tickCount = 10,
}: {
  value: number;
  max: number;
  label: string;
  unit: string;
  displayValue: string;
  size?: number;
  startAngle?: number;
  endAngle?: number;
  color?: string;
  warningZone?: number;
  tickCount?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 20;
  const innerR = r - 8;
  const totalAngle = endAngle - startAngle;
  const pct = Math.min(value / Math.max(max, 1), 1);
  const needleAngle = startAngle + pct * totalAngle;

  const ticks = [];
  for (let i = 0; i <= tickCount; i++) {
    const angle = startAngle + (i / tickCount) * totalAngle;
    const isWarning = i / tickCount >= warningZone;
    const outer = polarToCartesian(cx, cy, r - 2, angle);
    const inner = polarToCartesian(cx, cy, r - (i % 2 === 0 ? 14 : 9), angle);
    const labelPos = polarToCartesian(cx, cy, r - 22, angle);
    ticks.push(
      <g key={i}>
        <line
          x1={outer.x}
          y1={outer.y}
          x2={inner.x}
          y2={inner.y}
          stroke={isWarning ? "#FF192C" : "#4A4A50"}
          strokeWidth={i % 2 === 0 ? 2 : 1}
          strokeLinecap="round"
        />
        {i % 2 === 0 && (
          <text
            x={labelPos.x}
            y={labelPos.y}
            fill={isWarning ? "#FF192C" : "#666"}
            fontSize="8"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Manrope, sans-serif"
          >
            {Math.round((i / tickCount) * max)}
          </text>
        )}
      </g>
    );
  }

  const needleTip = polarToCartesian(cx, cy, r - 16, needleAngle);
  const needleBase1 = polarToCartesian(cx, cy, 6, needleAngle + 90);
  const needleBase2 = polarToCartesian(cx, cy, 6, needleAngle - 90);
  const needleTail = polarToCartesian(cx, cy, 16, needleAngle + 180);

  return (
    <div className="relative flex flex-col items-center" data-testid={`gauge-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <filter id={`glow-${label}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`grad-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.03" />
          </linearGradient>
        </defs>

        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1A1A1E" strokeWidth="8" />
        <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="#111113" strokeWidth="1" />

        <path
          d={describeArc(cx, cy, r, startAngle, endAngle)}
          fill="none"
          stroke="#222226"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {pct > 0 && (
          <path
            d={describeArc(cx, cy, r, startAngle, startAngle + pct * totalAngle)}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            filter={`url(#glow-${label})`}
            opacity="0.8"
          />
        )}

        {ticks}

        <polygon
          points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleTail.x},${needleTail.y} ${needleBase2.x},${needleBase2.y}`}
          fill={color}
          opacity="0.9"
          filter={`url(#glow-${label})`}
        />
        <circle cx={cx} cy={cy} r="8" fill="#0B0B0D" stroke="#333" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="4" fill={color} opacity="0.6" />

        <text
          x={cx}
          y={cy + 35}
          fill="#F5F5F7"
          fontSize="22"
          fontWeight="700"
          textAnchor="middle"
          fontFamily="Manrope, sans-serif"
        >
          {displayValue}
        </text>
        <text
          x={cx}
          y={cy + 50}
          fill="#666"
          fontSize="9"
          textAnchor="middle"
          fontFamily="Manrope, sans-serif"
          letterSpacing="0.15em"
        >
          {unit}
        </text>
      </svg>
      <span className="text-[10px] uppercase tracking-[0.25em] text-[#B3B3B8]/60 mt-1 font-medium">
        {label}
      </span>
    </div>
  );
}

function VerticalBar({
  value,
  max,
  label,
  displayValue,
  color = "#FF192C",
}: {
  value: number;
  max: number;
  label: string;
  displayValue: string;
  color?: string;
}) {
  const pct = Math.min(value / Math.max(max, 1), 1) * 100;
  return (
    <div className="flex flex-col items-center gap-1" data-testid={`bar-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <span className="text-xs font-bold text-[#F5F5F7]">{displayValue}</span>
      <div className="w-3 h-20 bg-[#1A1A1E] rounded-full overflow-hidden relative border border-white/5">
        <div
          className="absolute bottom-0 w-full rounded-full transition-all duration-1000"
          style={{ height: `${pct}%`, background: `linear-gradient(to top, ${color}, ${color}88)`, boxShadow: `0 0 8px ${color}44` }}
        />
      </div>
      <span className="text-[8px] uppercase tracking-[0.2em] text-[#B3B3B8]/40 font-medium text-center leading-tight max-w-[48px]">
        {label}
      </span>
    </div>
  );
}

function InfoCell({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center" data-testid={`info-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="text-lg font-bold text-[#F5F5F7] tabular-nums">{value}</div>
      <div className="text-[8px] uppercase tracking-[0.2em] text-[#B3B3B8]/40 font-medium">{label}</div>
    </div>
  );
}

export default function TheDyno() {
  const { data: stats, isLoading } = useQuery<{
    leads: { total: number; new: number; recent: number; closed: number };
    posts: { published: number };
    subscribers: { active: number };
    newsletters: { sent: number };
    dyno: DynoData;
  }>({
    queryKey: ["/api/stats"],
  });

  if (isLoading || !stats?.dyno) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-[#FF192C] animate-spin" data-testid="loader-dyno" />
      </div>
    );
  }

  const d = stats.dyno;

  return (
    <div className="space-y-6" data-testid="the-dyno">
      <div className="relative rounded-md bg-[#0A0A0C] border border-white/5 overflow-visible">
        <div className="absolute inset-0 rounded-md" style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(255,25,44,0.03) 0%, transparent 70%)",
        }} />

        <div className="relative z-10 px-4 py-6 sm:px-8 sm:py-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to right, transparent, #FF192C33)" }} />
            <img src={logoMark} alt="DS" className="h-5 w-auto opacity-30" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#FF192C]/40 font-semibold">
              The Dyno
            </span>
            <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to left, transparent, #FF192C33)" }} />
          </div>
          <p className="text-center text-[9px] uppercase tracking-[0.3em] text-[#B3B3B8]/30 mb-8">
            Performance Instrument Cluster
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
            <div className="hidden lg:flex flex-col gap-3">
              <VerticalBar value={d.totalReads} max={Math.max(d.totalReads, 100)} label="Reads" displayValue={String(d.totalReads)} color="#3B82F6" />
              <VerticalBar value={d.totalShares} max={Math.max(d.totalShares, 50)} label="Shares" displayValue={String(d.totalShares)} color="#8B5CF6" />
            </div>

            <GaugeSVG
              value={d.fuel}
              max={d.fuelMax}
              label="Pipeline"
              unit="ACTIVE"
              displayValue={String(d.fuel)}
              size={150}
              color="#22C55E"
              warningZone={0.9}
              tickCount={8}
            />

            <GaugeSVG
              value={d.rpm}
              max={d.rpmMax}
              label="Traffic"
              unit="LEADS / 30D"
              displayValue={String(d.rpm)}
              size={200}
              color="#FF192C"
              warningZone={0.8}
            />

            <div className="flex flex-col items-center">
              <GaugeSVG
                value={d.speed}
                max={100}
                label="Conversion"
                unit="CLOSE RATE"
                displayValue={`${d.speed}%`}
                size={220}
                color="#F59E0B"
                warningZone={0.95}
                tickCount={10}
              />
            </div>

            <GaugeSVG
              value={d.temp}
              max={100}
              label="Sentiment"
              unit={`${d.tempRaw}/5 AVG`}
              displayValue={d.tempRaw > 0 ? String(d.tempRaw) : "—"}
              size={200}
              color={d.temp > 80 ? "#22C55E" : d.temp > 50 ? "#F59E0B" : "#FF192C"}
              warningZone={0.2}
            />

            <GaugeSVG
              value={d.boost}
              max={100}
              label="CTA Rate"
              unit="UTM TRACKED"
              displayValue={`${d.boost}%`}
              size={150}
              color="#3B82F6"
              warningZone={0.95}
              tickCount={8}
            />

            <div className="hidden lg:flex flex-col gap-3">
              <VerticalBar value={d.totalClicks} max={Math.max(d.totalClicks, 50)} label="Clicks" displayValue={String(d.totalClicks)} color="#F59E0B" />
              <VerticalBar value={d.totalBacklinks} max={Math.max(d.totalBacklinks, 20)} label="Links" displayValue={String(d.totalBacklinks)} color="#22C55E" />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
              <InfoCell label="Total Leads" value={stats.leads.total} />
              <InfoCell label="Delivered" value={d.deliveredCount} />
              <InfoCell label="Published" value={d.publishedPosts} />
              <InfoCell label="Subscribers" value={d.activeSubscribers} />
              <InfoCell label="Newsletters" value={stats.newsletters.sent} />
              <InfoCell label="Ratings" value={d.totalRatings} />
            </div>
          </div>

          <div className="lg:hidden mt-6 pt-4 border-t border-white/5">
            <div className="grid grid-cols-4 gap-3">
              <InfoCell label="Reads" value={d.totalReads} />
              <InfoCell label="Shares" value={d.totalShares} />
              <InfoCell label="Clicks" value={d.totalClicks} />
              <InfoCell label="Backlinks" value={d.totalBacklinks} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 pb-4">
          {[
            { c: "#22C55E", l: "Pipeline" },
            { c: "#FF192C", l: "Traffic" },
            { c: "#F59E0B", l: "Conversion" },
            { c: d.temp > 80 ? "#22C55E" : d.temp > 50 ? "#F59E0B" : "#FF192C", l: "Sentiment" },
            { c: "#3B82F6", l: "CTA Rate" },
          ].map((item) => (
            <div key={item.l} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.c, boxShadow: `0 0 4px ${item.c}44` }} />
              <span className="text-[8px] uppercase tracking-[0.15em] text-[#B3B3B8]/40">{item.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
