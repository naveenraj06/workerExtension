import Home from "./App";
import Viewer from "./viewer";
import JsonViewer from "./jsonViewer";
import { ChartExample } from "./chartsView";
import { chartView } from "./utils/constants";

const router = [
  {
    path: "/",
    Component: Home,
  }, {
    path: "/viewer",
    Component: Viewer,
  }, {
    path: "/json-viewer",
    Component: JsonViewer
  }, {
    path: 'chart-view',
    Component: ChartExample,
    loader: chartView
  }
]

export default router;