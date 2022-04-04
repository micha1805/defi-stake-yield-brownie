import { useEthers } from "@usedapp/core"
import { Button } from "@mui/material"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 4 * 8,
        display: "flex",
        justifyContent: "flex-end",
        gap: 8
    }
}))

export const Header = () => {

    const classes = useStyles()
    const { account, activateBrowserWallet, deactivate } = useEthers()
    const isConnected = account !== undefined

    return (
        <div className={classes.container}>

            <div>
                {isConnected ? (


                    <Button color="primary" onClick={deactivate} variant="contained">
                        Disconnect
                    </Button>

                ) : (
                    <Button color="primary" onClick={() => activateBrowserWallet()} variant="contained">
                        Connect
                    </Button>
                )
                }
            </div>
        </div>
    )
}