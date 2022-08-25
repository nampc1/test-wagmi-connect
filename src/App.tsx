import React from 'react';
import './App.css';
import {useAccount, useConnect, useDisconnect, useSignMessage, useSwitchNetwork} from "wagmi";

function App() {
    const { connect, connectors } = useConnect()
    const { connector, isConnected, address } = useAccount()
    const { disconnect } = useDisconnect()
    const { chains, pendingChainId, switchNetwork } = useSwitchNetwork()

    console.log(connector?.getChainId())
    console.log(chains)

    const {signMessage} = useSignMessage({
        message: 'gm wagmi frens',
        onError: (e) => {console.log(e)}}
    )

    return (
        <div className="App">
            <header className="App-header">
                {
                    isConnected && <div className={'account-info'}>
                        {address}
                    </div>
                }

                {
                    isConnected ? <div className={'connect-btn'} onClick={() => disconnect()}>
                        Disconnect from {connector?.name}
                    </div>
                        : <div>
                            {
                                connectors
                                    .filter((connector) => connector.ready)
                                    .map((connector) => (
                                        <div className={'connect-btn'} onClick={() => connect({connector})} key={connector.name}>
                                            Connect to {connector.name}
                                        </div>
                                    ))
                            }
                        </div>
                }

                {
                    isConnected && <div className={'connect-btn'} onClick={() => signMessage()}>
                        Sign dummy transaction
                    </div>
                }
            </header>
        </div>
    );
}

export default App;
