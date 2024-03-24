import { defineStore } from "pinia";
import { getNodes, getEdges } from "../utils";
import data from "../../payload.json";
export const useNodeStore = defineStore("nodes", {
  state: () => ({
    nodes: getNodes(data),
    edges: getEdges(data),
  }),
  getters: {},
  actions: {
    updateNodes(newNodes) {
      this.nodes = newNodes;
    },
  },
});
