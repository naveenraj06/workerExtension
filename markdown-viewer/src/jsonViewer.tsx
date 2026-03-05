import { CodeEditor } from "@workerextension/ui";
import { Allotment } from "allotment";
import { editorOptions } from "./utils/constants";
import { useCallback, useEffect, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
} from "@xyflow/react";

import { JsonContentNode, EditorErrorView } from "./utils/modules";

const defaultJson = `{
  "name": "John Doe",
  "age": 30,
  "city": "New York"
}`;

const initialNodes: any = [
  { id: "a", position: { x: 0, y: 0 }, data: { label: "Node A" } },
  { id: "b", position: { x: 0, y: 100 }, data: { label: "Node B" } },
  { id: "c", position: { x: 0, y: 200 }, data: { label: "Node C" } },
];

const initialEdges: any = [
  { id: "a->b", type: "smoothstep", source: "a", target: "b" },
  { id: "b->c", type: "smoothstep", source: "b", target: "c" },
];

const JsonViewer = () => {
  const [jsonContent, setJsonContent] = useState(defaultJson);
  const [errors, setErrors] = useState([]);
  const [hasErrror, setHasError] = useState(false);
  const [jsonNodes, setJsonNodes] = useState(initialNodes);
  const [jsonEdges, setJsonEdges] = useState(initialEdges);
  const [allotmentSections, setAllotmentSections] = useState({
    editor: {
      visible: true,
      minSize: 300,
    },
    reactFlow: {
      visible: true,
    },
    editorErrorView: {
      visible: true,
    },
  });

  const handleEditorChange = (value: any) => {
    setJsonContent(value);
    convertJsonNodes();
  };

  const handleEditorValidate = (markers: any) => {
    const jsonErrors = markers.filter((marker: any) => marker.severity === 8);
    setErrors(jsonErrors);
    setHasError(jsonErrors.length > 0);
    if (jsonErrors.length > 0 && !allotmentSections.editorErrorView.visible) {
      setAllotmentSections((prev) => ({
        ...prev,
        editorErrorView: {
          ...prev.editorErrorView,
          visible: true,
        },
      }));
    }
  };

  const nodeTypes = {
    jsonContent: JsonContentNode,
  };

  const jsonMapping = (
    jsonData: any = {},
    isAnArray: boolean = false,
    parent?: string,
    index: number = 0,
  ) => {
    let data: any = {};
    if(Array.isArray(jsonData)) {
        jsonData?.forEach((element:any, index:any) => {
            data["root"] = `[${jsonData?.length} items]`;
            jsonMapping(element, true, undefined, index + 1);
        });
    }
    Object.entries(jsonData).forEach(([key, value]: any, index:any) => {
      if (typeof value === "object") {
        data[key] = `{${Object.keys(value)?.length} keys}`;
      } else if (Array.isArray(value)) {
        data[key] = `[${value?.length} items]`;
      } else {
        data[key] = value;
      }
      if (typeof value === "object" || Array.isArray(value)) {
        jsonMapping(value, undefined, key, index + 1);
      }
    });
    const nodeItem = {
      id: `node-${parent}`,
      data: { value: data },
      position: {
        x: index * 210 + 20,
        y: 0,
      },
      type: "jsonContent",
    };
    setJsonNodes((prev: any) => {
      return [...prev, nodeItem];
    });
    return data;
  };

  const convertJsonNodes = useCallback(() => {
      setJsonNodes([]);
    try {
      const parsedJson = JSON.parse(jsonContent);
      
      jsonMapping(parsedJson, Array.isArray(parsedJson));
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  }, [jsonContent]);

  useEffect(() => {
    convertJsonNodes();
  }, [convertJsonNodes]);

  const handleErrorViewClose = () => {
    setAllotmentSections((prev) => ({
      ...prev,
      editorErrorView: {
        ...prev.editorErrorView,
        visible: false,
      },
    }));
  };

  return (
    <div className="markdown-viewer-page">
      <Allotment>
        <Allotment.Pane
          minSize={allotmentSections.editor.minSize}
          visible={allotmentSections.editor.visible}
        >
          <div className="editor-container">
            <Allotment vertical>
              <Allotment.Pane>
                <CodeEditor
                  onMount={() => {}}
                  onChange={handleEditorChange}
                  defaultValue={jsonContent}
                  onValidate={handleEditorValidate}
                  language={"json"}
                  options={editorOptions}
                />
              </Allotment.Pane>
              <Allotment.Pane
                visible={allotmentSections.editorErrorView.visible}
              >
                <EditorErrorView
                  hasErrror={hasErrror}
                  errors={errors}
                  onClose={handleErrorViewClose}
                />
              </Allotment.Pane>
            </Allotment>
          </div>
        </Allotment.Pane>
        <Allotment.Pane visible={allotmentSections.reactFlow.visible}>
          <div className="reactflow-container">
            <ReactFlow
              nodes={jsonNodes}
              edges={jsonEdges}
              nodeTypes={nodeTypes}
              fitView
              colorMode="dark"
            >
              <Background variant={"dots" as BackgroundVariant} />
              <Controls />
            </ReactFlow>
          </div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default JsonViewer;
