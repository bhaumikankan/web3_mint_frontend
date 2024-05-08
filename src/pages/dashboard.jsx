import React, { useState } from "react";
import Web3 from "web3";
import { ethers } from "ethers";
import abi from "../web3/abi.json";
import WalletService from "../services/Wallet.service";
import "../css/dashboard.css";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const contractAddress = "0xfb132D7FECFdC01771C6897f04B81f75a28737fB";

  async function doMint() {
    try {
      setLoading(true);
      if (quantity <= 0) throw new Error("Ammount cannot be less than 1");
      if (!window.ethereum) throw new Error("Wallet is not installed");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const accounts = await provider.listAccounts();
      const walletAddress = accounts[0]?.address;
      const { data } = await WalletService.get({ address: walletAddress });

      if (data?.length > 0) {
        const tx = await contract.privateMint(quantity, {
          value: ethers.parseEther(`${0.001 * quantity}`),
          from: walletAddress,
          gasLimit: 300000,
        });
        await tx.wait();
        console.log("Transaction Hash:", tx);
      } else {
        const tx = await contract.mint(quantity, {
          value: ethers.parseEther(`${0.002 * quantity}`),
          from: walletAddress,
          gasLimit: 300000,
        });
        await tx.wait();
        console.log("Transaction Hash:", tx);
      }
    } catch (err) {
      console.log(err);
      if (err.message.includes("code=INSUFFICIENT_FUNDS")) {
        toast.error("Insufficient Funds");
      } else if (err.message.includes("code=ACTION_REJECTED")) {
        toast.error("Wallet Connect failed");
      } else if (err.message.includes("code=CALL_EXCEPTION")) {
        toast.error("something went wrong");
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="big-text">WEB 3 MINT</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 5,
          alignItems: "center",
        }}
        className="input-field"
      >
        {loading && <Oval height={50} width={50} />}
        {!loading && (
          <div style={{ display: "flex", gap: 5 }}>
            <input
              type="number"
              min={1}
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <button onClick={doMint} style={{ backgroundColor: "#4CAF50" }}>
              Mint
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
