import { useEthers } from "@usedapp/core"
import { constants } from "ethers"
import helperConfig from "../helper-config.json"
import brownieConfig from "../brownie-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { YourWallet } from "./yourWallet"
import { makeStyles } from "@mui/styles"

import dapp from "../dapp.png"
import eth from "../eth.png"
import fau from "../dai.png"


export type Token = {
    image: string;
    address: string;
    name: string;
}


const useStyles = makeStyles((theme) => ({
    title: {
        color: "white",
        textAlign: "center",
        padding: `${4 * 8}px`
    }
}))
export const Main = () => {
    // Show token values from the wallet

    // get the address of different tokens
    // get the balance of the users wallet

    // send the brownie config to the src folder
    // send the build folder

    const classes = useStyles()

    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    // on prend l'index 0 car c'est le plus récent
    const dappTokenAddress = chainId ? networkMapping[String(chainId)]["DappToken"][0] : constants.AddressZero
    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
    const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero

    const supportedTokens: Array<Token> = [
        {
            image: dapp,
            address: dappTokenAddress,
            name: "DAPP"
        },
        {
            image: eth,
            address: wethTokenAddress,
            name: "WETH"
        },
        {
            image: fau,
            address: fauTokenAddress,
            name: "DAI"
        },
    ]

    return (
        <>
            <h2 className={classes.title}>Dapp Token App</h2>
            <YourWallet supportedTokens={supportedTokens} />
        </>
    )
}