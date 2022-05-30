# Token Drop Example

## Introduction

In this guide, we will utilize the [**Token Drop**](https://portal.thirdweb.com/contracts/token-drop) contract to release ERC-20 tokens!

We also utilize the token drop's [claim phases](https://portal.thirdweb.com/pre-built-contracts/token-drop#setting-claim-phases) feature, to release the tokens for a price, and only allow a certain amount to be claimed per wallet.

**Check out the Demo here**: https://token-drop-thirdweb.vercel.app/

## Tools:

- [**thirdweb Token Drop**](https://portal.thirdweb.com/contracts/token-drop): thirdweb's Token Drop contract is a way of releasing your ERC20 tokens!

- [**thirdweb React SDK**](https://docs.thirdweb.com/react): To connect to our NFT Collection Smart contract via React hooks such as [useTokenDrop](https://docs.thirdweb.com/react/react.usetokendrop), connect user's wallets, and other awesome hooks like [useActiveClaimCondition](https://docs.thirdweb.com/react/react.useactiveclaimcondition) and [useClaimIneligibilityReasons](https://docs.thirdweb.com/react/react.useclaimineligibilityreasons).

- [**thirdweb TypeScript SDK**](https://docs.thirdweb.com/typescript): To claim/mint tokens from the token drop with [.claim](https://portal.thirdweb.com/pre-built-contracts/token-drop#claiming-tokens) , view token balance with [.balanceOf](https://portal.thirdweb.com/pre-built-contracts/token-drop#token-balance), and transfer tokens with [.transfer](https://portal.thirdweb.com/pre-built-contracts/token-drop#transfer-tokens).

## Using This Repo

- Create a Token Drop contract via the thirdweb dashboard on the Polygon Mumbai (MATIC) test network.

- Clone this repository.

- Replace our demo token drop contract address (`0xCFbB61aF7f8F39dc946086c378D8cd997C72e2F3`) with your token drop contract address!

```bash
npm install
# or
yarn install
```

- Run the development server:

```bash
npm run start
# or
yarn start
```

- Visit http://localhost:3000/ to view the demo.

# Guide

## Configuring the ThirdwebProvider

The thirdweb provider is a wrapper around our whole application.

It allows us to access all of the React SDK's helpful hooks anywhere in our application.

```jsx
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
```

## Connecting User's Wallets

We use the [useMetamask](https://portal.thirdweb.com/react/react.usemetamask) hook to connect with user's wallets.

```jsx
const connectWithMetamask = useMetamask();

// ...
<button onClick={connectWithMetamask}>Connect with Metamask</button>;
```

## Getting the token drop contract

We use the [useTokenDrop](https://docs.thirdweb.com/react/react.usetokendrop) hook to get the token drop contract:

```jsx
const tokenDropContract = useTokenDrop(
  "0xCFbB61aF7f8F39dc946086c378D8cd997C72e2F3"
);
```

## Claiming Tokens

In this example repository, we will use the [.claim](https://portal.thirdweb.com/pre-built-contracts/token-drop#claiming-tokens) method to claim tokens.

Since we have a wallet connected, the function automatically detects our wallet address as the claimer by default.

We store a value the user types into an input field in state:

```jsx
const [amountToClaim, setAmountToClaim] = useState("");

// ...

<input
  type="text"
  placeholder="Enter amount to claim"
  onChange={(e) => setAmountToClaim(e.target.value)}
/>;
```

And use this value to call `claim` on behalf of the connected wallet.

```jsx
const claimResult = await tokenDropContract?.claim(amountToClaim);
```

## Viewing Token Holders & Balances

We use the TypeScript SDK to view all the holders of our token and their balances, using the [getAllHolderBalances](https://portal.thirdweb.com/typescript/sdk.tokenerc20history.getallholderbalances#tokenerc20historygetallholderbalances-method) method.

```jsx
const sdk = new ThirdwebSDK("mumbai"); // configure this to your network

const token = sdk.getToken("0xCFbB61aF7f8F39dc946086c378D8cd997C72e2F3"); // our token drop contract address

const balances = await token.history.getAllHolderBalances();
```

We store the `balances` array in state, and map each balance to a div containing the holder's address and balance:

```jsx
<div>
  {holders.map((holder) => (
    <div key={holder.holder}>
      <p>{holder.holder}</p>
      <p>
        {holder.balance.displayValue} {holder.balance.symbol}
      </p>
    </div>
  ))}
</div>
```

## Transferring Tokens

Using the TypeScript SDK's [.transfer](https://portal.thirdweb.com/pre-built-contracts/token-drop#transfer-tokens) method, we can transfer a set quantity of tokens to another address.

In this example, we have a text field to enter the address to transfer to, and a text field to enter the amount to transfer, which we store in state:

```jsx
const [addressToTransferTo, setAddressToTransferTo] = useState("");
const [amountToTransfer, setAmountToTransfer] = useState("");
```

We then transfer the tokens using these values:

```jsx
const transferResult = await tokenDropContract?.transfer(
  addressToTransferTo,
  amountToTransfer
);
```

Additionally, we can get the amount of tokens we now have after transferring:

```jsx
const newBalance = await tokenDropContract?.balanceOf(address);
```

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/cd thirdweb](https://discord.gg/thirdweb).
