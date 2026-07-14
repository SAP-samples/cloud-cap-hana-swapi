// D3 force-directed graph renderer, decoupled from Vue so the view stays thin.
// The view supplies a container element + {nodes, links}; this module owns the
// simulation, zoom/pan, drag, and click callbacks.
import * as d3 from 'd3'

// Stable colour per entity "type" (the short name after the last dot).
const COLORS = d3.scaleOrdinal(d3.schemeTableau10)

export function createForceGraph(container, { onNodeClick } = {}) {
  let width = container.clientWidth || 800
  let height = container.clientHeight || 600

  const svg = d3.select(container).append('svg')
    .attr('width', '100%').attr('height', '100%')
    .attr('viewBox', [0, 0, width, height])

  const root = svg.append('g')
  const linkG = root.append('g').attr('stroke', '#94a3b8').attr('stroke-opacity', 0.4)
  const nodeG = root.append('g')

  svg.call(d3.zoom().scaleExtent([0.2, 4]).on('zoom', (e) => root.attr('transform', e.transform)))

  const sim = d3.forceSimulation()
    .force('link', d3.forceLink().id((d) => d.id).distance(80))
    .force('charge', d3.forceManyBody().strength(-220))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide(24))

  let linkSel = linkG.selectAll('line')
  let nodeSel = nodeG.selectAll('g')

  function typeOf(id) { return String(id).split('.').pop() }

  function setLinkStrength(dist) {
    sim.force('link').distance(dist)
    sim.alpha(0.5).restart()
  }

  function update({ nodes, links }) {
    sim.nodes(nodes)
    sim.force('link').links(links)

    linkSel = linkSel.data(links, (d) => `${d.source.id ?? d.source}-${d.target.id ?? d.target}-${d.name}`)
    linkSel.exit().remove()
    linkSel = linkSel.enter().append('line').attr('stroke-width', 1.2).merge(linkSel)

    nodeSel = nodeSel.data(nodes, (d) => d.id)
    nodeSel.exit().remove()
    const enter = nodeSel.enter().append('g').style('cursor', 'pointer')
    enter.append('circle').attr('r', 12).attr('fill', (d) => COLORS(typeOf(d.id)))
      .attr('stroke', '#fff').attr('stroke-width', 1.5)
    enter.append('text').text((d) => d.label ?? typeOf(d.id))
      .attr('x', 16).attr('y', 4).attr('font-size', 11).attr('fill', 'currentColor')
    enter.call(d3.drag()
      .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y })
      .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y })
      .on('end', (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null }))
    enter.on('click', (_, d) => onNodeClick?.(d))
    nodeSel = enter.merge(nodeSel)

    sim.on('tick', () => {
      linkSel
        .attr('x1', (d) => d.source.x).attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x).attr('y2', (d) => d.target.y)
      nodeSel.attr('transform', (d) => `translate(${d.x},${d.y})`)
    })
    sim.alpha(0.8).restart()
  }

  function destroy() { sim.stop(); svg.remove() }

  return { update, setLinkStrength, destroy, typeOf }
}
