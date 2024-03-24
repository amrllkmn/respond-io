import { defineStore } from "pinia";
import { sortNodesByParentId } from "../utils";
import data from "../../payload.json";
export const useNodeStore = defineStore("nodes", {
  state: () => ({
    payload: sortNodesByParentId(data),
  }),
  getters: {
    nodes: (state) => {
      const processedNodes = [];
      const gridSpacing = 100;
      state.payload.forEach((node, index) => {
        const newNode = {};
        // Snap the position to the grid
        const gridX = ((index * 50 + 50) / gridSpacing) * gridSpacing;
        const gridY = ((index * 50 + 50) / gridSpacing) * gridSpacing;
        console.log({ [index]: { gridX, gridY } });
        newNode.label = node.name;
        newNode.id = node.id;
        newNode.type = node.type;
        newNode.data = node.data;
        newNode.position = { x: gridX, y: gridY };
        newNode.parentId = node.parentId;
        processedNodes.push(newNode);
      });

      return processedNodes;
    },
    edges: (state) => {
      const relationships = [];

      // Iterate through payload to extract relationships
      state.payload.forEach((node) => {
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
    },
  },
});
