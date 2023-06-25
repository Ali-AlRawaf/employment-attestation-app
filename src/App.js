import { WagmiConfig, createConfig, configureChains, mainnet, sepolia } from 'wagmi'
 
import { publicProvider } from 'wagmi/providers/public'
 
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { Profile } from './Profile'
import { useWalletClient } from 'wagmi'
import { ATTEST_PRIMARY_TYPE, EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
 
// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()],
)
 
// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '...',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

const attest = async (eas, signer) => {
  //invariant(signer, "signer must be defined");
  eas.connect(signer);

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
  const encodedData = schemaEncoder.encodeData([
    { name: "eventId", value: 1, type: "uint256" },
    { name: "voteIndex", value: 1, type: "uint8" },
  ]);

  const schemaUID = "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";

  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
      expirationTime: 0,
      revocable: true,
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();

  console.log("New attestation UID:", newAttestationUID);
}
 
// Pass config to React Context Provider
export default function App() {
  const eas = new EAS(EASContractAddress);
  const signer = useWalletClient()
  return (
    <WagmiConfig config={config}>
      <Profile />
      <button onClick={attest(eas, signer)}></button>
    </WagmiConfig>
  )
}
