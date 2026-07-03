// .reveal クラスを付けるだけのラッパ。実際の発火は各ページの *Client が呼ぶ
// useReveal()（IntersectionObserver）が担当する。delay は時差表示用。
export function Reveal({
  children,
  as: Tag = 'div',
  delay,
  className = ''
}: {
  children: React.ReactNode;
  as?: any;
  delay?: 1 | 2 | 3;
  className?: string;
}) {
  return (
    <Tag className={`reveal ${delay ? `d${delay}` : ''} ${className}`.trim()}>{children}</Tag>
  );
}
