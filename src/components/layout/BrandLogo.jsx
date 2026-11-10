/**
 * Vector emblem faithful to the circular forest-green & gold CUP-2-EAT seal.
 */
export function BrandLogo({ size = 46 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="CUP2EAT circular emblem"
    >
      <circle cx="60" cy="60" r="57" fill="#183629" stroke="#C69C53" strokeWidth="4" />
      <circle cx="60" cy="60" r="51" stroke="#C69C53" strokeWidth="1" strokeOpacity="0.45" />
      <text
        x="60"
        y="40"
        textAnchor="middle"
        fill="#C69C53"
        fontFamily="Fraunces, Georgia, serif"
        fontWeight="700"
        fontSize="23"
        letterSpacing="2"
      >
        CUP
      </text>
      <line x1="22" y1="60" x2="46" y2="60" stroke="#C69C53" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="74" y1="60" x2="98" y2="60" stroke="#C69C53" strokeWidth="2.5" strokeLinecap="round" />
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fill="#E1C48B"
        fontFamily="Fraunces, Georgia, serif"
        fontWeight="700"
        fontSize="24"
      >
        2
      </text>
      <text
        x="60"
        y="95"
        textAnchor="middle"
        fill="#C69C53"
        fontFamily="Fraunces, Georgia, serif"
        fontWeight="700"
        fontSize="23"
        letterSpacing="2"
      >
        EAT
      </text>
    </svg>
  );
}

