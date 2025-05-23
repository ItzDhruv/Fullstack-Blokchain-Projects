
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { usePrivy } from "@privy-io/react-auth";

  const CONTRACT_ADDRESS = "0xa454f5D52EAe57CFcf82eAed28f082c71164644A";
  const CONTRACT_ABI = [
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "sendEther",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "sendEther2",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ];

  function App() {
    const { login, user, logout, authenticated } = usePrivy();
    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState("");
    const [transactions, setTransactions] = useState([]);
  
    // Load transactions from localStorage on app start
    useEffect(() => {
      const storedTransactions = localStorage.getItem("transactions");
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
    }, []);
  
    const sendEther = async () => {
      if (!authenticated) return alert("Connect wallet first!");
      if (!receiver || !amount) return alert("Enter receiver address and amount!");
  
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
        const tx = await contract.sendEther(receiver, { value: ethers.parseEther(amount) });
        await tx.wait();
  
        // Create new transaction entry
        const newTransaction = { receiver, amount };
  
        // Update transactions state and save to localStorage
        const updatedTransactions = [...transactions, newTransaction];
        setTransactions(updatedTransactions);
        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  
        alert("Transaction Successful!");
      } catch (error) {
        console.error("Transaction Failed:", error);
        alert("Transaction Failed!");
      }
    };
  
    return (
      <>
        <div className="container">
          <div className="header">
            {authenticated ? (
              <button onClick={logout} id="meta-btn">
                {user?.wallet.address
                  ? `${user.wallet.address.slice(0, 3)}.....${user.wallet.address.slice(-3)}`
                  : ""}
              </button>
            ) : (
              <button onClick={login} id="meta-btn">
                Connect Wallet
              </button>
            )}
          </div>
  
          {authenticated ? (
            <>
              <div className="box">
                <div className="input">
                  <input
                    type="text"
                    placeholder="Receiver Address"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Amount (ETH)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="button">
                  <button onClick={sendEther}>Send</button>
                  <button id="btn2" onClick={() => { setReceiver(""); setAmount(""); }}>Cancel</button>
                </div>
              </div>
  
              {/* Transaction History Table */}
              <h2>Transaction History</h2>
              <table border="1">
                <thead>
                  <tr>
                    <th>Receiver</th>
                    <th>Amount (ETH)</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr key={index}>
                      <td>{tx.receiver}</td>
                      <td>{tx.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <h1>Connect wallet first</h1>
          )}
        </div>
      </>
    );
  }
  
  export default App;