import { useAddress } from "@thirdweb-dev/react";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Transfer({ tokenDropContract }) {
  const address = useAddress();
  const [addressToTransferTo, setAddressToTransferTo] = useState("");
  const [amountToTransfer, setAmountToTransfer] = useState("");

  async function transfer() {
    if (!addressToTransferTo || !amountToTransfer || !address) {
      return;
    }

    console.log({ addressToTransferTo, amountToTransfer });

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

  return (
    <div className={styles.claimGrid}>
      <input
        type="text"
        placeholder="Address to transfer to"
        onChange={(e) => setAddressToTransferTo(e.target.value)}
        className={`${styles.textInput} ${styles.noGapBottom}`}
      />
      <input
        type="text"
        placeholder="Amount to transfer"
        onChange={(e) => setAmountToTransfer(e.target.value)}
        className={`${styles.textInput} ${styles.noGapBottom}`}
      />
      <button onClick={transfer} className={styles.mainButton}>
        Transfer
      </button>
    </div>
  );
}
