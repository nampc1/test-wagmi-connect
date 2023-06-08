import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configureChains, createConfig, WagmiConfig} from "wagmi";
import { mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import {SubWalletConnector} from "@subwallet/wagmi-connector";

const {chains, publicClient, webSocketPublicClient} = configureChains(
    [mainnet],
    [publicProvider()]
)

export const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
    logger: {
        warn: null,
    },
    connectors: [
        new SubWalletConnector({ chains }),
    ],
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <WagmiConfig config={config}>
            <App/>
        </WagmiConfig>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
