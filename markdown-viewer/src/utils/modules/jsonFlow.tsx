import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesInitialized, useNodesState, useReactFlow } from "@xyflow/react"
import { useEffect } from "react";

const JsonFlow = ({jsonNodes=[], jsonEdges=[], nodeTypes={}}:any) => {

  const [nodes, setNodes, onNodesChange] = useNodesState(jsonNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(jsonEdges);
  const { getNodes } = useReactFlow();
  const nodesInitialized = useNodesInitialized({
    includeHiddenNodes: false,
  });
  useEffect(() => {
    if(nodesInitialized) {
        const nodesList = getNodes()
        nodesList.forEach((node:any, index:number) => {
            console.log("🚀 ~ JsonFlow ~ node:", node)
            
        })
    }
  }, [nodesInitialized]);

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