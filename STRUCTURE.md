# How this site is built

A plain-language map of the site so you can find and change things
without guessing. Keep this file updated as the site grows.

## The big idea: Jekyll builds the site for you

This site uses **Jekyll**, a *static site generator*. You never run it
yourself — **GitHub runs Jekyll automatically every time you push to
`main`**, turns these source files into plain HTML, and serves that.

```
you push to main  ->  GitHub runs Jekyll  ->  plain HTML served at ljudvag.github.io
```

The upshot: you edit simple source files (and write posts in Markdown),
and the repetitive HTML (page header, menu, footer) is filled in for you.

## Folder map

| Path | What it is |
|------|------------|
| `_config.yml` | Global settings. Commented — read it. |
| `_layouts/` | Page templates. The shared HTML "frame" pages sit inside. |
| `_layouts/default.html` | The site frame: `<head>`, heading, menu, footer. Every page uses it. |
| `_layouts/post.html` | A blog post, wrapped by `default.html`. |
| `_includes/` | Reusable HTML snippets pulled into layouts. |
| `_includes/menu.html` | The navigation menu. Edit links here once; all pages update. |
| `_posts/` | The main blog ("random projects"). One Markdown file per post. |
| `index.html` | The home page. |
| `music/`, `miniatures/`, `dk3k/`, ... | Section pages (still plain HTML). |
| `assets/` | CSS, fonts, images, JavaScript. |
| `archive/` | A frozen copy of the OLD pre-Jekyll site, kept for reference only. Not part of the live site (excluded in `_config.yml`). |

## How the pieces fit together

A page like `index.html` starts with a small block of settings called
**front matter**, fenced by `---`:

```
---
layout: default
title: "++ Ljudvag Home ++"
heading: A World Wide Web web site
marquee: Best viewed in a browser
---
<div class="content-box"> ...your page content... </div>
```

- `layout: default` tells Jekyll to drop this page's content inside
  `_layouts/default.html` (which supplies the header, menu, and footer).
- `title`, `heading`, `marquee` are values the layout reads to fill in
  the `<title>` tag, the big `<h1>`, and the scrolling marquee.
- Everything below the second `---` is the page's own content.

**Important:** front matter must be the *very first thing* in a file.
A file with no front matter is copied through untouched (which is how the
not-yet-converted pages and all the campaign app's JavaScript keep working).

## Categories (tags)

Every post has a `category` — a simple tag used to decide where it shows up:

| `category` | Shows on |
|------------|----------|
| `general` | home + `/blog/` |
| `music` | home + `/blog/` + the Music page's "Recent Music Posts" |
| `minis` | home + `/blog/` + the Miniatures page's posts |
| `5leagues` | **only** the Five Leagues section (see below) |

A page that wants a subset just filters by category in Liquid, e.g. the
Music page does `site.posts | where: "category", "music"`. The home page
and `/blog/` show everything **except** `5leagues` turns.

**Five Leagues campaign turns** are the one special case (built in Batch 3).
They use `category: 5leagues` plus two extra fields that keep campaigns from
ever being mixed up:

- `campaign:` — which campaign (matches the `cN/` folder and `?c=N`)
- `turn:` — the turn number *within* that campaign

The Five Leagues overview filters to one `campaign` and orders by `turn`, so
several campaigns can run at once without their turns interleaving.

## How to add a blog post

The quickest way: copy `post-template.md` (in the repo root) into `_posts/`,
rename it with a date, and edit it. The template lists every category in a
comment so you don't have to remember them.

Step by step:

1. Create a file in `_posts/` named `YYYY-MM-DD-some-title.md`
   (the date in the filename is required).
2. Give it front matter and write the body in Markdown:

   ```
   ---
   layout: post
   title: My New Post
   date: 2026-06-18
   heading: My New Post
   marquee: Posted on June 18, 2026
   category: general
   ---

   Write the post here in **Markdown**.
   ```

3. Commit and push. GitHub rebuilds the site; the post appears at
   `/blog/my-new-title/` and is automatically listed in **Recent Posts**
   on the home page. There is no list to update by hand.

## The Five Leagues subsite

Five Leagues lives under `/five-leagues/` and is meant to feel like its own
little site: it has its own menu (`_includes/fiveleagues-menu.html`) and its
own layouts, separate from the main site.

- **The interactive app** (`five-leagues/index.html`, `map.html`, `warband.html`,
  `overview.html`, the `cN/` data, etc.) is hand-written HTML + JavaScript. It
  has no front matter, so Jekyll passes it through untouched.
- **Campaign turns** are posts in `_posts/` with `category: 5leagues` and the
  `turn` layout. They show at `/five-leagues/turns/` (the Five Leagues "blog"),
  grouped by `campaign` and ordered by `turn` — so multiple campaigns never mix.
- **`blog/posts.js` is generated** by Jekyll from those turns. The interactive
  app reads it exactly as before, but you never edit it by hand now — add a turn
  file in `_posts/` and the app picks it up. (It is emitted in the app's old
  `5Leagues-N` format on purpose, so the app code didn't have to change.)

## Roadmap (rework in progress)

This site is mid-migration from the old hand-built version. Done / planned:

- [x] **Batch 1 — foundation:** Jekyll config, `default`/`post` layouts,
      menu include, home page, first post migrated, this document.
- [x] **Batch 2 — pages:** converted `music`, `miniatures`, `dk3k`,
      `oskars-pixel-art`, `external-links` to the layout; added a `/blog/`
      index; replaced the per-page post-listing JavaScript with Liquid.
- [x] **Batch 3 — Five Leagues subsite:** moved the campaign app to
      `/five-leagues/` with its own `fiveleagues` layout + menu and a `turn`
      layout; migrated the campaign turns into `_posts/` (category
      `5leagues`); added `/five-leagues/turns/` (the Five Leagues "blog");
      `blog/posts.js` is now generated from `_posts/` so the interactive app
      feeds itself.
- [ ] **Batch 4 — cleanup:** delete `menu.js`, the old `blog/*.html` turn
      files, the duplicated render code, and dead CSS.
