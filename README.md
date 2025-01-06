# iZiSwap Node Server

## Usage

### Configuration

1. **Add Chain Configuration**
   - Update the `src/iziswap/config.js` file with the configuration details for the blockchain you want to use. Make sure to set gasTokenAddress to the address of the wrapped gas token.

### Starting the Server

1. **Install Dependencies**
   - Run the following command to install the required dependencies:
     ```
     yarn
     ```
     or
     ```
     npm i
     ```
   
2. **Start the Server**
   - Use the following command to start the server:
     ```
     yarn start
     ```

### Example Query

To perform a swap, you can make a GET request to the following endpoint:

```
your-domain.com/api/swap?chainId={chainId}&amount={amount}&tokenFrom={tokenFromAddress}&tokenTo={tokenToAddress}&account={account}
```

- **Parameters:**
  - `chainId`: The ID of the blockchain network.
  - `amount`: The amount to swap (should be a decimal number).
  - `tokenFromAddress`: The contract address of the token you are swapping from, or token symbol if using a gas token.
  - `tokenToAddress`: The contract address of the token you are swapping to, or token symbol if using a gas token.
  - `account`: The account address initiating the swap.
  - `slippery`: The allowed slippage tolerance. Set to 1.5 to represent a 1.5% slippage tolerance. Default value is 0.
