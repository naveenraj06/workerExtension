import React, { useState } from 'react';
import { useViewerContext } from './utils/contexts';

export default () => {

  const {setNodes, setIsShowNodeTypes} = useViewerContext()

  const nodeList = [
    {
      name: 'input',
      label: 'Input Node',
    }, {
      name: 'default',
      label: 'Default Node',
    }, {
      name: 'output',
      label: 'Output Node',
    }
  ]


  const handleAddNode = (type: string) => {
    const newNode = {
      id: `${type}-${nodeList.length}-${Math.random()}`,
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `${type} node` },
    };
    
    setNodes((nds:any) => {
      console.log(nds, 'current nodes');
      return [...nds, newNode];
    });
    setIsShowNodeTypes(false)
  }

  return (
    <aside style={{ padding: 10, border: '1px solid black', width: 200, position: 'absolute', right: 10, top: 10 }}>
      {
        nodeList.map((node) => (
          <div key={node.name}
            tabIndex={0}
            role='button'
            onClick={() => {
              handleAddNode(node.name)
            }}
            style={{
              cursor: "pointer"
            }}
          >
            {node.label}
          </div>
        ))
      }
    </aside>
  );
};
