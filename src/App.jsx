import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import {
  profile,
  stats,
  timeline,
  doctrine,
  projects,
  lab,
  systems,
} from './data.js'

/* ---------- shared bits ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function Section({ id, code, title, children, className = '' }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-5 py-24 sm:px-8 ${className}`}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mb-12 flex items-baseline gap-4"
      >
        <span className="readout text-xs text-amber">{code}</span>
        <h2 className="font-display text-2xl font-semibold uppercase tracking-wider text-paper sm:text-3xl">
          {title}
        </h2>
        <div className="hidden h-px flex-1 bg-line sm:block" />
      </motion.div>
      {children}
    </section>
  )
}

/* ---------- boot-up readout ---------- */

function BootStat({ stat, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.3, 1] }}
      transition={{ delay, duration: 0.5, times: [0, 0.4, 0.6, 1] }}
      className="flex flex-col gap-1 border-l border-line pl-4"
    >
      <div className="readout text-xl text-amber sm:text-2xl">
        {stat.value}
        <span className="ml-1 text-xs text-phosphor">{stat.unit}</span>
      </div>
      <div className="readout text-[10px] text-dim">{stat.label}</div>
    </motion.div>
  )
}

/* ---------- hero with pointer-reactive horizon ---------- */

function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const roll = useSpring(useTransform(mx, [-1, 1], [6, -6]), { stiffness: 60, damping: 20 })
  const pitch = useSpring(useTransform(my, [-1, 1], [30, -30]), { stiffness: 60, damping: 20 })

  function onMove(e) {
    if (reduce) return
    const r = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }

  return (
    <header
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden"
    >
      {/* pitch-ladder horizon */}
      <motion.div
        aria-hidden
        style={{ rotate: roll, y: pitch }}
        className="pointer-events-none absolute inset-x-[-20%] top-1/2 -translate-y-1/2"
      >
        <div className="h-px w-full bg-phosphor/40" />
        {[-3, -2, -1, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute left-1/2 flex w-64 -translate-x-1/2 items-center gap-3"
            style={{ top: `${i * 72}px` }}
          >
            <span className="readout w-8 text-right text-[10px] text-phosphor/50">
              {Math.abs(i) * 10}
            </span>
            <div className={`h-px flex-1 ${i < 0 ? 'border-t border-dashed border-phosphor/30 bg-transparent' : 'bg-phosphor/30'}`} />
            <span className="readout w-8 text-[10px] text-phosphor/50">{Math.abs(i) * 10}</span>
          </div>
        ))}
      </motion.div>

      {/* flight-path vector */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-16 w-16 rounded-full border border-amber/60" />
        <div className="absolute left-1/2 top-1/2 h-px w-24 -translate-y-1/2 bg-amber/60" style={{ left: '-96px' }} />
        <div className="absolute top-1/2 h-px w-24 -translate-y-1/2 bg-amber/60" style={{ left: '64px' }} />
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber" />
      </div>

      {/* top bar */}
      <nav className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="readout text-xs text-amber"
        >
          ◆ {profile.callsign} — COMPENDIUM
        </motion.span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="readout hidden gap-6 text-[11px] text-dim sm:flex"
        >
          {[
            ['FLIGHT LOG', '#log'],
            ['DOCTRINE', '#doctrine'],
            ['MISSIONS', '#missions'],
            ['SYSTEMS', '#systems'],
            ['COMMS', '#comms'],
          ].map(([t, href]) => (
            <a key={t} href={href} className="transition-colors hover:text-amber">
              {t}
            </a>
          ))}
        </motion.div>
      </nav>

      {/* center block */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="readout mb-4 text-xs text-phosphor"
        >
          PERSONNEL FILE // SENIOR ENGINEER · PROJECT MANAGER · AI PLATFORM ARCHITECT
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-paper sm:text-6xl lg:text-7xl"
        >
          Rupan
          <br />
          Chakkaravarthy E
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-6 max-w-xl text-lg text-dim"
        >
          <span className="text-amber">{profile.tagline}</span> Ten years of flight simulators,
          avionics displays and XR hardware — now orchestrating fleets of AI agents that ship
          production software.
        </motion.p>
      </div>

      {/* boot readouts */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-10 sm:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
          {stats.map((s, i) => (
            <BootStat key={s.label} stat={s} delay={1.1 + i * 0.18} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="readout mt-8 flex items-center gap-2 text-[10px] text-dim"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-phosphor" />
          ALL SYSTEMS NOMINAL — SCROLL FOR FLIGHT LOG ↓
        </motion.div>
      </div>
    </header>
  )
}

/* ---------- flight log (career timeline) ---------- */

function FlightLog() {
  return (
    <Section id="log" code="SEC 01" title="Flight Log">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-5 text-dim"
        >
          <p className="text-lg leading-relaxed text-paper">{profile.summary}</p>
          <p>
            The through-line is real-time systems where the feedback loop is unforgiving: a shader
            that stutters in a simulator, a display page that renders late in a cockpit, an agent
            that merges broken code. I build the instrumentation, the tests and the gates that keep
            those systems honest — then I make them fast.
          </p>
          <p>
            Currently at {profile.company}, deployed with national aerospace and defense R&D
            organizations as technical manager and architect.
          </p>
        </motion.div>
        <div className="relative">
          <div className="absolute bottom-0 left-[7px] top-2 w-px bg-line" aria-hidden />
          <ol className="space-y-8">
            {timeline.map((t, i) => (
              <motion.li
                key={t.year}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative pl-8"
              >
                <span
                  className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-amber bg-night"
                  aria-hidden
                />
                <div className="readout text-xs text-phosphor">{t.year}</div>
                <div className="font-display text-lg font-semibold uppercase tracking-wide text-paper">
                  {t.phase}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-dim">{t.note}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}

/* ---------- doctrine (how I work) ---------- */

function Doctrine() {
  return (
    <Section id="doctrine" code="SEC 02" title="Operating Doctrine">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {doctrine.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
            className="bezel ticks group p-6 transition-colors hover:border-amber/40"
          >
            <div className="readout mb-3 flex items-center gap-2 text-[10px] text-phosphor">
              <span className="inline-flex h-4 w-4 items-center justify-center border border-phosphor/40 text-[9px] text-phosphor group-hover:border-amber group-hover:text-amber">
                ✓
              </span>
              CHK-{d.id}
            </div>
            <h3 className="font-display text-base font-semibold uppercase tracking-wide text-paper">
              {d.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-dim">{d.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ---------- missions (projects) ---------- */

function ProjectCard({ p, i }) {
  const accent = p.accent === 'amber' ? 'text-amber' : 'text-phosphor'
  const accentBorder = p.accent === 'amber' ? 'hover:border-amber/50' : 'hover:border-phosphor/50'
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: (i % 2) * 0.12, duration: 0.55 }}
      className={`bezel ticks flex flex-col p-6 transition-colors sm:p-8 ${accentBorder}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className={`readout text-[10px] ${accent}`}>▸ {p.tag}</span>
        <span className="readout text-[10px] text-dim">{p.period}</span>
      </div>
      <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-paper">
        {p.name}
      </h3>
      <div className="readout mt-1 text-[11px] text-dim">{p.role}</div>
      <p className="mt-4 text-sm leading-relaxed text-dim">{p.description}</p>
      <ul className="mt-4 flex-1 space-y-2">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-sm leading-snug text-paper/80">
            <span className={`mt-[3px] text-[10px] ${accent}`}>▪</span>
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-4">
        {p.stack.map((s) => (
          <span key={s} className="readout border border-line px-2 py-0.5 text-[10px] text-dim">
            {s}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

function Missions() {
  return (
    <Section id="missions" code="SEC 03" title="Mission Record">
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} />
        ))}
      </div>
    </Section>
  )
}

/* ---------- lab ---------- */

function Lab() {
  return (
    <Section id="lab" code="SEC 04" title="The Hangar — After Hours">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="-mt-6 mb-10 max-w-2xl text-dim"
      >
        Personal experiments in agentic tooling — built nights and weekends to test ideas before
        they reach production platforms.
      </motion.p>
      <div className="grid gap-4 sm:grid-cols-2">
        {lab.map((l, i) => (
          <motion.div
            key={l.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: (i % 2) * 0.1, duration: 0.5 }}
            className="border border-line bg-panel/40 p-5 transition-colors hover:border-phosphor/40"
          >
            <h3 className="font-display text-base font-semibold uppercase tracking-wide text-phosphor">
              {l.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-dim">{l.desc}</p>
            <div className="readout mt-3 text-[10px] text-dim/70">{l.stack}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ---------- systems (tech stack) ---------- */

function Systems() {
  return (
    <Section id="systems" code="SEC 05" title="Systems Inventory">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {systems.map((sys, i) => (
          <motion.div
            key={sys.code}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="bezel p-5"
          >
            <div className="readout text-[10px] text-amber">{sys.code}</div>
            <h3 className="mt-1 font-display text-sm font-semibold uppercase tracking-wide text-paper">
              {sys.name}
            </h3>
            <ul className="mt-3 space-y-1.5 border-t border-line pt-3">
              {sys.items.map((item) => (
                <li key={item} className="text-[13px] leading-snug text-dim">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ---------- comms (contact) ---------- */

function Comms() {
  return (
    <Section id="comms" code="SEC 06" title="Comms">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bezel ticks p-8 sm:p-12"
      >
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-display text-2xl font-semibold uppercase tracking-wide text-paper">
              Open channel.
            </p>
            <p className="mt-3 max-w-md text-dim">
              For roles, contracts or collaborations in agentic AI platforms, XR and simulation, or
              hard real-time systems — transmit on any frequency below.
            </p>
          </div>
          <div className="readout space-y-3 text-sm">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-paper transition-colors hover:text-amber">
              <span className="text-[10px] text-phosphor">EMAIL</span> {profile.email}
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-paper transition-colors hover:text-amber">
              <span className="text-[10px] text-phosphor">VOICE</span> {profile.phone}
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-paper transition-colors hover:text-amber">
              <span className="text-[10px] text-phosphor">REPO</span> github.com/RupanRC
            </a>
            <div className="flex items-center gap-3 text-paper">
              <span className="text-[10px] text-phosphor">BASE</span> {profile.location}
            </div>
          </div>
        </div>
      </motion.div>
      <footer className="readout mt-16 flex flex-col items-center gap-2 pb-4 text-center text-[10px] text-dim/60">
        <div>◆ {profile.callsign} — COMPENDIUM // BUILT WITH REACT + FRAMER MOTION // DEPLOYED ON VERCEL</div>
        <div>END OF FILE — {new Date().getFullYear()}</div>
      </footer>
    </Section>
  )
}

/* ---------- app ---------- */

export default function App() {
  const [booted, setBooted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`grid-bg min-h-screen transition-opacity duration-500 ${booted ? 'opacity-100' : 'opacity-0'}`}>
      <Hero />
      <FlightLog />
      <Doctrine />
      <Missions />
      <Lab />
      <Systems />
      <Comms />
    </div>
  )
}
