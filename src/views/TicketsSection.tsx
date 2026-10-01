import type { CSSProperties } from 'react'
import ticket from '../assets/ticket.png'
import corruptedText from '../assets/CorupptedText.png'

const W = 1440
const H = 923

// Design pixels -> % of the stage (x, y, width, height)
const rect = (x: number, y: number, w: number, h?: number): CSSProperties => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
  width: `${(w / W) * 100}%`,
  ...(h !== undefined && { height: `${(h / H) * 100}%` }),
})

// Border lines: [x, y, width, height] in design pixels.
// Position and length stretch with the stage; thickness stays 3px.
const LINES: [number, number, number, number][] = [
  [0, 0, 1440, 3], // top
  [0, 0, 3, 923], // left
  [1437, 0, 3, 923], // right
  [1041, 0, 3, 923], // main vertical divider
  [0, 72, 1044, 3], // under header
  [0, 462, 1044, 3], // under ticket
  [0, 539, 1044, 3], // under labels
  [0, 783, 1044, 3], // above bottom strip
  [517, 465, 3, 318], // between TYPE and ADMISSION columns
  [1044, 239, 393, 3], // right column, under eye panel
  [1044, 276, 393, 3], // right column, under small strip
]

const lineStyle = (x: number, y: number, w: number, h: number): CSSProperties =>
  h === 3
    ? { left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%`, width: `${(w / W) * 100}%`, height: '3px' }
    : { left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%`, width: '3px', height: `${(h / H) * 100}%` }

export function TicketsSection() {
  return (
    <section
      id="tickets"
      className="relative w-full scroll-mt-[var(--nav-h)] border-t border-white/10 bg-[#050004] text-white"
      style={
        {
          '--nav-h': '100px',
          '--stage-h': 'calc(100svh - var(--nav-h))',
        } as CSSProperties
      }
    >
      <h2 className="sr-only">Tickets</h2>

      {/* Stage: full width, height fits the screen under the navbar */}
      <div className="relative h-[var(--stage-h)] min-h-[560px] w-full overflow-hidden bg-[#050004] [container-type:size]">
        {/* Border lines */}
        {LINES.map(([x, y, w, h]) => (
          <div
            key={`${x}-${y}`}
            className="absolute bg-[#7E5F56]"
            style={lineStyle(x, y, w, h)}
          />
        ))}

        {/* Ticket: centered in its panel, keeps its own proportions */}
        <img
          src={ticket}
          alt="Escapade boarding pass ticket"
          className="absolute left-[36.2%] top-[29.2%] block h-auto w-[min(58cqw,90.4cqh)] max-w-none -translate-x-1/2 -translate-y-1/2"
        />

        {/* Corrupted overlay: stretched to the stage */}
        <img
          src={corruptedText}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute left-0 top-[1.083%] z-10 block h-[98.917%] w-full max-w-none select-none object-fill"
        />

        {/* Header */}
        <div
          className="absolute z-20 flex items-center whitespace-nowrap pl-[3.1cqw] font-orbitron text-[min(2.5cqw,3.9cqh)] font-normal uppercase tracking-[0.22em]"
          style={rect(3, 12, 1038, 60)}
        >
          <span className="text-[#8c8c8c]">Against all odds:</span>
          <span className="ml-[0.6em] text-[#ff0000]">Escapade</span>
        </div>

        {/* Labels row */}
        <div
          className="absolute z-20 flex items-center justify-center"
          style={rect(3, 465, 514, 74)}
        >
          <span className="inline-block whitespace-nowrap bg-[linear-gradient(90deg,#b97a9a,#f2805f)] bg-clip-text font-orbitron text-[min(1.9cqw,2.95cqh)] font-bold uppercase tracking-[0.25em] text-transparent">
            Type
          </span>
        </div>
        <div
          className="absolute z-20 flex items-center justify-center"
          style={rect(520, 465, 517, 74)}
        >
          <span className="inline-block whitespace-nowrap bg-[linear-gradient(90deg,#a07ab0_0%,#4f8a58_35%,#7a6a55_55%,#b04a4a_100%)] bg-clip-text font-orbitron text-[min(1.9cqw,2.95cqh)] font-bold uppercase tracking-[0.25em] text-transparent">
            General Admission
          </span>
        </div>

        {/* Values row */}
        <div
          className="absolute z-20 flex items-center justify-center"
          style={rect(3, 542, 514, 212)}
        >
          <span className="whitespace-nowrap font-orbitron text-[min(2.3cqw,3.6cqh)] font-bold uppercase tracking-[0.2em] text-[#8a8a8a]">
            Boarding Pass
          </span>
        </div>
        <div
          className="absolute z-20 flex items-center justify-center"
          style={rect(520, 542, 517, 212)}
        >
          <span className="whitespace-nowrap font-orbitron text-[min(2.2cqw,3.4cqh)] font-bold tracking-wide">
            <span className="text-[#b3b3b3]">Php</span>{' '}
            <span className="text-white">30.00</span>
          </span>
        </div>
      </div>
    </section>
  )
}