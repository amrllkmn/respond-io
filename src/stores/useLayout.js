import dagre from "@dagrejs/dagre";
import { ref } from "vue";
import { Position, useVueFlow } from "@vue-flow/core";
export function useLayout() {
  const graph = ref(new dagre.graphlib.Graph());
  const { findNode } = useVueFlow();

  function layout(nodes, edges, direction) {
    // we create a new graph instance, in case some nodes/edges were removed, otherwise dagre would act as if they were still there
    const dagreGraph = new dagre.graphlib.Graph();

    graph.value = dagreGraph;

    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({ rankdir: direction });

    for (const node of nodes) {
      // if you need width+height of nodes for your layout, you can use the dimensions property of the internal node (`GraphNode` type)
      console.log(node);
      const graphNode = findNode(node.id);
      console.log;
      dagreGraph.setNode(node.id, {
        width: graphNode ? graphNode.dimensions.width || 150 : 150,
        height: graphNode ? graphNode.dimensions.height || 50 : 50,
      });
    }

    for (const edge of edges) {
      dagreGraph.setEdge(edge.source, edge.target);
    }

    dagre.layout(dagreGraph);

    // set nodes with updated positions
    const processedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);

      return {
        ...node,
        targetPosition: Position.Top,
        sourcePosition: Position.Bottom,
        position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
      };
    });
    return processedNodes;
  }

  return { graph, layout };
}
