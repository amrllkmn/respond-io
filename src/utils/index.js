export function sortNodesByParentId(nodes) {
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
