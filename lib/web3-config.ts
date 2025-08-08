import Web3 from 'web3';

// List of public Ethereum RPC endpoints for fallback
const RPC_ENDPOINTS = [
  'https://eth-mainnet.g.alchemy.com/v2/demo',
  'https://ethereum-rpc.publicnode.com',
  'https://rpc.ankr.com/eth',
  'https://eth.llamarpc.com',
];

export function createWeb3Instance(): Web3 {
  // Try endpoints in order until one works
  for (const endpoint of RPC_ENDPOINTS) {
    try {
      return new Web3(endpoint);
    } catch (error) {
      console.warn(`Failed to connect to ${endpoint}:`, error);
      continue;
    }
  }
  
  // Fallback to first endpoint if all fail
  return new Web3(RPC_ENDPOINTS[0]);
}

export const MORPHO_ADDRESS = '0x58D97B57BB95320F9a05dC918Aef65434969c2B2';
export const TRANSFER_EVENT_SIGNATURE = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

// Approximate blocks in a week (assuming 12-second block time)
export const BLOCKS_PER_WEEK = 50400;

export interface TransferEvent {
  transactionHash: string;
  blockNumber: number;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  gasUsed: string;
  gasPrice: string;
}