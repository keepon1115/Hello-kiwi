import { SITE } from '@/lib/site';

export function AddressLine({ className = '' }: { className?: string }) {
  return (
    <span className={className}>
      {SITE.address.fullBase}
      <br className="sm:hidden" />
      {SITE.address.suffix}
    </span>
  );
}
