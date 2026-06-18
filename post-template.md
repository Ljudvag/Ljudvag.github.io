---
layout: post
title: Post Title Here
date: 2026-01-01
heading: Post Title Here
marquee: Posted on January 1, 2026
category: general
# Five Leagues campaign turns ONLY: change "layout: post" to "layout: turn",
# set "category: 5leagues", and add these lines:
# campaign: 1
# turn: 1
# excerpt: One-line summary shown in the turn lists
---
{% comment %}
  ============================================================
  HOW TO USE THIS TEMPLATE
  ------------------------------------------------------------
  1. Copy this file into _posts/ and rename it:
        _posts/YYYY-MM-DD-a-short-title.md
     (the date at the start of the filename is required)
  2. Fill in the front matter above (title, date, heading, marquee,
     category). Heading is the big title; marquee is the scrolling line.
  3. Write the post below in Markdown.
  4. Commit and push -- GitHub rebuilds the site automatically and the
     post appears in the right lists on its own.

  You can leave this comment block in or delete it: Liquid strips
  {% comment %} blocks out of the published page either way.

  AVAILABLE CATEGORIES  (the "category:" line in the front matter)
  ------------------------------------------------------------
     general    Plain blog post. Shows on the home page and /blog/.
     music      Music post. Also shows on the Music page.
     minis      Miniatures post. Also shows on the Miniatures page.
     5leagues   A Five Leagues campaign turn. Does NOT show on the home
                page or /blog/ -- it lives in the Five Leagues section
                (/five-leagues/turns/). Campaign turns also use the "turn"
                layout and set three extra fields:
                  layout:    turn   (instead of post -- gives Five Leagues chrome)
                  campaign:  which campaign (e.g. 1 = Wilhelms Hounds)
                  turn:      the turn number within that campaign
                  excerpt:   one-line summary shown in the turn lists
                campaign + turn keep separate campaigns from ever being mixed up.
  ============================================================
{% endcomment %}

Write your post here in **Markdown**.

You can use *italics*, **bold**, [links](https://example.com), lists, images,
and plain HTML if you need it.
