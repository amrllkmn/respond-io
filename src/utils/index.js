function sortNodesByParentId(nodes) {
  const nodesMap = {};
  nodes.forEach((node) => {
    nodesMap[node.id] = node;
  });

  const sortedNodes = [];
  const visited = {}; // Keep track of visited nodes

  // Find the root node
  const rootNode = nodes.find((node) => node.parentId === -1);

  let stack = [rootNode]; // Use a stack for depth-first traversal
  while (stack.length > 0) {
    const currentNode = stack.pop();
    if (!visited[currentNode.id]) {
      sortedNodes.push(currentNode);
      visited[currentNode.id] = true; // Mark current node as visited
    }

    // Find children of the current node
    const children = nodes.filter((node) => node.parentId === currentNode.id);
    children.sort((a, b) => a.id.localeCompare(b.id));

    // Push children to the stack for further processing
    stack.push(...children.reverse());
  }

  return sortedNodes.map((node) => {
    return { ...node, data: nodesMap[node.id].data }; // Adding data to sorted nodes
  });
}

export function getNodes(data) {
  const nodes = sortNodesByParentId(data);
  const processedNodes = [];
  const gridSpacing = 100;
  nodes.forEach((node, index) => {
    const newNode = {};
    // Snap the position to the grid
    newNode.label = node.name;
    newNode.id = node.id.toString();
    newNode.type = node.type;
    newNode.data = node.data;
    newNode.position = { x: 0, y: 0 };
    newNode.parentId = node.parentId;
    processedNodes.push(newNode);
  });

  return processedNodes;
}
export function getEdges(data) {
  const nodes = sortNodesByParentId(data);
  const relationships = [];

  // Iterate through payload to extract relationships
  nodes.forEach((node) => {
    if (node.parentId < 0) {
      return;
    }
    const relationship = {};
    relationship.id = `e${node.parentId}-${node.id}`;
    relationship.target = node.id.toString();
    relationship.source = node.parentId.toString();
    relationships.push(relationship);
  });

  return relationships;
}
