import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Handle,
  Position,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";
import { ViewerContext } from "./utils/contexts";

import Sidebar from "./viewerSidebar";
import CustomEdge from "./customEdges";

const initialNodes = [
  { id: "a", position: { x: 0, y: 0 }, data: { label: "Node A" } },
  { id: "b", position: { x: 0, y: 100 }, data: { label: "Node B" } },
  { id: "c", position: { x: 0, y: 200 }, data: { label: "Node C" } },
];

const initialEdges = [
  { id: "a->b", type: "custom", source: "a", target: "b" },
  { id: "b->c", type: "custom", source: "b", target: "c" },
];
function TextUpdaterNode(props: any) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle type="source" position={Position.Top} />
      <Handle type="target" position={Position.Bottom} />
    </div>
  );
}

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

export default function Viewer() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [isShowNodeTypes, setIsShowNodeTypes] = useState(false);

  const onNodesChange = useCallback((changes: any) => {
    setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot));
  }, []);
  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => {
        console.log(params, edgesSnapshot, "params and edgesnapshot");
        return addEdge({ ...params, type: "custom" }, edgesSnapshot);
      }),
    [],
  );

  return (
    <ViewerContext.Provider
      value={{
        isShowNodeTypes,
        setIsShowNodeTypes,
        nodes,
        setNodes,
        edges,
        setEdges,
      }}
    >
      <div style={{ height: "100vh", width: "100vw" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          colorMode="dark"
          edgeTypes={edgeTypes}
        >
          <Background variant={"dots" as BackgroundVariant} />
          <Controls />
        </ReactFlow>
      </div>
      {isShowNodeTypes && <Sidebar />}
    </ViewerContext.Provider>
  );
}
