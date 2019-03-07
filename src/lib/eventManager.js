export const eventManager = {
  events: new Map(),

  on(e, cb) {
    this.events.has(e) || this.events.set(e, [])

    this.events.get(e).push(cb)

    return this
  },

  off(e) {
    this.events.delete(e)
    return this
  },

  emit(e, ...args) {
    if (!this.events.has(e)) {
      return false
    }
    this.events
      .get(e)
      /* eslint-disable-next-line */
      .forEach(cb => setTimeout(() => cb.call(null, ...args), 0))
    return true
  }
}
