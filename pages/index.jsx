import { useEffect } from 'react'
import Head from "next/head"
import NavBar from "../components/NavBar"
import Account from '../components/Account'
import { useWeb3React } from '@web3-react/core'
import connectors from '../lib/web3/connectors'
export default function Home() {
  const { activate, active, account, chainId } = useWeb3React()
  useEffect(() => {
    const check = async () => {
      if (parseInt(localStorage.getItem('wallet')) === 1) {
        try {
          await activate(connectors.injected)
        } catch (e) {
          console.log(e)
        }
      }
    }
    check()
  }, [])
  return (
    <>
      <Head>
        <title>{"Fetch my NFT's"}</title>
      </Head>
      <NavBar />
      <Account account={account} chain={chainId} />
    </>
  )
}