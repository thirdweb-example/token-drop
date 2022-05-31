import { useAddress } from "@thirdweb-dev/react";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Claim({ tokenDropContract }) {
  const address = useAddress();
  const [amountToClaim, setAmountToClaim] = useState("");

  async function claim() {
    if (!amountToClaim || !address) {
      return;
    }

    try {
      const claimResult = await tokenDropContract?.claim(amountToClaim);
      console.log("Claimed", claimResult);
      alert("Successfully claimed!");
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  return (
    <div className={styles.claimGrid}>
      <input
        type="text"
        placeholder="Enter amount to claim"
        onChange={(e) => setAmountToClaim(e.target.value)}
        className={`${styles.textInput} ${styles.noGapBottom}`}
      />

      <button onClick={claim} className={styles.mainButton}>
        Claim
      </button>
    </div>
  );
}
