import { defineStore } from "pinia";
import {
  getNodes,
  getEdges,
  createSendMessage,
  createAddComment,
  createDateTime,
} from "../utils";
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
          const addCommentNode = createAddComment(nodeForm);
          this.nodes = [...this.nodes, addCommentNode];
          break;
        case "businessHours":
          const { nodes, edges } = createDateTime(nodeForm);
          this.nodes = this.nodes.concat(nodes);
          this.edges = this.edges.concat(edges);
          console.log(this.nodes);
          break;
        default:
          const sendMessageNode = createSendMessage(nodeForm);
          this.nodes = [...this.nodes, sendMessageNode];
          break;
      }
    },
  },
});
