 // create an array with nodes
  var nodes = new vis.DataSet([
    {id: 1, label: 'Check Kaggle'},
    {id: 2, label: 'Submit Entry'},
    {id: 3, label: 'Think About Problem'},
    {id: 4, label: 'Create/Visit  Kernel'},
    {id: 5, label: 'View Results'},
    {id: 6, label: 'Research'}      
      
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
      {from: 1, to: 3},
      {from: 1, to: 2},
      {from: 2, to: 4},
      {from: 2, to: 5},
      {from: 3, to: 1},
      {from: 5, to: 4},
      {from: 1, to: 6},
      {from: 5, to: 1},
      {from: 6, to: 3},
      {from: 3, to: 6},                  
      
  ]);

  // create a network
  var container = document.getElementById('mynetwork');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {};
  var network = new vis.Network(container, data, options);
