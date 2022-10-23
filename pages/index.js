import React, { useState } from "react";
import { Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [amountToClaim, setAmountToClaim] = useState("");

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Claim Tokens</h2>
      <p className={styles.explain}>
        Claim ERC20 tokens from the prebuilt{" "}
        <a
          className={styles.pink}
          href="https://portal.thirdweb.com/pre-built-contracts/token-drop"
          target="_blank"
          rel="noreferrer"
        >
          token drop
        </a>{" "}
        contract.
      </p>

      <hr className={styles.divider} />

      <div className={styles.claimGrid}>
        <input
          type="text"
          placeholder="Enter amount to claim"
          onChange={(e) => setAmountToClaim(e.target.value)}
          className={`${styles.textInput} ${styles.noGapBottom}`}
        />
        <Web3Button
          accentColor="#5204BF"
          colorMode="dark"
          contractAddress="0x5ec440E5965da9570CAa66402980c6D20cbe0663"
          action={(contract) => contract.erc20.claim(amountToClaim)}
          onSuccess={() => alert("Claimed!")}
          onError={(err) => alert(err)}
        >
          Claim Tokens
        </Web3Button>
      </div>
    </div>
  );
}
