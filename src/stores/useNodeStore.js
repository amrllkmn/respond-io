import { defineStore } from "pinia";
import { getNodes, getEdges, createSendMessage } from "../utils";
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

    addNode(nodeForm) {
      switch (nodeForm.type) {
        case "addComment":
          console.log("NOT IMPLEMENTED YET");
          break;
        case "businessHours":
          console.log("NOT IMPLEMENTED YET");
        default:
          const newNode = createSendMessage(nodeForm);
          this.nodes = [...this.nodes, newNode];
          break;
      }
    },
  },
});
