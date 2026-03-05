import Home from "./App";
import Viewer from "./viewer";
import JsonViewer from "./jsonViewer";

const router = [
  {
    path: "/",
    Component: Home,
  }, {
    path: "/viewer",
    Component: Viewer,
  }, {
    path: "json-viewer",
    Component: JsonViewer
  }
]

export default router;