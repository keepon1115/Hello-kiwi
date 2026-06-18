// ブランドの案内役キウィ。画像アセットが無くても成立するインラインSVG。
// pose で「卒業帽」「本」を切替。微モーション（まばたき）は CSS の blink を使用。
// 動かしすぎない＝品の境目、という方針なので控えめに。

type Pose = 'wave' | 'cap' | 'book';

export function Mascot({
  pose = 'wave',
  size = 96,
  className = '',
  blink = true
}: {
  pose?: Pose;
  size?: number;
  className?: string;
  blink?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="案内役のキウィ"
    >
      {/* 体 */}
      <ellipse cx="60" cy="74" rx="34" ry="32" fill="#8A5A2B" />
      <ellipse cx="60" cy="78" rx="26" ry="24" fill="#A06A33" />
      {/* もふもふの質感（ドット） */}
      <g fill="#7A4E25" opacity="0.5">
        <circle cx="45" cy="70" r="2" />
        <circle cx="72" cy="66" r="2" />
        <circle cx="60" cy="88" r="2" />
        <circle cx="52" cy="84" r="2" />
      </g>
      {/* 足 */}
      <g stroke="#EE6C2B" strokeWidth="4" strokeLinecap="round">
        <line x1="50" y1="104" x2="50" y2="112" />
        <line x1="70" y1="104" x2="70" y2="112" />
      </g>
      {/* くちばし */}
      <path d="M60 60 L60 40" stroke="#5A4329" strokeWidth="5" strokeLinecap="round" />
      {/* 目（まばたき対象） */}
      <g
        style={blink ? { transformOrigin: '60px 56px', animation: 'blink 5.5s infinite' } : undefined}
      >
        <circle cx="54" cy="56" r="4.5" fill="#5A4329" />
        <circle cx="66" cy="56" r="4.5" fill="#5A4329" />
        <circle cx="55.5" cy="54.5" r="1.4" fill="#fff" />
        <circle cx="67.5" cy="54.5" r="1.4" fill="#fff" />
      </g>
      {/* ほっぺ */}
      <circle cx="44" cy="64" r="4" fill="#EE6C2B" opacity="0.3" />
      <circle cx="76" cy="64" r="4" fill="#EE6C2B" opacity="0.3" />

      {/* 卒業帽 */}
      {pose === 'cap' && (
        <g>
          <rect x="42" y="30" width="36" height="8" rx="2" fill="#5A4329" transform="rotate(-4 60 34)" />
          <polygon points="60,20 84,30 60,40 36,30" fill="#5A4329" />
          <line x1="80" y1="30" x2="84" y2="46" stroke="#FFDE59" strokeWidth="2.5" />
          <circle cx="84" cy="48" r="3" fill="#FFDE59" />
        </g>
      )}

      {/* 本 */}
      {pose === 'book' && (
        <g transform="translate(0 4)">
          <rect x="40" y="86" width="40" height="22" rx="3" fill="#7CB342" />
          <rect x="44" y="90" width="32" height="14" rx="2" fill="#FAF5EA" />
          <line x1="60" y1="90" x2="60" y2="104" stroke="#7CB342" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}
