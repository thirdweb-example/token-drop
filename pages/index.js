import {
  useAddress,
  useDisconnect,
  useMetamask,
  useTokenDrop,
  useActiveClaimCondition,
  useClaimIneligibilityReasons,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useState, useEffect } from "react";

export default function Home() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  const [amountToClaim, setAmountToClaim] = useState("");
  const [addressToTransferTo, setAddressToTransferTo] = useState("");
  const [amountToTransfer, setAmountToTransfer] = useState("");

  const tokenDropContract = useTokenDrop(
    "0xCFbB61aF7f8F39dc946086c378D8cd997C72e2F3"
  );

  const { data: claimConditions } = useActiveClaimCondition(tokenDropContract);

  const { data: claimIneligible } = useClaimIneligibilityReasons(
    tokenDropContract,
    {
      walletAddress: address,
      quantity: amountToClaim,
    }
  );

  async function claim() {
    if (claimIneligible) {
      return;
    }
    if (!amountToClaim || !address) {
      return;
    }

    try {
      const claimResult = await tokenDropContract?.claim(amountToClaim);
      console.log("Claimed", claimResult);
    } catch (e) {
      console.error(e);
    }
  }

  async function transfer() {
    if (!addressToTransferTo || !address) {
      return;
    }

    try {
      const transferResult = await tokenDropContract?.transfer(
        addressToTransferTo,
        amountToTransfer
      );

      console.log(transferResult);

      const newBalance = await tokenDropContract?.balanceOf(address);

      alert(`Successfully transferred. New balance:
        ${newBalance.displayValue} ${newBalance.symbol}
      `);
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  const [holders, setHolders] = useState([]);
  async function checkHolders() {
    const sdk = new ThirdwebSDK("mumbai"); // configure this to your network

    const token = sdk.getToken("0xCFbB61aF7f8F39dc946086c378D8cd997C72e2F3");

    const balances = await token.history.getAllHolderBalances();
    console.log(balances);
    setHolders(balances);
  }

  useEffect(() => {
    checkHolders();
  }, []);

  useEffect(() => {
    async function checkRestricted() {
      const isRestricted = await tokenDropContract?.isTransferRestricted();
      console.log("Is restricted: ", isRestricted);
    }

    checkRestricted();
  }, [tokenDropContract]);

  return (
    <div>
      {address ? (
        <>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <p>Your address: {address}</p>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              type="text"
              placeholder="Enter amount to claim"
              onChange={(e) => setAmountToClaim(e.target.value)}
            />

            <button onClick={claim}>Claim</button>

            <div style={{ marginLeft: "1rem" }} />

            <input
              type="text"
              placeholder="Address to transfer to"
              onChange={(e) => setAddressToTransferTo(e.target.value)}
            />
            <input
              type="text"
              placeholder="Amount to transfer"
              onChange={(e) => setAmountToTransfer(e.target.value)}
            />
            <button onClick={transfer}>Transfer</button>
          </div>

          <h1>Token Holders</h1>

          <div>
            {holders
              .sort(
                (a, b) =>
                  parseInt(b.balance.displayValue) -
                  parseInt(a.balance.displayValue)
              )
              .map((holder) => (
                <div
                  key={holder.address}
                  style={{
                    border: "1px solid grey",
                    borderRadius: 16,
                    padding: 12,
                  }}
                >
                  <p>{holder.holder}</p>
                  <p>
                    {holder.balance.displayValue} {holder.balance.symbol}
                  </p>
                </div>
              ))}
          </div>
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
}
