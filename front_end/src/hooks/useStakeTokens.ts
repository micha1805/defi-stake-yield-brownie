import { useContractFunction, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"

// The following is actually a mock (not done in the video course btw)
import ERC20 from "../chain-info/contracts/MockERC20.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants, utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { useState, useEffect } from "react"

export const useStakeTokens = (tokenAddress: string) => {
    // address
    // abi
    // chainId

    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const TokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const erc20ABI = ERC20.abi
    const erc20Interface = new utils.Interface(erc20ABI)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)
    // approve
    const { send: approveErc20Send, state: approveAndStakeErc20State } =
        useContractFunction(
            erc20Contract,
            "approve",
            { transactionName: "Approve ERC20 transfer" }
        )
    const approveAndStake = (amount: string) => {
        setAmountToStake(amount)
        return approveErc20Send(tokenFarmAddress, amount)
    }


    const { send: stakeSend, state: stakeState } =
        useContractFunction(
            TokenFarmContract,
            "stakeTokens",
            { transactionName: "Stake Tokens" }
        )

    // const [state, setState ] = useState(approveAndStakeErc20State)
    const [amountToStake, setAmountToStake] = useState("0")



    // useEffect
    useEffect(() => {
        if (approveAndStakeErc20State.status === "Success") {
            //stake function
            stakeSend(amountToStake, tokenAddress)
        }
    }, [approveAndStakeErc20State, tokenAddress, amountToStake])

    const [state, setState] = useState(approveAndStakeErc20State)

    useEffect(() => {
        if (approveAndStakeErc20State.status === "Success") {
            setState(stakeState)
        } else {
            setState(approveAndStakeErc20State)
        }
    }, [approveAndStakeErc20State, stakeState])

    return { approveAndStake, state }
}