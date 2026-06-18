import Link from 'next/link';
import { LINKS } from '@/lib/site';
import { ImageSlot } from './ImageSlot';

export function RightRail() {
  return (
    <div className="rail">
      <Link href="/" className="rail-logo" aria-label="ホーム">
        <ImageSlot src="/assets/images/common/logo-mark.svg" label="logo-mark" w={48} h={48} round />
      </Link>

      <hr className="rail-sep" aria-hidden />

      <Link href="/trial" className="rail-ico is-cta" aria-label="無料体験に申し込む">
        体験
      </Link>
      <a href={LINKS.line} target="_blank" rel="noopener noreferrer" className="rail-ico is-line" aria-label="LINEで相談">
        LINE
      </a>

      <hr className="rail-sep" aria-hidden />

      <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="rail-ico" aria-label="Instagram">
        IG
      </a>
      <a href={LINKS.keeponLabo} target="_blank" rel="noopener noreferrer" className="rail-ico" aria-label="キープオンラボ">
        LAB
      </a>
      <a href={LINKS.englishSteam} target="_blank" rel="noopener noreferrer" className="rail-ico" aria-label="CLAFT">
        STEAM
      </a>

      <span className="rail-label">Hello Kiwi</span>
    </div>
  );
}
