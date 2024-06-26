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
  nodes.forEach((node) => {
    const newNode = {};
    // Snap the position to the grid
    newNode.label = node.name;
    newNode.id = node.id.toString();
    newNode.type = node.type;
    newNode.data = node.data;
    newNode.position = { x: 0, y: 0 };
    newNode.parentId = node.parentId;
    processedNodes.push(newNode);
    newNode.selectable = node.type === "dateTimeConnector" ? false : true;
    newNode.data.description = "No description provided";
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
    relationship.type = "smoothstep";
    relationships.push(relationship);
  });

  return relationships;
}

export function createSendMessage(nodeForm) {
  console.log(nodeForm);
  const newNode = {};
  // Snap the position to the grid
  newNode.label = nodeForm.title;
  newNode.id = generateRandomId();
  newNode.type = nodeForm.type;
  newNode.data = { payload: [], description: nodeForm.description };
  newNode.position = { x: 0, y: 0 };
  newNode.parentId = "";
  newNode.selectable = true;
  return newNode;
}

export function createAddComment(nodeForm) {
  const newNode = {};
  // Snap the position to the grid
  newNode.label = nodeForm.title;
  newNode.id = generateRandomId();
  newNode.type = nodeForm.type;
  newNode.data = { description: nodeForm.description, comment: "" };
  newNode.position = { x: 0, y: 0 };
  newNode.parentId = "";
  newNode.selectable = true;
  return newNode;
}

export function createDateTime(nodeForm) {
  const newNode = {};
  const successConnectorId = generateRandomId();
  const failureConnectorId = generateRandomId();
  // Snap the position to the grid
  newNode.label = nodeForm.title;
  newNode.id = generateRandomId();
  newNode.type = "dateTime";
  (newNode.data = {
    times: [
      {
        startTime: "09:00",
        endTime: "17:00",
        day: "mon",
      },
      {
        startTime: "09:00",
        endTime: "17:00",
        day: "tue",
      },
      {
        startTime: "09:00",
        endTime: "17:00",
        day: "wed",
      },
      {
        startTime: "09:00",
        endTime: "17:00",
        day: "thu",
      },
      {
        startTime: "09:00",
        endTime: "17:00",
        day: "fri",
      },
      {
        startTime: "09:00",
        endTime: "17:00",
        day: "sat",
      },
      {
        startTime: "09:00",
        endTime: "17:00",
        day: "sun",
      },
    ],
    connectors: [successConnectorId, failureConnectorId],
    description: nodeForm.description,
  }),
    (newNode.position = { x: 0, y: 0 });
  newNode.parentId = "";
  newNode.selectable = true;

  const { successConnector, failureConnector } = createDateTimeConnectors(
    successConnectorId,
    failureConnectorId,
    newNode.id
  );

  const successConnection = createDateTimeConnections(
    successConnectorId,
    newNode.id
  );

  const failureConnection = createDateTimeConnections(
    failureConnectorId,
    newNode.id
  );

  return {
    nodes: [newNode, successConnector, failureConnector],
    edges: [successConnection, failureConnection],
  };
}

function generateRandomId() {
  // Create an array to hold random bytes
  const randomBytes = new Uint8Array(3); // 3 bytes = 6 hexadecimal characters

  // Generate random values
  window.crypto.getRandomValues(randomBytes);

  // Convert bytes to hexadecimal string
  const randomId = Array.from(randomBytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return randomId;
}

function createDateTimeConnectors(
  successConnectorId,
  failureConnectorId,
  parentId
) {
  const successConnector = {
    label: "Success",
    id: successConnectorId,
    type: "dateTimeConnector",
    data: {
      connectorType: "success",
    },
    parentId: parentId,
    selectable: false,
  };

  const failureConnector = {
    label: "Failure",
    id: failureConnectorId,
    type: "dateTimeConnector",
    data: {
      connectorType: "failure",
    },
    parentId: parentId,
    selectable: false,
  };

  return { failureConnector, successConnector };
}

function createDateTimeConnections(id, parentId) {
  const relationship = {};
  relationship.id = `e${parentId}-${id}`;
  relationship.target = id.toString();
  relationship.source = parentId.toString();
  relationship.type = "smoothstep";

  return relationship;
}

export function truncateString(str, maxLength = 20, ellipses = "...") {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - ellipses.length) + ellipses;
}
