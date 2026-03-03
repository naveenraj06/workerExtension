import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import './sidepanel.css'
import SidePanel from './sidepanel.tsx'

createRoot(document.getElementById('chromeSidePanel')!).render(
  <StrictMode>
    <SidePanel />
  </StrictMode>,
)