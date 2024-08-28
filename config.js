import { http, createConfig } from 'wagmi'
import { hardhat, localhost, mainnet, sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]:http(),
  },
})