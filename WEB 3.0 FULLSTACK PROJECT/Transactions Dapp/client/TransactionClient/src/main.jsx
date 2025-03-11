import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Providers from './authe/Providers.jsx'
import App from './App.jsx'
// Replace this with any of the networks listed at https://github.com/wevm/viem/blob/main/src/chains/index.ts
import {base, berachain, polygon, arbitrum, story, mantle} from 'viem/chains';
import {PrivyProvider} from '@privy-io/react-auth';
import imgLogo from ''
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Providers>

      <App />
  </Providers>
    
  </StrictMode>,
)
