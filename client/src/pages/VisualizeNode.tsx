import { useState, useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type Nodes = Node[] | null;
type Edges = Edge[] | null;

//const initialNodes: Nodes = [
//  {
//    id: '1',
//    data: { label: 'Node 1' },
//    position: { x: 5, y: 5 },
//  },
//  {
//    id: '2',
//    data: { label: 'Node 2' },
//    position: { x: 5, y: 100 },
//  },
//];
//
//const initialEdges: Edges = [{ id: 'e1-2', source: '1', target: '2' }];
//

const initialNodes: Nodes = null;
const initialEdges: Edges = null;

function VisualizeNode() {
  const [nodes, setNodes] = useState<Nodes>(initialNodes);
  const [edges, setEdges] = useState<Edges>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    connection => setEdges(eds => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto flex w-[90%] flex-col gap-6 pb-12 pt-10 lg:w-[90%] 2xl:w-[60%]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Wikipedia Rabbit Hole Explorer
            </p>
            <h1 className="text-2xl font-semibold md:text-3xl">
              Visualize Nodes
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="secondary">
              Clear nodes
            </Button>
            <Button asChild type="button">
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="h-[70vh] w-full flex items-center justify-center">
            {nodes && edges ? (
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                elementsSelectable={false}
                nodesConnectable={false}
                panOnDrag={false}
                panOnScroll={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
                minZoom={1}
                maxZoom={1}
                fitView
              />
            ) : (
              <h1 className="text-2xl font-semibold md:text-3xl">Empty</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualizeNode;
