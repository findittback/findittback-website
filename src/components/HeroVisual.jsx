// Flat-illustration hero graphic inspired by the reference mockup: a set of
// everyday items (backpack, phone, earbuds case, wallet + keys) each carrying
// a small "FIND ME" QR sticker, against the dark ink background, with a
// hand-drawn style annotation pointing at one of the stickers.
export default function HeroVisual() {
  return (
    <div style={{ filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.45))" }}>
      <svg
        viewBox="0 0 560 520"
        width="100%"
        height="auto"
        style={{ maxWidth: 460 }}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="A backpack, phone, earbuds case, and wallet with keys, each with a Find Me QR sticker stuck on it"
      >
        <defs>
          <linearGradient id="bagGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1A2C47" />
            <stop offset="100%" stopColor="#000F26" />
          </linearGradient>
          <linearGradient id="phoneGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#243A5E" />
            <stop offset="100%" stopColor="#000F26" />
          </linearGradient>
        </defs>

        {/* ---- annotation: "Stick it on what matters" ---- */}
        <g fontFamily="Inter, sans-serif">
          <text x="345" y="46" fontSize="17" fontStyle="italic" fill="#FFFFFF" opacity="0.9">
            Stick it on
          </text>
          <text x="345" y="68" fontSize="17" fontStyle="italic" fill="#FFFFFF" opacity="0.9">
            what matters
          </text>
          <path
            d="M400 82 C 380 110, 360 128, 330 145"
            stroke="#4A90E2"
            strokeOpacity="0.8"
            strokeWidth="2"
            fill="none"
            strokeDasharray="1 7"
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="#4A90E2" opacity="0.9" />
            </marker>
          </defs>
        </g>

        {/* ---- backpack (main, center-right) ---- */}
        <g transform="translate(215,120)">
          {/* straps */}
          <path d="M35 20 C 15 60, 15 220, 35 270" stroke="#000814" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d="M135 20 C 155 60, 155 220, 135 270" stroke="#000814" strokeWidth="14" fill="none" strokeLinecap="round" />
          {/* main body */}
          <rect x="10" y="30" width="150" height="250" rx="26" fill="url(#bagGrad)" />
          {/* top flap */}
          <rect x="24" y="8" width="122" height="60" rx="18" fill="#0A1830" />
          <circle cx="85" cy="38" r="7" fill="#000814" />
          {/* front pocket */}
          <rect x="28" y="150" width="114" height="100" rx="16" fill="#0A1830" />
          <rect x="46" y="168" width="78" height="10" rx="5" fill="#1A2C47" />
          {/* zipper pull */}
          <circle cx="146" cy="150" r="5" fill="#4A90E2" />

          {/* QR sticker on backpack */}
          <g transform="translate(48,178)">
            <rect width="60" height="60" rx="8" fill="#FFFFFF" />
            <text x="30" y="13" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="8" fill="#000F26">
              FIND ME
            </text>
            <g transform="translate(9,17)" fill="#000F26">
              <rect x="0" y="0" width="12" height="12" />
              <rect x="30" y="0" width="12" height="12" />
              <rect x="0" y="30" width="12" height="12" />
              <rect x="3" y="3" width="6" height="6" fill="#FFFFFF" />
              <rect x="33" y="3" width="6" height="6" fill="#FFFFFF" />
              <rect x="3" y="33" width="6" height="6" fill="#FFFFFF" />
              <rect x="17" y="4" width="5" height="5" />
              <rect x="24" y="14" width="5" height="5" />
              <rect x="17" y="20" width="9" height="5" />
              <rect x="30" y="24" width="5" height="9" />
              <rect x="17" y="30" width="5" height="12" />
              <rect x="24" y="36" width="12" height="5" />
            </g>
          </g>
        </g>

        {/* ---- phone (front left, leaning) ---- */}
        <g transform="translate(70,190) rotate(-6)">
          <rect x="0" y="0" width="96" height="196" rx="18" fill="url(#phoneGrad)" />
          <rect x="6" y="6" width="84" height="184" rx="12" fill="#000814" />
          {/* camera bump */}
          <circle cx="70" cy="24" r="10" fill="#0A1830" />
          <circle cx="70" cy="24" r="5" fill="#1A2C47" />
          <circle cx="46" cy="24" r="7" fill="#0A1830" />

          {/* QR sticker on phone */}
          <g transform="translate(16,80)">
            <rect width="52" height="52" rx="7" fill="#FFFFFF" />
            <text x="26" y="12" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="7" fill="#000F26">
              FIND ME
            </text>
            <g transform="translate(8,15)" fill="#000F26">
              <rect x="0" y="0" width="10" height="10" />
              <rect x="26" y="0" width="10" height="10" />
              <rect x="0" y="26" width="10" height="10" />
              <rect x="2.5" y="2.5" width="5" height="5" fill="#FFFFFF" />
              <rect x="28.5" y="2.5" width="5" height="5" fill="#FFFFFF" />
              <rect x="2.5" y="28.5" width="5" height="5" fill="#FFFFFF" />
              <rect x="15" y="3" width="4" height="4" />
              <rect x="21" y="12" width="4" height="4" />
              <rect x="15" y="17" width="8" height="4" />
              <rect x="26" y="20" width="4" height="8" />
              <rect x="15" y="26" width="4" height="10" />
              <rect x="21" y="31" width="10" height="4" />
            </g>
          </g>
        </g>

        {/* ---- earbuds case (front, between phone and bag) ---- */}
        <g transform="translate(178,340)">
          <rect x="0" y="0" width="62" height="46" rx="14" fill="#FFFFFF" />
          <rect x="0" y="18" width="62" height="4" fill="#D6DEE8" />
          <rect x="26" y="0" width="10" height="46" fill="#D6DEE8" opacity="0.6" />
          {/* small QR sticker */}
          <g transform="translate(11,26) scale(0.55)">
            <rect width="60" height="60" rx="8" fill="#000F26" />
            <text x="30" y="13" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="8" fill="#FFFFFF">
              FIND ME
            </text>
          </g>
        </g>

        {/* ---- wallet + keys (bottom right) ---- */}
        <g transform="translate(370,330)">
          <rect x="0" y="10" width="120" height="80" rx="12" fill="#0A1830" />
          <rect x="10" y="20" width="100" height="60" rx="8" fill="#1A2C47" />
          {/* stitching */}
          <rect x="10" y="46" width="100" height="2" fill="#000814" />

          {/* keys */}
          <g transform="translate(96,-14)">
            <circle cx="10" cy="10" r="9" fill="none" stroke="#8FB5E8" strokeWidth="3" />
            <rect x="16" y="16" width="4" height="34" rx="2" fill="#8FB5E8" transform="rotate(28 18 33)" />
            <rect x="28" y="30" width="10" height="4" fill="#8FB5E8" transform="rotate(28 33 32)" />
          </g>

          {/* QR sticker on wallet */}
          <g transform="translate(30,32)">
            <rect width="48" height="48" rx="7" fill="#FFFFFF" />
            <text x="24" y="11" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="6.5" fill="#000F26">
              FIND ME
            </text>
            <g transform="translate(7,14)" fill="#000F26">
              <rect x="0" y="0" width="9" height="9" />
              <rect x="24" y="0" width="9" height="9" />
              <rect x="0" y="24" width="9" height="9" />
              <rect x="2" y="2" width="5" height="5" fill="#FFFFFF" />
              <rect x="26" y="2" width="5" height="5" fill="#FFFFFF" />
              <rect x="2" y="26" width="5" height="5" fill="#FFFFFF" />
              <rect x="13" y="3" width="4" height="4" />
              <rect x="19" y="11" width="4" height="4" />
              <rect x="13" y="16" width="7" height="4" />
              <rect x="24" y="18" width="4" height="7" />
              <rect x="13" y="24" width="4" height="9" />
              <rect x="19" y="28" width="9" height="4" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}