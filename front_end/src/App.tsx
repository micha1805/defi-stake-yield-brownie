import React from 'react';
import { ChainId, DAppProvider } from "@usedapp/core"
import { Header } from "./components/Header"
import { Main } from "./components/Main"
import { Container } from "@mui/material"

function App() {
  return (
    <DAppProvider config={{
      // supportedChains: [ChainId.Kovan, ChainId.Rinkeby, 1337]
      supportedChains: [ChainId.Kovan],
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000
      }
    }}>
      <Header />
      <Container maxWidth="md">
        <div>Hello </div>
        <Main />
      </Container>
    </DAppProvider>

  );
}

export default App;
