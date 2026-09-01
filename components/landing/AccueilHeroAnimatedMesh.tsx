const NODES: [number, number][] = [
  [120, 60],
  [200, 100],
  [280, 40],
  [40, 120],
  [360, 90],
  [120, 180],
  [200, 220],
  [280, 160],
];

const MESH_PATH =
  'M40 120 L120 60 L200 100 L280 40 L360 90 M120 60 L120 180 M200 100 L200 220 M280 40 L280 160 M40 120 L80 200 M360 90 L320 200';

/**
 * Réseau SVG décoratif hero — pur CSS (pas de JS / hydratation).
 * Animations via `.ofc-hero-mesh-*` dans globals.css ; SVG SMIL pour les pulses.
 */
export function AccueilHeroAnimatedMesh() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.12] md:opacity-[0.14] motion-reduce:opacity-[0.08]"
      aria-hidden
    >
      <svg
        className="ofc-hero-mesh absolute left-1/2 top-0 h-[min(520px,75vh)] w-[min(900px,100%)] -translate-x-1/2 motion-reduce:opacity-50"
        viewBox="0 0 400 280"
        fill="none"
      >
        <defs>
          <linearGradient id="heroMesh" x1="200" y1="0" x2="200" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor="#377CF3" stopOpacity="0.45" />
            <stop offset="1" stopColor="#377CF3" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path id="heroMeshPath" d={MESH_PATH} fill="none" stroke="none" />
        <path
          d={MESH_PATH}
          stroke="url(#heroMesh)"
          strokeWidth="0.75"
          className="ofc-hero-mesh-line motion-reduce:stroke-opacity-20"
        />
        {NODES.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="2.5"
            fill="#377CF3"
            fillOpacity="0.28"
            className="ofc-hero-mesh-node motion-reduce:animate-none"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <circle
            key={`pulse-${i}`}
            r="2"
            fill="#377CF3"
            opacity="0.6"
            className="motion-reduce:hidden"
          >
            <animateMotion dur={`${4 + i}s`} repeatCount="indefinite" begin={`${i * 1.3}s`}>
              <mpath href="#heroMeshPath" />
            </animateMotion>
          </circle>
        ))}
      </svg>
    </div>
  );
}
