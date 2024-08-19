const { getGasPrice, getTokenWhitelist } = require("./utils")
const { initialChainTable } = require('iziswap-sdk/lib/base/types')
const { fetchToken } = require('iziswap-sdk/lib/base/token/token');
const { getSwapContract } = require('iziswap-sdk/lib/swap/funcs');
const { SwapDirection } = require('iziswap-sdk/lib/search/types');
const { searchPathQuery } = require('iziswap-sdk/lib/search/func');
const { getSwapChainWithExactInputCall } = require('iziswap-sdk/lib/swap/funcs');
const { getMulticallContracts } = require('iziswap-sdk/lib/base');
const { getChainInfo } = require('./config');
const { BigNumber } = require('bignumber.js');
// const ethers = require('ethers');
const Web3 = require('web3');

const swap = async (fromTokenAddress, toTokenAddress, amount, chainId, accountAddress) => {
    const chainInfo = getChainInfo(chainId)
    if(!chainInfo) {
        throw Error("chain not be supported")
    }

    const chain = initialChainTable[chainId]
    const web3 = new Web3(new Web3.providers.HttpProvider(chainInfo.rpc))
    const swapContract = getSwapContract(chainInfo.swapAddress, web3)
    let fromToken
    let toToken

    if (fromTokenAddress.toLowerCase() == chainInfo.gasTokenSymbol.toLowerCase()) {
        fromToken = await fetchToken(chainInfo.gasTokenAddress, chain, web3)
        fromToken.symbol = chainInfo.gasTokenSymbol
    } else {
        fromToken = await fetchToken(fromTokenAddress, chain, web3)
    }
    
    if (toTokenAddress.toLowerCase() == chainInfo.gasTokenSymbol.toLowerCase()) {
        toToken = await fetchToken(chainInfo.gasTokenAddress, chain, web3)
        toToken.symbol = chainInfo.gasTokenSymbol
    } else {
        toToken = await fetchToken(toTokenAddress, chain, web3)
    }

    const amountInput = new BigNumber(amount).times(10 ** fromToken.decimal).toFixed(0)

    const {pathQueryResult, preQueryResult} = await searchSwapPath(fromToken, toToken, amountInput, chainId)
    const gasPrice = await getGasPrice(chainId)

    if (pathQueryResult == undefined) {
        throw Error("cannot find swap path")
    }

    const swapParams = {
        tokenChain: pathQueryResult.path.tokenChain,
        feeChain: pathQueryResult.path.feeContractNumber,
        inputAmount: amountInput,
        minOutputAmount: pathQueryResult.amount
    }

    const {swapCalling, options} = getSwapChainWithExactInputCall(
        swapContract,
        accountAddress,
        chain,
        swapParams,
        gasPrice
    )

    const gasLimit = await swapCalling.estimateGas(options)

    const txParams = {
        to: chainInfo.swapAddress,
        data: swapCalling.encodeABI(),
        gasLimit: ethers.BigNumber.from(new BigNumber(gasLimit * 1.1).toFixed(0, 2)),
        gasPrice: ethers.BigNumber.from(String(gasPrice)),
        value: ethers.BigNumber.from(String(options.value)),
    }

    // const serializedTransaction = ethers.utils.serializeTransaction(txParams)
    return {pathQueryResult, txParams}
}

const searchSwapPath = async (fromToken, toToken, amountInput, chainId) => {
    const chainInfo = getChainInfo(chainId)
    const web3 = new Web3(new Web3.providers.HttpProvider(chainInfo.rpc))
    const multicallContract = getMulticallContracts(chainInfo.multicallAddress, web3)
    const tokenList = await getTokenWhitelist(chainId)

    const searchParams = {
        chainId: Number(chainId),
        web3: web3,
        multicall: multicallContract,
        tokenIn: fromToken,
        tokenOut: toToken,
        liquidityManagerAddress: chainInfo.liquidityManagerAddress,
        quoterAddress: chainInfo.quoterAddress,
        poolBlackList: [],
        midTokenList: tokenList,
        supportFeeContractNumbers: [3000, 500, 100],
        support001Pools: [],
        direction: SwapDirection.ExactIn,
        amount: amountInput
    }

    const {pathQueryResult, preQueryResult} = await searchPathQuery(
        searchParams
    )

    return {pathQueryResult, preQueryResult}
}

module.exports = {
  swap,
  searchSwapPath
};
