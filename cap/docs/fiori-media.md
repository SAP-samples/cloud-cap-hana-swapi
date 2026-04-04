# Media Browser App

The Media app is a **read-only** browser that shows Films and Shows together in a single list using the `Media` CDS view — a SQL UNION of the `Film` and `Show` tables. It surfaces the `StarWarsShow` service.

Annotation file: `cap/srv/media-fiori.cds`

## The Media View

`Media` is a `define view` in `cap/db/schema.cds`. It unions `Film` and `Show` into a single flat projection with a `media_type` discriminator:

| `media_type` value | Source entity |
| --- | --- |
| `'FILM'` | `Film` |
| `'SHOW'` | `Show` |

Fields that do not apply to one type are projected as `null` (e.g., `opening_crawl` is null for Shows, `seasons` is null for Films).

## List Report

| Column | Field | Notes |
| --- | --- | --- |
| Title | `title` | |
| Type | `media_type` | `FILM` or `SHOW` |
| Show Type | `show_type` | `LIVE_ACTION_SERIES` etc. (null for films) |
| Release Date | `release_date` | |
| Director | `director` | |
| Seasons | `seasons` | null for films |
| Episode Count | `episode_count` | null for films |
| Network | `network` | null for films |

**Selection fields (filter bar):** media_type, show_type, network, director, release_date

## Object Page

**Header:** Title (title field), media_type (description).

**Tabs:**

| Tab | Visible when | Contents |
| --- | --- | --- |
| General | Always | `edit_url` link, title, media_type, director, producer, release_date |
| Show Details | `media_type = 'SHOW'` | show_type, seasons, episode_count, network |
| Film Details | `media_type = 'FILM'` | episode_id, opening_crawl |

The conditional tab visibility is driven by `![@UI.Hidden]` with an `$edmJson` expression — no custom controller code is required.

## The edit_url Field

`edit_url` is a **virtual field** on the `Media` view — it is not stored in the database. The `StarWarsShow` service handler (`cap/srv/show-service.js`) populates it on every READ:

```js
this.after('READ', 'Media', results => {
    for (const m of [].concat(results)) {
        m.edit_url = m.media_type === 'FILM'
            ? `/film/webapp/index.html#star-wars-film&/Film(ID=${m.ID},IsActiveEntity=true)`
            : `/show/webapp/index.html#star-wars-show&/Show(ID=${m.ID},IsActiveEntity=true)`
    }
})
```

On the Object Page, the General tab renders `edit_url` as a `DataFieldWithUrl` — a clickable link that deep-navigates to the Film or Show editor app for that specific record.

## No Write Operations

`Media` is a read-only view. There is no create, update, or delete path through this app. To edit a Film or Show, use the deep-link from the General tab's "Open in Edit App" field.
