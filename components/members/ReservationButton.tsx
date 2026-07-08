import { RESERVATION } from '@/lib/site';
import { toneText, type Tone } from '@/lib/members';

export function ReservationButton({ tone, emphasize = false }: { tone: Tone; emphasize?: boolean }) {
  return (
    <a
      href={RESERVATION.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-primary btn-lg reservation-btn ${emphasize ? 'is-emphasized' : ''}`}
    >
      {toneText(tone, 'よやくする', RESERVATION.label)}

      <style jsx>{`
        .reservation-btn {
          width: 100%;
        }
        .reservation-btn.is-emphasized {
          animation: reservation-pop 0.6s ease;
          box-shadow: 0 14px 34px rgb(var(--orange-rgb) / 0.4);
        }
        @keyframes reservation-pop {
          0% { transform: scale(0.96); }
          60% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reservation-btn.is-emphasized { animation: none; }
        }
      `}</style>
    </a>
  );
}
