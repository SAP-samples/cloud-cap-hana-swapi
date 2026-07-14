// Canvas 2D hyperspace starfield. Stars are seeded from real planet data:
// population → count weight, terrain/climate → hue, name → identity on click.
// Deliberately non-Fiori — this is the "fun" showcase.

export function createHyperspace(canvas, planets, { onSelect } = {}) {
  const ctx = canvas.getContext('2d')
  let W, H, cx, cy, dpr
  let raf = 0
  let speed = 1            // 1 = cruising; ramps up for the "jump"
  let targetSpeed = 1
  let stars = []
  let selected = null

  // Map a planet to a hue: crude hash of terrain/climate string.
  function hueFor(p) {
    const s = (p.terrain || p.climate || p.name || '') + ''
    let h = 0
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360
    return h
  }

  function seed() {
    // Weight star count by log(population); fall back to a baseline.
    stars = []
    const base = planets.length ? planets : [{ name: 'Unknown', population: 1000 }]
    for (const p of base) {
      const pop = Number(p.population) || 1000
      const weight = Math.max(1, Math.min(6, Math.round(Math.log10(pop + 10) - 1)))
      for (let i = 0; i < weight; i++) {
        stars.push(makeStar(p))
      }
    }
    // Pad to a lively minimum.
    while (stars.length < 220) stars.push(makeStar(base[stars.length % base.length]))
  }

  function makeStar(planet) {
    return {
      x: (Math.random() - 0.5) * W,
      y: (Math.random() - 0.5) * H,
      z: Math.random() * W,
      pz: 0,
      hue: hueFor(planet),
      planet,
    }
  }

  function resize() {
    dpr = window.devicePixelRatio || 1
    W = canvas.clientWidth; H = canvas.clientHeight
    canvas.width = W * dpr; canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    cx = W / 2; cy = H / 2
  }

  function frame() {
    speed += (targetSpeed - speed) * 0.05
    // Trails: translucent fill instead of clear.
    ctx.fillStyle = 'rgba(2,4,12,0.35)'
    ctx.fillRect(0, 0, W, H)

    for (const s of stars) {
      s.pz = s.z
      s.z -= speed * 6
      if (s.z <= 1) { Object.assign(s, makeStar(s.planet), { z: W }) }

      const k = 128 / s.z
      const px = cx + s.x * k
      const py = cy + s.y * k
      const pk = 128 / s.pz
      const ppx = cx + s.x * pk
      const ppy = cy + s.y * pk

      const size = Math.max(0.5, (1 - s.z / W) * 2.4)
      const light = 55 + (1 - s.z / W) * 30
      ctx.strokeStyle = `hsl(${s.hue}, 80%, ${light}%)`
      ctx.lineWidth = size
      ctx.beginPath(); ctx.moveTo(ppx, ppy); ctx.lineTo(px, py); ctx.stroke()
      s.sx = px; s.sy = py // remember screen pos for hit-testing
    }

    if (selected) {
      ctx.fillStyle = 'rgba(248,250,252,0.95)'
      ctx.font = '600 20px system-ui'
      ctx.textAlign = 'center'
      ctx.fillText(selected.name || 'Unknown planet', cx, cy - 40)
      ctx.font = '13px system-ui'
      ctx.fillStyle = 'rgba(203,213,225,0.9)'
      const meta = [selected.climate, selected.terrain].filter(Boolean).join(' · ')
      if (meta) ctx.fillText(meta, cx, cy - 16)
      if (selected.population) ctx.fillText('Population: ' + selected.population, cx, cy + 4)
    }

    raf = requestAnimationFrame(frame)
  }

  function jump() { targetSpeed = 14; setTimeout(() => { targetSpeed = 1 }, 900) }

  function hit(mx, my) {
    let best = null, bestD = 22
    for (const s of stars) {
      if (s.sx == null) continue
      const d = Math.hypot(s.sx - mx, s.sy - my)
      if (d < bestD) { bestD = d; best = s }
    }
    if (best) { selected = best.planet; onSelect?.(best.planet); jump() }
  }

  function start() {
    resize(); seed()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(frame)
  }
  function destroy() { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }

  return { start, destroy, jump, hit }
}
