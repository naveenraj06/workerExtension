import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { PopupContext } from './utils/context'
import BookmarksList from './bookmarksList'
import './App.css'
import { toggleSidePanel } from './utils/modules/common'

// let panelStateByTab: Record<number, boolean> = {};
function App() {
  const [count, setCount] = useState(0)
//   const toggleSidePanel = () => {

//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     if (!tabs.length || tabs[0].id === undefined) return;

//     const tabId = tabs[0].id;
//     const isOpen = panelStateByTab[tabId];

//     if (isOpen) {
//       // Close side panel
//       chrome.sidePanel.setOptions({
//         enabled: false,
//       });

//       panelStateByTab[tabId] = false;
//     } else {
//       // Enable + Open side panel
//       chrome.sidePanel.setOptions({
//         enabled: true,
//       });

//       chrome.sidePanel.open({ tabId });

//       panelStateByTab[tabId] = true;
//     }
//   })
// }


  return (
    <PopupContext value={{}}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <button onClick={() => toggleSidePanel()}>Toggle Side Panel</button>
      <BookmarksList />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </PopupContext>
  )
}

export default App
