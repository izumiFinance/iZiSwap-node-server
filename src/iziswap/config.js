const chains = {
    534352: {
        name: 'Scroll',
        rpc: 'https://rpc.scroll.io',
        quoterAddress: '0x3EF68D3f7664b2805D4E88381b64868a56f88bC4',
        swapAddress: '0x2db0AFD0045F3518c77eC6591a542e326Befd3D7',
        multicallAddress: '0x93E94ef7D2d735fF21C302c765d8A77C1955A311',
        liquidityManagerAddress: '0x1502d025BfA624469892289D45C0352997251728',
        gasTokenSymbol: 'ETH',
        gasTokenAddress: '0x5300000000000000000000000000000000000004',
        gasTokenDecimal: 18,
        supportFeeContractNumbers: [10000, 3000, 500],
        midTokenList: [
            {
                chainId: 534352,
                symbol: 'ETH',
                address: '0x5300000000000000000000000000000000000004',
                decimal: 18
            },
            {
              chainId: 534352,
              symbol: 'USDC',
              address: '0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4',
              decimal: 6
            },
            {
              chainId: 534352,
              symbol: 'STONE',
              address: '0x80137510979822322193FC997d400D5A6C747bf7',
              decimal: 18
            },
        ],
    },

    167000: {
        name: 'Taiko',
        rpc: 'https://rpc.particle.network/evm-chain?chainId=167000&projectUuid=5f6fb73a-fce8-4268-907e-cf112db3d03d&projectKey=cojzgAMzIP6nmu6ojOT4d88MMdMCmdcxSmkJ45BL',
        quoterAddress: '0x2C6Df0fDbCE9D2Ded2B52A117126F2Dc991f770f',
        swapAddress: '0x04830cfCED9772b8ACbAF76Cfc7A630Ad82c9148',
        multicallAddress: '0x7a524c7e82874226F0b51aade60A1BE4D430Cf0F',
        liquidityManagerAddress: '0x33531bDBFE34fa6Fd5963D0423f7699775AacaaF',
        gasTokenSymbol: 'ETH',
        gasTokenAddress: '0xA51894664A773981C6C112C43ce576f315d5b1B6',
        gasTokenDecimal: 18,
        supportFeeContractNumbers: [10000, 3000, 500],
        midTokenList: [
          {
              chainId: 167000,
              symbol: 'WETH',
              address: '0xA51894664A773981C6C112C43ce576f315d5b1B6',
              decimal: 18
          },
          {
              chainId: 167000,
              symbol: 'USDC',
              address: '0x07d83526730c7438048D55A4fc0b850e2aaB6f0b',
              decimal: 6
          },
          {
              chainId: 167000,
              symbol: 'USDC.e',
              address: '0x19e26B0638bf63aa9fa4d14c6baF8D52eBE86C5C',
              decimal: 6
          },
      ]
  },
};

const getChainInfo = (chainId) => {
  return chains[chainId] || null;
};



const TOKEN_LIST_URL = 'https://tokenlist.izumi.finance/tokenList.json'

module.exports = {
  getChainInfo,
  TOKEN_LIST_URL
};
