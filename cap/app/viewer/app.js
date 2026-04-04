/* global Vue axios */
const GET = (url) => axios.get('/odata/v4/-data' + url)
const storageGet = (key, def) => localStorage.getItem('data-viewer:' + key) ?? def
const storageSet = (key, val) => localStorage.setItem('data-viewer:' + key, val)

const columnKeysFirst = (c1, c2) => {
  if (c1.isKey && !c2.isKey) return -1
  if (!c1.isKey && c2.isKey) return 1
  if (c1.isKey && c2.isKey) return c1.name.localeCompare(c2.name)
  return 0
}

const app = Vue.createApp({

  data() {
    const savedTheme = localStorage.getItem('data-viewer:theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    return {
      // Theme
      theme: savedTheme,
      // Data source
      dataSource: storageGet('data-source', 'db'),
      // Pagination
      skip: Number(storageGet('skip', 0)),
      top:  Number(storageGet('top', 20)),
      totalCount: 0,
      // Entities + columns
      entity:   storageGet('entity') ? JSON.parse(storageGet('entity')) : undefined,
      entities: [],
      columns:  [],
      // Raw data (string[][])
      data: [],
      loading: false,
      error: undefined,
      // Sort
      sortState: { col: null, dir: null },
      // Search
      search: '',
      // Column visibility
      hiddenCols: new Set(),
      showColPanel: false,
      // Row selection
      rowDetails: {},
      rowKey: storageGet('row-key', ''),
      activeRowIndex: -1,
      // Toast
      toastVisible: false,
      toastMessage: '',
    }
  },

  computed: {
    sortedData() {
      const { col, dir } = this.sortState
      if (col === null || dir === null) return this.data
      return [...this.data].sort((a, b) => {
        const cmp = String(a[col]).localeCompare(String(b[col]), undefined, { numeric: true, sensitivity: 'base' })
        return dir === 'asc' ? cmp : -cmp
      })
    },

    filteredData() {
      if (!this.search) return this.sortedData
      const q = this.search.toLowerCase()
      return this.sortedData.filter(row =>
        row.some((cell, i) => !this.hiddenCols.has(i) && String(cell).toLowerCase().includes(q))
      )
    },

    displayKey() {
      if (!this.columns.length || !Object.keys(this.rowDetails).length) return ''
      return this.columns
        .filter(c => c.isKey)
        .map(c => this.rowDetails[c.name] ?? '')
        .join(', ')
    },
  },

  watch: {
    dataSource(v) { storageSet('data-source', v); this.fetchEntities() },
    skip(v)       { storageSet('skip', v); if (this.entity) this.fetchData() },
    top(v)        { storageSet('top', v);  this.skip = 0; if (this.entity) this.fetchData() },

    showColPanel(open) {
      if (open) {
        this._colPanelHandler = (e) => {
          if (!this.$refs.gearWrap.contains(e.target)) this.showColPanel = false
        }
        document.addEventListener('click', this._colPanelHandler)
      } else {
        document.removeEventListener('click', this._colPanelHandler)
      }
    },
  },

  mounted() {
    document.addEventListener('keydown', this._onKeydown.bind(this))
    this.fetchEntities()
  },

  methods: {

    // ── Theme ──────────────────────────────────────────────
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      if (this.theme === 'light') {
        document.documentElement.dataset.theme = 'light'
      } else {
        delete document.documentElement.dataset.theme
      }
      storageSet('theme', this.theme)
    },

    // ── Entity fetching ────────────────────────────────────
    async fetchEntities() {
      let url = '/Entities'
      if (this.dataSource === 'db') url += '?dataSource=db'
      const { data } = await GET(url)
      this.entities = data.value
      this.entities.forEach(e => e.columns.sort(columnKeysFirst))
      const entity = this.entity && this.entities.find(e => e.name === this.entity.name)
      if (entity) {
        this.columns = entity.columns
        await this.fetchData()
      } else {
        this.entity = undefined
        this.columns = []
        this.data = []
        this.rowDetails = {}
      }
    },

    inspectEntity(entity) {
      this.entity = entity
      storageSet('entity', JSON.stringify(entity))
      this.columns = this.entities.find(e => e.name === entity.name).columns
      // Reset per-entity state
      this.search = ''
      this.hiddenCols = new Set()
      this.sortState = { col: null, dir: null }
      this.skip = 0
      this.activeRowIndex = -1
      this.rowDetails = {}
      this.rowKey = ''
      storageSet('row-key', '')
      document.title = 'Data Browser \u2014 ' + entity.name
      return this.fetchData()
    },

    // ── Data fetching ──────────────────────────────────────
    async fetchData() {
      let url = `/Data?entity=${this.entity.name}&$skip=${this.skip}&$top=${this.top}&$count=true`
      if (this.dataSource === 'db') url += '&dataSource=db'
      this.loading = true
      try {
        const { data } = await GET(url)
        this.totalCount = data['@odata.count'] ?? 0
        const colIdx = {}
        this.columns.forEach((c, i) => { colIdx[c.name] = i })
        this.data = data.value.map(d =>
          d.record
            .sort((r1, r2) => colIdx[r1.column] - colIdx[r2.column])
            .map(r => r.data)
        )
        // Restore row selection if key still exists on this page
        const row = this.data.find(r => this._makeRowKey(r) === this.rowKey)
        if (row) {
          this.activeRowIndex = this.filteredData.indexOf(row)
          this._setRowDetails(row)
        } else {
          this.rowDetails = {}
          this.activeRowIndex = -1
        }
        this.error = undefined
      } catch (err) {
        this.data = []
        this.rowDetails = {}
        this.activeRowIndex = -1
        this.error = err.response?.data?.error ?? { code: err.code, message: err.message }
      } finally {
        this.loading = false
      }
    },

    // ── Row selection ──────────────────────────────────────
    selectRow(idx) {
      this.activeRowIndex = idx
      const row = this.filteredData[idx]
      this.rowKey = this._makeRowKey(row)
      storageSet('row-key', this.rowKey)
      this._setRowDetails(row)
    },

    // Select row and copy the clicked cell value (single click on <td>)
    selectAndCopy(rowIdx, cellValue) {
      this.selectRow(rowIdx)
      this.copyCell(cellValue)
    },

    _setRowDetails(row) {
      this.rowDetails = {}
      row.forEach((val, i) => {
        this.rowDetails[this.columns[i].name] = val
      })
    },

    _makeRowKey(row) {
      return row
        .filter((_, i) => this.columns[i]?.isKey)
        .reduce((acc, v) => acc + v, '')
    },

    dismissDetail() {
      this.rowDetails = {}
      this.rowKey = ''
      storageSet('row-key', '')
      this.activeRowIndex = -1
    },

    isKeyColumn(colName) {
      return this.columns.some(c => c.name === colName && c.isKey)
    },

    // ── Sort ───────────────────────────────────────────────
    sortBy(colIdx) {
      const s = this.sortState
      if (s.col !== colIdx) {
        this.sortState = { col: colIdx, dir: 'asc' }
      } else if (s.dir === 'asc') {
        this.sortState = { col: colIdx, dir: 'desc' }
      } else {
        this.sortState = { col: null, dir: null }
      }
    },

    // ── Pagination ─────────────────────────────────────────
    prevPage() {
      if (this.skip > 0) this.skip = Math.max(0, this.skip - this.top)
    },
    nextPage() {
      if (this.skip + this.top < this.totalCount) this.skip += this.top
    },

    // ── Column visibility ──────────────────────────────────
    toggleCol(idx) {
      const h = new Set(this.hiddenCols)
      if (h.has(idx)) h.delete(idx)
      else h.add(idx)
      this.hiddenCols = h
    },

    // ── Copy + toast ───────────────────────────────────────
    copyCell(value) {
      navigator.clipboard.writeText(String(value ?? ''))
      this.toastMessage = 'Copied \u2713'
      this.toastVisible = true
      clearTimeout(this._toastTimer)
      this._toastTimer = setTimeout(() => { this.toastVisible = false }, 1500)
    },

    // ── Keyboard navigation ────────────────────────────────
    _onKeydown(e) {
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (this.activeRowIndex < this.filteredData.length - 1) {
          this.selectRow(this.activeRowIndex + 1)
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (this.activeRowIndex > 0) {
          this.selectRow(this.activeRowIndex - 1)
        }
      } else if (e.key === 'Escape') {
        this.dismissDetail()
        this.showColPanel = false
      }
    },

  }
})

app.mount('#app')
