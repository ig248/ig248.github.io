---
layout: post
title: "Sharing 3d models using HTML+JS"
date: "2017-03-20"
slug: "embed_3d"
description: ""
category: 
  - views
# tags will also be used as html meta keywords.
tags:
  - 3d
  - JavaScript
show_meta: true
comments: true
gistembed: true
published: true
noindex: false
nofollow: false
# hide QR code, permalink block while printing.
hide_printmsg: false
# show post summary or full post in RSS feed.
summaryfeed: false

threejs: true
---

<div id="div3d" ></div>
<script src="{{ site.jsurl }}3d/house.js"></script> 

<!--more-->

A recent conversation with an architect friend made me think that it should be possible to use HTML+JS to share interactive CAD models and designs online. Luckily, I did not have to re-invent the wheel too much: Three.js is just the tool for the job. However, getting all the parts to work in a Jekyll blog took some trial and error (and is still work-in-progress).

I have exported the test model and textures from Revit:

Having barely used JavaScript *or* Jekyll before, it has been a good crash course in several technologies. Plus, preparing the model required some work on the back end which I will outline later.

The shape and textures are (mostly) there, but there are still a few things I would like to improve:

1. Add a full-screen viewing mode
2. Add a loading bar/message
3. Fix a few broken textures
4. Improve camera controls
5. Enable "walking around"
6. (Would be cool) add VR viewing mode - this seems to be the future!

On the Jekyll side, there is more refactoring to be done - not so much for 3D models specifically, but to build an easy framework for embedding other JS libraries (such as Plotly for interactive graphs) without unnecessary boilerplate.
