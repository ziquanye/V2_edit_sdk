import JSBI from 'jsbi'
import { Contract } from '@ethersproject/contracts'
import { getNetwork } from '@ethersproject/networks'
import { getDefaultProvider } from '@ethersproject/providers'
// import Router from './abis/Router.json'
import Router from './abis/FSN_Router.json'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  // MAINNET = 1,
  // ROPSTEN = 3,
  // RINKEBY = 4,
  // GÖRLI = 5,
  // KOVAN = 42,
  FSN = 1667 // 增加FSN网络ID
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

// export const FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f' // 以太坊网络
export const FACTORY_ADDRESS = '0x74aC9080Bf16D3603F6aef02dBe1Ce8806049BAd'

export const INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'

// export const ROUTER_ADDRESS = '0x85af5505cA753045CfCF4ab98C0bC8d4F828B1B3' // 以太坊网络
export const ROUTER_ADDRESS = '0x2c9cF55B50ba2F773A195e038CE1FF4c529f5264' //  FSN网络
const provider = getDefaultProvider(getNetwork('4'));
export const getSwapFee  = async() => {
  // 0: "3"
  // 1: "3"
  // 2: "3"
  // _addLiquidityFee: "3"
  // _removeLiquidityFee: "3"
  // _swapFee: "3"
  const {_swapFee, _addLiquidityFee, _removeLiquidityFee} = await new Contract(ROUTER_ADDRESS, Router.abi, provider).getFeeVal()
  console.log('_swapFee: ' + _swapFee)
  console.log('_addLiquidityFee: ' + _addLiquidityFee)
  console.log('_removeLiquidityFee: ' + _removeLiquidityFee)
  return _swapFee
}

let fee:any = ''
async() => {
  fee = await getSwapFee()
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)
export const _10000 = JSBI.BigInt(10000)
export const SWAPFEE = JSBI.BigInt(fee)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
