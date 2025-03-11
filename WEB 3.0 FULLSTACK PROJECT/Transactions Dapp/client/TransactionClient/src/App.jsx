import { useState, useEffect } from "react";

import { usePrivy } from "@privy-io/react-auth";
function App() {
  const { login, user,logout, authenticated } = usePrivy();
  useEffect(() => {
    if (authenticated) {
      console.log("✅ User is authenticated:", user?.wallet.address);
    } else {
      console.log("❌ User is not authenticated", user);
    }
  }, [authenticated, user]);

  return (
    <>
      <div className="container">
        <div className="header">
          {authenticated? ( 
          <button onClick={logout} id="meta-btn">
            
          {user?.wallet.address}
        </button>
          )  :

          (
            <button onClick={login} id="meta-btn">
            
            Connect Wallet
          </button>
          )
        
        }
          
          
        </div>
      
         {authenticated?(<>   <div className="box"> <div className="input">
            <input type="text" placeholder="         Reciver address" />
          </div>
          <div className="button">
            <button> Send </button>
            <button id="btn2">Cancel</button>
          </div>  </div>  </>)  :  ( <h1>Connect wallet first</h1> )}

         
          
       
      </div>
    </>
  );
}

export default App;
