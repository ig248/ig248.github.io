---
plotly: true
mathjax: true
---

## Test Mathjax
This is a simple equation:

$$x=y^2$$

## Test plotly


```python
import plotly.offline as py
py.init_notebook_mode(connected=True)
from plotly.graph_objs import *
```


```python
py.iplot([{"x": [1, 2, 3], "y": [3, 1, 6]}])
```


<div id="e5fd8d06-1163-4893-af3e-05aa701264d3" style="height: 525px; width: 100%;" class="plotly-graph-div"></div><script type="text/javascript">require(["plotly"], function(Plotly) { window.PLOTLYENV=window.PLOTLYENV || {};window.PLOTLYENV.BASE_URL="https://plot.ly";Plotly.newPlot("e5fd8d06-1163-4893-af3e-05aa701264d3", [{"y": [3, 1, 6], "x": [1, 2, 3]}], {}, {"linkText": "Export to plot.ly", "showLink": true})});</script>



```python

```
