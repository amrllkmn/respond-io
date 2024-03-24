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
  getters: {
    getNodeById: (state) => {
      return (nodeId) => state.nodes.find((node) => node.id === nodeId);
    },
  },
  actions: {
    updateNodes(newNodes) {
      this.nodes = newNodes;
    },

    updateNode(updatedNode) {
      this.nodes.map((node) => {
        if (node.id === updatedNode.id) {
          node.label = updatedNode.label;
          node.data = updatedNode.data;
        } else {
          return node;
        }
      });
      console.log(this.nodes);
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
