'use client';

import { useState, useEffect } from 'react';
import { formatEther } from 'viem';

interface TransferEvent {
  transactionHash: string;
  blockNumber: number;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  gasUsed: string;
  gasPrice: string;
}

interface ApiResponse {
  success: boolean;
  count: number;
  totalFound: number;
  transfers: TransferEvent[];
  error?: string;
  details?: string;
}

export default function MorphoTransfersPage() {
  const [transfers, setTransfers] = useState<TransferEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTx, setSelectedTx] = useState<TransferEvent | null>(null);
  const [totalFound, setTotalFound] = useState(0);

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/morpho-transfers');
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setTransfers(data.transfers);
        setTotalFound(data.totalFound);
      } else {
        setError(data.error || 'Failed to fetch transfers');
      }
    } catch (err) {
      setError('Network error: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (value: string) => {
    try {
      const etherValue = formatEther(BigInt(value));
      return parseFloat(etherValue).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      });
    } catch {
      return '0';
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading MORPHO transfers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <h2 className="font-bold mb-2">Error Loading Transfers</h2>
            <p>{error}</p>
            <button 
              onClick={fetchTransfers}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            MORPHO Token Transfers
          </h1>
          <p className="text-gray-600">
            Top 50 largest transfers from the past week (Total found: {totalFound})
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Contract: 0x58D97B57BB95320F9a05dC918Aef65434969c2B2
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transfers List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Transfer List</h2>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {transfers.map((transfer, index) => (
                <div
                  key={transfer.transactionHash}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedTx?.transactionHash === transfer.transactionHash 
                      ? 'bg-blue-50 border-blue-200' 
                      : ''
                  }`}
                  onClick={() => setSelectedTx(transfer)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        #{index + 1} - {formatValue(transfer.value)} MORPHO
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatAddress(transfer.from)} → {formatAddress(transfer.to)}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Block: {transfer.blockNumber.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 text-right">
                      {formatDate(transfer.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Transaction Details</h2>
            </div>
            <div className="p-4">
              {selectedTx ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transaction Hash
                    </label>
                    <div className="flex items-center space-x-2">
                      <code className="text-xs bg-gray-100 p-2 rounded flex-1 break-all">
                        {selectedTx.transactionHash}
                      </code>
                      <button
                        onClick={() => copyToClipboard(selectedTx.transactionHash)}
                        className="text-blue-600 hover:text-blue-800 text-xs"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <div className="text-lg font-semibold text-green-600">
                      {formatValue(selectedTx.value)} MORPHO
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From
                      </label>
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-gray-100 p-2 rounded flex-1 break-all">
                          {selectedTx.from}
                        </code>
                        <button
                          onClick={() => copyToClipboard(selectedTx.from)}
                          className="text-blue-600 hover:text-blue-800 text-xs"
                        >
                          Copy
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        To
                      </label>
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-gray-100 p-2 rounded flex-1 break-all">
                          {selectedTx.to}
                        </code>
                        <button
                          onClick={() => copyToClipboard(selectedTx.to)}
                          className="text-blue-600 hover:text-blue-800 text-xs"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Block Number
                      </label>
                      <div className="text-sm">
                        {selectedTx.blockNumber.toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Timestamp
                      </label>
                      <div className="text-sm">
                        {formatDate(selectedTx.timestamp)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gas Used
                      </label>
                      <div className="text-sm">
                        {parseInt(selectedTx.gasUsed).toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gas Price (Wei)
                      </label>
                      <div className="text-sm">
                        {parseInt(selectedTx.gasPrice).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <a
                      href={`https://etherscan.io/tx/${selectedTx.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      View on Etherscan
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>Select a transaction from the list to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={fetchTransfers}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}