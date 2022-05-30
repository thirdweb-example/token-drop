import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useState, useEffect } from "react";
import truncateAddress from "../lib/truncateAddress";
import styles from "../styles/Home.module.css";

export default function TokenHolders() {
  const [loading, setLoading] = useState(true);
  const [holders, setHolders] = useState([]);
  async function checkHolders() {
    const sdk = new ThirdwebSDK("mumbai"); // configure this to your network

    const token = sdk.getToken("0xCFbB61aF7f8F39dc946086c378D8cd997C72e2F3");

    const balances = await token.history.getAllHolderBalances();
    setHolders(balances);
    setLoading(false);
  }

  useEffect(() => {
    checkHolders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.holderGrid}>
        {holders
          .sort(
            (a, b) =>
              parseInt(b.balance.displayValue) -
              parseInt(a.balance.displayValue)
          )
          .map((holder) => (
            <div
              key={holder.holder}
              className={`${styles.holderItem} ${styles.spacerBottom}`}
            >
              <p>{truncateAddress(holder.holder)}</p>
              <p>
                {holder.balance.displayValue} {holder.balance.symbol}
              </p>
            </div>
          ))}
      </div>
    </>
  );
}
