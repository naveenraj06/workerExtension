import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesInitialized, useNodesState, useReactFlow } from "@xyflow/react"
import { useEffect } from "react";

const JsonFlow = ({jsonNodes=[], jsonEdges=[], nodeTypes={}, parentNodes=[]}:any) => {

  const [nodes, setNodes, onNodesChange] = useNodesState<any>(jsonNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>(jsonEdges);
  const { getNodes } = useReactFlow();
  const nodesInitialized = useNodesInitialized({
    includeHiddenNodes: false,
  });
  useEffect(() => {
    if(nodesInitialized) {
        setNodes((prev: any) => {
            let right = 0
            let bottom = 0
          return prev.map((node: any, index: number) => {
            right = index > 0 ? right + prev[index - 1]?.measured?.width : right
            bottom =  index > 0 ? bottom + prev[index - 1]?.measured?.height : bottom
            return {
              ...node,
              position: {
                x: right + 20,
                y: bottom + 20,
              },
              draggable: false
            };
          });
        });
    }
  }, [nodesInitialized, parentNodes]);

useEffect(() => {
    setNodes(jsonNodes ?? [])
}, [jsonNodes])

useEffect(() => {
    setEdges(jsonEdges ?? [])
}, [jsonEdges])

  return (
    
          <div className="reactflow-container">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              colorMode="dark"
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
            >
              <Background variant={"dots" as BackgroundVariant} />
              <Controls />
            </ReactFlow>
          </div>
  )
}

export default JsonFlow