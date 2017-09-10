---
layout: post
title: "MathJax and Plotly in Jekyll"
date: "2017-09-10"
slug: ""
description: "Include Jupyter-generated plotly graphs in Jekyll posts"
# tags will also be used as html meta keywords.
tags:
  - JavaScript
  - jekyll
  - jupyter
  - plotly
  - LaTeX
show_meta: true
comments: true
mathjax: true
plotly: true
gistembed: true
published: true
noindex: false
nofollow: false
# hide QR code, permalink block while printing.
hide_printmsg: false
# show post summary or full post in RSS feed.
summaryfeed: false
---
One of the more attractive features of Jekyll is the ability to [post Jupyter notebooks](https://briancaffey.github.io/2016/03/14/ipynb-with-jekyll.html) with little or no extra work.

Out of the box, Jekyll [supports](https://jekyllrb.com/docs/extras/) $\LaTeX$ typesetting via [MahJax](https://www.mathjax.org/) - though it may take some extra
[steps](http://haixing-hu.github.io/programming/2013/09/20/how-to-use-mathjax-in-jekyll-generated-github-pages/) to configure it.
 
The only feature I missed was the ability to create posts from notebooks with interactive [Plotly](https://plot.ly/) graphs, like so:

<div id="25d25829-71c7-4986-9ecd-221b42db4d9e" style="height: 525px; width: 100%;" class="plotly-graph-div"></div><script type="text/javascript">require(["plotly"], function(Plotly) { window.PLOTLYENV=window.PLOTLYENV || {};window.PLOTLYENV.BASE_URL="https://plot.ly";Plotly.newPlot("25d25829-71c7-4986-9ecd-221b42db4d9e", [{"y": [0, 2, 1, 4], "x": [0, 1, 2, 4]}], {}, {"linkText": "Export to plot.ly", "showLink": true})});</script>

Since it took me a while to get everything working, I decided to keep this post for future record - and maybe save someone else a bit of time.
<!--more-->

## Generating the plot
The above plot was generated inside a Jupyter notebook:

```python
import plotly.offline as py
py.init_notebook_mode(connected=True)
py.iplot([{"x": [0, 1, 2, 4], "y": [0, 2, 1, 4]}])
```

The resulting code used in this post looks something like
```html
<div id="25d25829-71c7-4986-9ecd-221b42db4d9e" style="height: 525px; width: 100%;" class="plotly-graph-div"></div><script type="text/javascript">require(["plotly"], function(Plotly) { window.PLOTLYENV=window.PLOTLYENV || {};window.PLOTLYENV.BASE_URL="https://plot.ly";Plotly.newPlot("25d25829-71c7-4986-9ecd-221b42db4d9e", [{"y": [0, 2, 1, 4], "x": [0, 1, 2, 4]}], {}, {"linkText": "Export to plot.ly", "showLink": true})});</script>
```

## Including the header in Jekyll
It is easy enough to export the Jupyter notebook to Markdown and inspect the content.
Note the `connected=True` argument: we don't want to include the `plotly.js` code into every post.

Instead, the exported notebook contains the header
```html
<script>
requirejs.config({paths: { 'plotly': ['https://cdn.plot.ly/plotly-latest.min']},});
if(!window.Plotly) { {require(['plotly'],function(plotly) {window.Plotly=plotly;});} };
</script>
``` 

To include it in Jekyll posts, I use a separate include file, `_includes/plotly_support.html`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.10/require.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script>
requirejs.config({paths: { 'plotly': ['https://cdn.plot.ly/plotly-latest.min']},});
if(!window.Plotly) { {require(['plotly'],function(plotly) {window.Plotly=plotly;});} };
</script>
```

To load plotly (and MathJax) only for posts that actually use it, I edit `_includes/head.html` (this will vary depending on the site structure used):
{% raw %}
```html
{% if page.plotly %}
  {% include plotly_support.html %}
{% endif %}


{% if page.mathjax %}
  {% include mathjax_support.html %}
{% endif %}
```
{% endraw %}

Finally, edit the top matter of the post in question:
```html
---
plotly: true
mathjax: true
---
```
Since I am using both in previews, same is required in the top matter of both `index.md` and `blog/index.html` - voile!

## Plotly - MathJax CSS conflict
Unfortunately, importing plotly appears to make changes to CSS that interfere with positioning of MathJax display maths equatuions. This seems related to the bug described [here](https://github.com/plotly/plotly.py/issues/360).

This prevents equations from rendering centered. I found an acceptable work-around by increasing the indent for left-aligned equations in MathJax [conifiguration options](http://docs.mathjax.org/en/latest/options/hub.html):
```html
displayAlign: "left",
displayIndent: "3em",
``` 
