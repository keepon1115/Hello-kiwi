import type { TicketStatus, Tone } from '@/lib/members';
import { toneText } from '@/lib/members';
import { Reveal } from '@/components/Reveal';

function formatMD(date: string) {
  const [, m, d] = date.split('-');
  return `${Number(m)}/${Number(d)}`;
}

export function TicketSection({ ticket, tone }: { ticket: TicketStatus; tone: Tone }) {
  return (
    <Reveal as="section" className="ticket-section">
      <h2>{ticket.label}</h2>

      <div className="ticket-remaining">
        <span className="ticket-remaining-num">{ticket.remaining}</span>
        <span className="ticket-remaining-label">{toneText(tone, 'かい のこってるよ', '回 のご利用が可能です')}</span>
      </div>

      <div className="ticket-slots" role="list">
        {ticket.slots.map((slot, i) => (
          <div key={i} className={`ticket-slot ${slot.date ? 'is-used' : 'is-empty'}`} role="listitem">
            {slot.date ? (
              <>
                <span className="ticket-slot-stamp" aria-hidden>
                  🥝
                </span>
                <span className="ticket-slot-date">{formatMD(slot.date)}</span>
              </>
            ) : (
              <span className="ticket-slot-dot" aria-hidden />
            )}
          </div>
        ))}
      </div>

      {ticket.isLow && (
        <p className="ticket-note">{toneText(tone, 'そろそろ つぎの よやくを♪', 'そろそろ次のご予約はいかがでしょうか。')}</p>
      )}
      {ticket.isEmpty && (
        <p className="ticket-note">
          {toneText(
            tone,
            'チケットが なくなったよ。つぎの チケットは せんせいに きいてね',
            'チケットをご利用いただきました。次のチケットについては先生にご相談ください。'
          )}
        </p>
      )}

      <style jsx>{`
        :global(.ticket-section) {
          background: #fff;
          border-radius: 26px;
          padding: clamp(20px, 5cqi, 30px);
          box-shadow: var(--shadow-soft);
          border: 1px solid rgb(var(--cocoa-rgb) / 0.06);
          text-align: center;
        }
        :global(.ticket-section) h2 {
          font-size: 1.15rem;
          margin-bottom: 6px;
        }
        .ticket-remaining {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 6px;
          margin: 6px 0 18px;
        }
        .ticket-remaining-num {
          font-family: var(--font-pop);
          font-size: 2.4rem;
          font-weight: 800;
          color: var(--kiwi-orange);
          line-height: 1;
        }
        .ticket-remaining-label {
          font-weight: 700;
          color: var(--cocoa-soft);
        }
        .ticket-slots {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }
        .ticket-slot {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1px;
        }
        .ticket-slot.is-used {
          background: rgb(var(--green-rgb) / 0.12);
          box-shadow: var(--shadow-soft);
        }
        .ticket-slot.is-empty {
          border: 2px dashed rgb(var(--cocoa-rgb) / 0.2);
        }
        .ticket-slot-stamp {
          font-size: 1.3rem;
          line-height: 1;
        }
        .ticket-slot-date {
          font-family: var(--font-pop);
          font-size: 0.66rem;
          font-weight: 700;
          color: var(--cocoa-soft);
        }
        .ticket-slot-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgb(var(--cocoa-rgb) / 0.15);
        }
        .ticket-note {
          margin: 18px 0 0;
          font-weight: 700;
          color: var(--kiwi-orange);
        }
      `}</style>
    </Reveal>
  );
}
