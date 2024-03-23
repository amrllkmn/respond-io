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
      console.log(state.payload);
      state.payload.forEach((node, index) => {
        const newNode = {};
        newNode.label = node.name;
        newNode.id = node.id;
        newNode.type = node.type;
        newNode.data = node.data;
        newNode.position = { x: index * 50 + 50, y: index * 50 + 50 };
        newNode.parentId = node.parentId;
        processedNodes.push(newNode);
      });

      console.log(processedNodes);

      return processedNodes;
    },
    edges: (state) => {
      const relationships = [];

      // Iterate through payload to extract relationships
      state.payload.forEach((node, index) => {
        const relationship = {};
        relationship.id = `e${node.parentId}-${node.id}`;
        relationship.target = node.id.toString();
        relationship.source = node.parentId.toString();
        relationships.push(relationship);
      });

      console.log(relationships);
      return relationships;
    },
  },
});
