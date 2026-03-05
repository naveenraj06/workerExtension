import { lazy, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import NotFound from 'SMAC/NotFound';

function App() {
  const [count, setCount] = useState(0)

  return  <div>application <NotFound /></div>
}

export default App
