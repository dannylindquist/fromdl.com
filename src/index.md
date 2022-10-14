---
layout: layouts/base.webc
title: Home
---

<p class="text-4xl font-semibold tracking-tight">Hey there!</p>
I'm Danny, a web developer from Seattle 🌧. I have a passion for the web and exploring all you can do with it. This is a place for me to write down things I'm learning and find interesting. Hope you enjoy it too.

## Recent posts

<div class="not-prose">
{%- for post in collections.post -%}
  <a class="block" href="{{ post.url }}">
    <div class="text-xl font-semibold underline">
      {{ post.data.title }} - {{ post.data.date | niceDate }}
    </div> 
    <div>
    {{ post.data.excerpt }}
    </div>
  </a>
{%- endfor -%}
</div>