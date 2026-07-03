// パスポート用スタンプの自作SVG。丸み・やわ影・絵本感を優先し、写実的にはしない。
export function KiwiStamp({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" role="img" aria-hidden>
      <circle cx="20" cy="20" r="18" fill="rgb(var(--green-rgb) / 0.16)" stroke="var(--leaf-green)" strokeWidth="2" />
      <circle cx="20" cy="20" r="12" fill="var(--leaf-green)" opacity="0.9" />
      <circle cx="20" cy="20" r="7.5" fill="#fef9ec" />
      <g fill="var(--cocoa)">
        <circle cx="20" cy="20" r="1.6" />
        <circle cx="15.5" cy="17.5" r="1.1" />
        <circle cx="24.5" cy="17.5" r="1.1" />
        <circle cx="15.5" cy="22.5" r="1.1" />
        <circle cx="24.5" cy="22.5" r="1.1" />
        <circle cx="20" cy="15" r="1.1" />
        <circle cx="20" cy="25" r="1.1" />
      </g>
    </svg>
  );
}

export function StarStamp({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" role="img" aria-hidden>
      <circle cx="20" cy="20" r="18" fill="rgb(var(--yellow-rgb) / 0.22)" stroke="var(--kiwi-orange)" strokeWidth="2" />
      <path
        d="M20 8.5l3.2 6.8 7.3.9-5.4 5.1 1.4 7.3-6.5-3.6-6.5 3.6 1.4-7.3-5.4-5.1 7.3-.9z"
        fill="rgb(var(--yellow-rgb))"
        stroke="var(--kiwi-orange)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
