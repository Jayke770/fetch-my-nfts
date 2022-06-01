import { useState, useEffect } from 'react'
import { Icon, Link, Navbar, NavbarBackLink, Actions, ActionsGroup, ActionsLabel, ActionsButton } from "konsta/react"
import { WalletFill } from 'framework7-icons/react'
import { useWeb3React } from "@web3-react/core"
import connectors from '../../lib/web3/connectors'
export default function NavBar({ back_btn, title }) {
    const [wallet, setWallet] = useState({
        opened: false,
        balance: undefined
    })
    const { active, activate, deactivate, account, chainId, library } = useWeb3React()
    return (
        <>
            <Navbar
                left={back_btn && <NavbarBackLink />}
                title={title ? title : "Fetch my NFT's"}
                right={
                    <>
                        <Link
                            navbar
                            onClick={() => setWallet({ ...wallet, opened: true })}>
                            <Icon
                                badge=' '
                                badgeColors={{ bg: active ? 'bg-teal-500' : 'bg-red-500' }}>
                                <WalletFill className="w-7 h-7" />
                            </Icon>
                        </Link>
                    </>
                } />

            <Actions
                opened={wallet.opened}
                onBackdropClick={() => setWallet({ ...wallet, opened: false })}>
                <ActionsGroup>
                    <ActionsLabel>Wallet Information</ActionsLabel>
                    {active ? (
                        <>
                            <ActionsLabel>
                                <div className="w-full flex justify-between">
                                    <span>Address</span>
                                    <span>{`${account.substring(0, 5)}...${account.substring(30, 42)}`}</span>
                                </div>
                            </ActionsLabel>
                            <ActionsLabel>
                                <div className="w-full flex justify-between">
                                    <span>Chain ID</span>
                                    <span>{chainId}</span>
                                </div>
                            </ActionsLabel>
                        </>
                    ) : (
                        <ActionsButton onClick={async () => {
                            try {
                                await activate(connectors.injected)
                                localStorage.setItem('wallet', 1)
                            } catch (e) {
                                console.log(e)
                            }
                        }}>Connect Wallet</ActionsButton>
                    )}
                </ActionsGroup>
                {active &&
                    <ActionsGroup>
                        <ActionsButton
                            colors={{ text: 'text-red-500' }}
                            onClick={async () => {
                                deactivate()
                                localStorage.setItem('wallet', 0)
                            }}>DIsconnect Wallet</ActionsButton>
                    </ActionsGroup>}
            </Actions>
        </>
    )
}