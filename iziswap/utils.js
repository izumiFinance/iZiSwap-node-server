const { getQuoterContract } = require('iziswap-sdk/lib/quoter/funcs');
const { getSwapContract } = require('iziswap-sdk/lib/swap/funcs');
const { getChainInfo, TOKEN_LIST_URL } = require('./config');
const Web3 = require('web3');
const axios = require('axios');
const { getMulticallContracts } = require('iziswap-sdk/lib/base');

const getQuoterContractWithChainId = (chainId) => {
    const chain = getChainInfo(chainId)
    if(!chain) {
        return null
    }
    const web3 = new Web3(new Web3.providers.HttpProvider(chain.rpc))
    return getQuoterContract(chain.quoterAddress, web3)
}

const getSwapContractWithChainId = (chainId) => {
    const chain = getChainInfo(chainId)
    if(!chain) {
        return null
    }
    const web3 = new Web3(new Web3.providers.HttpProvider(chain.rpc))
    return getSwapContract(chain.swapAddress, web3)
}

const getMulticallContractWithChainId = (chainId) => {
    const chain = getChainInfo(chainId)
    if(!chain) {
        return null
    }
    const web3 = new Web3(new Web3.providers.HttpProvider(chain.rpc))
    return getMulticallContracts(chain.multicallAddress, web3)
      
}

const getGasPrice = async (chainId) => {
    const chain = getChainInfo(chainId)
    if(!chain) {
        return null
    }
    const web3 = new Web3(new Web3.providers.HttpProvider(chain.rpc))
    const gasPrice = await web3.eth.getGasPrice()
    return gasPrice + 1
}

async function getTokenWhitelist(chainId) {
    let whiteList = []
    try {
        const tokenListResponse = await axios.get(TOKEN_LIST_URL);
        const tokenListJson = tokenListResponse.data;

        tokenListJson.forEach(token => {
            if (token.chains.includes(chainId)) {
                const tokenFormatted = {
                  chainId: chainId,
                  symbol: token.symbol,
                  address: token.contracts[String(chainId)]?.address,
                  decimal: token.contracts[String(chainId)]?.decimal
                };
                if (tokenFormatted.address) {
                    whiteList.push(tokenFormatted);
                }
            }
        });

        whiteList = [...new Set(whiteList)];
    } catch (error) {
        whiteList = [];
    }
    return whiteList
}

async function getTokenAddress(chainId, tokenSymbol) {
    try {
      const tokenListResponse = await axios.get(TOKEN_LIST_URL);
      const tokenListJson = tokenListResponse.data;

      for(let token of tokenListJson){
          if (token.symbol.toLowerCase()==tokenSymbol.toLowerCase() && token.chains.includes(chainId)) {
              return token.contracts[String(chainId)]?.address;
          }
      }
    } catch (error) {
        throw Error('cannot find token address');
}
}

module.exports = {
    getQuoterContractWithChainId,
    getSwapContractWithChainId,
    getMulticallContractWithChainId,
    getGasPrice,
    getTokenWhitelist,
    getTokenAddress
};