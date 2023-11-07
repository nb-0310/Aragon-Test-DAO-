import React, { useState } from "react";
import { ethers } from "ethers";

const App = () => {
  const [address, setAddress] = useState(null);

  const connect = async () => {
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log(accounts);
        setAddress(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else console.log("not detected");
  };

  const signData = async () => {
    const signer = provider.getSigner();
    const msg = "Test Message";

    const sign = await signer.signMessage(msg);

    console.log(sign);
  };

  return (
    <div>
      <button onClick={connect}>Connect Wallet</button>
      <button onClick={signData}>Sign Transaction</button>
      <p>Address: {address}</p>
    </div>
  );
};

export default App;
