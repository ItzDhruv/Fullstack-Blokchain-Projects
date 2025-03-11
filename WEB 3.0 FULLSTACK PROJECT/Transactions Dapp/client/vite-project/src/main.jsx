import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Replace this with any of the networks listed at https://github.com/wevm/viem/blob/main/src/chains/index.ts
import {base, berachain, polygon, arbitrum, story, mantle} from 'viem/chains';
import {PrivyProvider} from '@privy-io/react-auth';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrivyProvider
      appId="cm7abnhje01q34mevp5crunjf"
      config={{
        // Display email and wallet as login methods
        loginMethods: ['email', 'wallet'],
        
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url',

      
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>,
)
