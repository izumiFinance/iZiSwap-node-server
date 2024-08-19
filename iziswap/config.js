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
