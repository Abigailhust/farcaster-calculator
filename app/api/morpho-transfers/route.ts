import { NextResponse } from 'next/server';
import { 
  createWeb3Instance, 
  MORPHO_ADDRESS, 
  TRANSFER_EVENT_SIGNATURE, 
  BLOCKS_PER_WEEK,
  TransferEvent 
} from '@/lib/web3-config';

export async function GET() {
  try {
    // Initialize Web3 with fallback endpoints
    const web3 = createWeb3Instance();
    
    // Get current block number
    const currentBlock = await web3.eth.getBlockNumber();
    
    // Calculate block number from one week ago
    const fromBlock = currentBlock - BigInt(BLOCKS_PER_WEEK);
    
    console.log(`Fetching MORPHO transfers from block ${fromBlock} to ${currentBlock}`);
    
    // Get Transfer events for MORPHO token with batch size limit
    const logs = await web3.eth.getPastLogs({
      fromBlock: fromBlock,
      toBlock: currentBlock,
      address: MORPHO_ADDRESS,
      topics: [TRANSFER_EVENT_SIGNATURE]
    });
    
    console.log(`Found ${logs.length} transfer events`);
    
    // Process logs to extract transfer data with rate limiting
    const transfers: TransferEvent[] = [];
    const batchSize = 10; // Process in smaller batches to avoid rate limits
    
    for (let i = 0; i < Math.min(logs.length, 100); i += batchSize) {
      const batch = logs.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (log) => {
        try {
          // Decode the transfer event data
          const from = '0x' + log.topics[1].slice(26);
          const to = '0x' + log.topics[2].slice(26);
          const value = web3.utils.hexToNumberString(log.data);
          
          // Get transaction details (with timeout)
          const [transaction, receipt, block] = await Promise.all([
            web3.eth.getTransaction(log.transactionHash),
            web3.eth.getTransactionReceipt(log.transactionHash),
            web3.eth.getBlock(log.blockNumber)
          ]);
          
          return {
            transactionHash: log.transactionHash,
            blockNumber: Number(log.blockNumber),
            from,
            to,
            value,
            timestamp: Number(block.timestamp),
            gasUsed: receipt.gasUsed.toString(),
            gasPrice: transaction.gasPrice?.toString() || '0'
          } as TransferEvent;
        } catch (error) {
          console.error(`Error processing log ${log.transactionHash}:`, error);
          return null;
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      transfers.push(...batchResults.filter(Boolean) as TransferEvent[]);
      
      // Add small delay between batches to avoid rate limiting
      if (i + batchSize < logs.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    // Sort by value in descending order
    transfers.sort((a, b) => {
      const valueA = BigInt(a.value);
      const valueB = BigInt(b.value);
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    });
    
    // Return top 50 transfers
    const top50Transfers = transfers.slice(0, 50);
    
    return NextResponse.json({
      success: true,
      count: top50Transfers.length,
      totalFound: transfers.length,
      totalLogs: logs.length,
      transfers: top50Transfers
    });
    
  } catch (error) {
    console.error('Error fetching MORPHO transfers:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch MORPHO transfers',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}