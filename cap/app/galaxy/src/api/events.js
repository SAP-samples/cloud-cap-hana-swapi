// EventSource wrapper for the CAP SSE bridge at /events/stream.
// Auto-reconnects with backoff and reports connection state to the caller.

/**
 * Connect to the server-sent event stream.
 * @param {(msg: {event: string, data: any}) => void} onMessage
 * @param {(state: 'connecting'|'open'|'reconnecting') => void} onState
 * @returns {() => void} disconnect function
 */
export function connectEvents(onMessage, onState = () => {}) {
  let es
  let closed = false
  let retry = 1000

  const open = () => {
    onState(retry === 1000 ? 'connecting' : 'reconnecting')
    es = new EventSource('/events/stream')

    es.onopen = () => { retry = 1000; onState('open') }

    // Named events (People.Changed.v1, Show.Refreshed.v1) plus a generic fallback.
    const handler = (evt) => {
      let data
      try { data = JSON.parse(evt.data) } catch { data = evt.data }
      onMessage({ event: evt.type, data })
    }
    es.addEventListener('People.Changed.v1', handler)
    es.addEventListener('Show.Refreshed.v1', handler)
    es.onmessage = handler // default (unnamed) events

    es.onerror = () => {
      es.close()
      if (closed) return
      retry = Math.min(retry * 2, 15000)
      onState('reconnecting')
      setTimeout(open, retry)
    }
  }

  open()
  return () => { closed = true; es?.close() }
}
