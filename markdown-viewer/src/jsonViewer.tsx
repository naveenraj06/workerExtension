import { CodeEditor } from "@workerextension/ui";
import { Allotment } from "allotment";
import { editorOptions } from "./utils/constants";
import { useCallback, useEffect, useState } from "react";

import { JsonContentNode, EditorErrorView } from "./utils/modules";
import JsonFlow from "./utils/modules/jsonFlow";
import { ReactFlowProvider, useNodesInitialized } from "@xyflow/react";

const defaultJson = `[{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "address": {
    "doorNo": "40",
    "state": "NY"
  }
},
{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "address": {
    "doorNo": "40",
    "state": "NY"
  }
}]`;

const JsonViewer = () => {
  const [jsonContent, setJsonContent] = useState(defaultJson);
  const [errors, setErrors] = useState([]);
  const [parentNodes, setParentNodes] = useState<any>([])
  const [hasErrror, setHasError] = useState(false);
  const [jsonNodes, setJsonNodes] = useState<any>([]);
  const [jsonEdges, setJsonEdges] = useState<any>([]);
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

  let currentParent = 'root'

  const jsonObjectMapping = (data: any = {}, parent: string = currentParent) => {
    console.log("🚀 ~ jsonObjectMapping ~ parent:", parent)
    const content = structuredClone(data);
    setParentNodes((prev:any) => {
      return [...prev, parent]
    })
    try {
      if (Array.isArray(content)) {
        setJsonNodes((prev: any) => {
          return [
            ...prev,
            {
              id: `node-${parent}`,
              data: { value: `[${content?.length} items]` },
              position: {
                x: 0,
                y: 0,
              },
              type: "jsonContent",
            },
          ];
        });
        content.forEach((data: any, index:number) => {
          jsonObjectMapping(data, `${parent}-${index}`);
        });
      } else {
        const schema = { ...content };
        Object.entries(content).forEach(([key, value]: any) => {
          if (typeof value === "object" && value) {
            schema[key] = `{${Object.keys(value)?.length} keys}`;
          }
        });
        setJsonNodes((prev: any) => {
          const similarNodes = prev?.filter((node: any) =>
            node.id.includes(`node-${parent}`),
          );
          const hasNodeId = similarNodes?.length;
          return [
            ...prev,
            {
              id: `node-${parent}-${hasNodeId + 1}`,
              data: {
                value: schema,
              },
              position: {
                x: 0,
                y: 0,
              },
              type: "jsonContent",
            },
          ];
        });
        Object.entries(content).forEach(([key, values]: any, index:number) => {
          if (values && (typeof values === "object" || Array.isArray(values))) {
            jsonObjectMapping(values, `${parent}-${key}`);
          } else {
            console.log("unhandle json", key, values);
          }
        });
      }
    } catch (error) {
      console.error("error in mapping json", error);
      console.error('error content', content, parent)
      
    }
  };

  const convertJsonNodes = useCallback(() => {
    setJsonNodes([]);
    setParentNodes([]);
    try {
      const parsedJson = JSON.parse(jsonContent);
      console.group("conversion started");
      jsonObjectMapping(parsedJson);
      console.groupEnd();
    } catch (error) {
      console.error("Invalid JSON:", error, jsonContent);
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
          <ReactFlowProvider>
            <JsonFlow
              jsonNodes={jsonNodes}
              jsonEdges={jsonNodes}
              nodeTypes={nodeTypes}
              parentNodes={parentNodes}
            />
          </ReactFlowProvider>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default JsonViewer;
