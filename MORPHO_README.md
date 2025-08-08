# MORPHO Token Transfer Indexer

This project demonstrates how to use web3.js to index blockchain data, specifically MORPHO token transfers from the past week, and display them in a modern web interface.

## Features

- 🔍 **Blockchain Indexing**: Uses web3.js to fetch MORPHO token transfer events from the Ethereum mainnet
- 📊 **Data Sorting**: Automatically sorts transfers by transaction amount in descending order
- 🎨 **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- 📱 **Mobile Friendly**: Works seamlessly on desktop and mobile devices
- 🔗 **Transaction Details**: Click any transaction to view detailed information
- 🌐 **Etherscan Integration**: Direct links to view transactions on Etherscan
- ⚡ **Real-time Updates**: Refresh button to get the latest data

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Blockchain**: web3.js for Ethereum interaction
- **Styling**: Tailwind CSS for modern, responsive design
- **Data**: Real-time indexing from Ethereum mainnet

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. Navigate to the "MORPHO Transfers" page to view the indexed data

## Project Structure

```
├── app/
│   ├── api/morpho-transfers/
│   │   └── route.ts              # API endpoint for fetching transfers
│   ├── morpho-transfers/
│   │   └── page.tsx              # Main UI for displaying transfers
│   └── ...
├── lib/
│   └── web3-config.ts            # Web3.js configuration and utilities
└── components/
    └── App/
        └── index.tsx             # Navigation component
```

## Key Components

### Backend (API Route)

**File**: `app/api/morpho-transfers/route.ts`

- Connects to Ethereum mainnet using multiple RPC endpoints for reliability
- Fetches Transfer events for MORPHO token (0x58D97B57BB95320F9a05dC918Aef65434969c2B2)
- Processes events to extract transaction details
- Sorts by transaction amount and returns top 50 transfers

### Frontend (React Component)

**File**: `app/morpho-transfers/page.tsx`

- Fetches data from the API endpoint
- Displays transfers in a scrollable list
- Shows detailed transaction information when clicked
- Includes copy-to-clipboard functionality
- Links to Etherscan for external verification

### Configuration

**File**: `lib/web3-config.ts`

- Multiple RPC endpoint configuration for failover
- Constants for MORPHO contract address and event signatures
- TypeScript interfaces for type safety

## Features Explained

### 1. Blockchain Data Indexing

The application uses web3.js to:
- Connect to Ethereum mainnet via public RPC endpoints
- Query Transfer events using event logs filtering
- Calculate the appropriate block range (past week)
- Decode event data to extract transfer details

### 2. Data Processing

- **Sorting**: Transfers are sorted by amount in descending order
- **Formatting**: Amounts are converted from Wei to Ether format
- **Batching**: Processes data in batches to avoid rate limiting
- **Error Handling**: Graceful handling of network errors and invalid data

### 3. User Interface

- **Responsive Design**: Works on all screen sizes
- **Interactive List**: Click transactions to view details
- **Real-time Updates**: Refresh data on demand
- **Copy Functionality**: Easy copying of addresses and transaction hashes
- **External Links**: Direct integration with Etherscan

## MORPHO Token Information

- **Contract Address**: `0x58D97B57BB95320F9a05dC918Aef65434969c2B2`
- **Token Standard**: ERC-20
- **Decimals**: 18
- **Network**: Ethereum Mainnet

## Learning Objectives

This project teaches you how to:

1. **Use web3.js for blockchain interaction**
   - Connect to Ethereum networks
   - Query smart contract events
   - Handle blockchain data types

2. **Index on-chain data efficiently**
   - Filter events by time range
   - Process large datasets
   - Handle rate limiting

3. **Build modern web interfaces**
   - Create responsive layouts
   - Handle async data loading
   - Implement user interactions

4. **Integrate blockchain data with web apps**
   - Format blockchain data for display
   - Handle errors gracefully
   - Provide external links for verification

## Scaling to Other Tokens

To adapt this code for other tokens or "presents":

1. **Change the contract address** in `lib/web3-config.ts`
2. **Update event signatures** if using different events
3. **Modify data processing** for different token decimals or data structures
4. **Adjust UI labels** and descriptions

## Rate Limiting and Performance

The application includes several optimizations:

- **Multiple RPC endpoints** for reliability
- **Batch processing** to avoid overwhelming APIs
- **Request delays** between batches
- **Limited result sets** to improve loading times
- **Error recovery** with fallback mechanisms

## Troubleshooting

### Common Issues

1. **RPC Rate Limiting**: The app uses multiple public endpoints and includes delays
2. **Large Data Sets**: Limited to 100 logs initially, then top 50 transfers
3. **Network Errors**: Automatic fallback to different RPC providers

### Development Tips

- Monitor browser console for detailed error messages
- Check network tab for API response details
- Use Etherscan to verify transaction data manually

## Next Steps

To extend this project:

1. **Add more tokens** to index multiple assets
2. **Implement caching** to store results and reduce API calls
3. **Add filters** for amount ranges, addresses, or time periods
4. **Create charts** to visualize transfer patterns
5. **Add notifications** for large transfers
6. **Implement search** functionality

## License

This project is for educational purposes and demonstrates blockchain data indexing techniques.