import {
  BaseEdge,
  EdgeLabelRenderer,
  getConnectedEdges,
  getStraightPath,
  useReactFlow,
} from '@xyflow/react';
import { useViewerContext } from './utils/contexts';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }: any) {
  const { setEdges } = useReactFlow();
  const [path, labelX, labelY, offsetX, offsetY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  // const connectedEdges = getConnectedEdges(nodes, edges);
  const { setIsShowNodeTypes } = useViewerContext();
  console.log('rendering edge', path, labelX, labelY, offsetX, offsetY);
  return (
    <>
      <BaseEdge id={id} path={path} />
      <EdgeLabelRenderer>
        <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          delete
        </button>
      </EdgeLabelRenderer>
            <EdgeLabelRenderer>
        <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY + 50}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
          onClick={() => {
            setIsShowNodeTypes(true);
          }}
        >
          add
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
