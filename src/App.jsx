import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const App = () => {
  const [provider, setProvider] = useState(null);

  // Initialize the Ethereum provider when the component mounts

  console.log (window.ethereum)
  useEffect(() => {
    async function initializeProvider() {
      if (window.ethereum) {
        const web3provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(web3provider);

        // Request user's permission to access their MetaMask account
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
          console.error('User denied account access');
        }
      }
    }

    initializeProvider();
  }, []);

  // Function to handle the transaction
  const handleTransaction = async () => {
    if (provider) {
      try {
        const signer = provider.getSigner();
        const transaction = {
          to: '0xRecipientAddress',
          value: ethers.utils.parseEther('0.1'), // 0.1 ETH
        };

        const txResponse = await signer.sendTransaction(transaction);
        await txResponse.wait();
        console.log('Transaction confirmed:', txResponse.hash);
      } catch (error) {
        console.error('Error sending transaction:', error);
      }
    } else {
      console.error('Ethereum provider is not available');
    }
  };

  return (
    <div>
      <h1>MetaMask Web3 Transaction Signer</h1>
      {provider ? (
        <button onClick={handleTransaction}>Sign Transaction</button>
      ) : (
        <p>MetaMask not detected. Please install MetaMask and connect your wallet.</p>
      )}
    </div>
  );
};

export default App;