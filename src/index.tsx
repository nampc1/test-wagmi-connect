import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configureChains, createClient, defaultChains, WagmiConfig} from "wagmi";
import { alchemyProvider } from 'wagmi/providers/alchemy'
import {SubWalletConnector} from "./wagmi-connector";

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
    alchemyProvider(),
])

const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
    connectors: [
        new SubWalletConnector({
            chains
        })
    ]
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <WagmiConfig client={client} >
          <App />
      </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
