import { useState } from 'react'
import { Tabbar, TabbarLink, Card } from 'konsta/react'
import { BscScan } from '@jpmonette/bscscan'
const client = new BscScan({
    apikey: process.env.BSCSCAN_API_KEY,
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://api.bscscan.com/api?' : 'https://api-testnet.bscscan.com/api?'
})
export default function Account({ account, network }) {
    const [tab, setTab] = useState({
        current: 0,
        account: {
            balance: undefined,
            transactions: undefined,
            nft_transactions: undefined
        },
        contractAddress: undefined
    })
    return (
        <>
            <div className='flex flex-col gap-3 p-2 pb-18'>
                {/* intro */}
                {tab.current === 0 && (
                    <Card
                        margin='m-0'>
                        <p className='text-center text-lg'>For BSC Networks Only</p>
                    </Card>
                )}
                {/* Account Balance */}
                {tab.current === 1 && (
                    <Card
                        className='animate__animated animate__fadeInUp ms-500'
                        margin='m-0'
                        header="Wallet Balance">
                        <div className='flex flex-col gap-3'>
                            <div className="w-full flex justify-between">
                                <span>Address</span>
                                <span>{`${account.substring(0, 5)}...${account.substring(30, 42)}`}</span>
                            </div>
                            <div className="w-full flex justify-between">
                                <span>Balance</span>
                                <span>{tab.account.balance}</span>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Account Transactions */}
                {tab.current === 2 && (
                    tab.account.transactions.length !== 0 ? (
                        tab.account.transactions.map((data, i) => (
                            <Card
                                className='animate__animated animate__fadeInUp ms-500'
                                key={i}
                                margin='m-0'
                                header={
                                    <div className='flex justify-between'>
                                        <span>Block Number</span>
                                        <span className='text-gray-300'>{data.blockNumber}</span>
                                    </div>
                                }>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex justify-between'>
                                        <span>From</span>
                                        <span className='text-gray-300'>{data.from}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span>To</span>
                                        <span className='text-gray-300'>{data.to}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span>Contract Address</span>
                                        <span className='text-gray-300'>{data.contractAddress ? data.contractAddress : 'Null'}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span>Hash</span>
                                        <span className='text-gray-300'>{data.hash}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span>Block Hash</span>
                                        <span className='text-gray-300'>{data.blockHash}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span>Value</span>
                                        <span className='text-gray-300'>{data.value}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span>Confirmations</span>
                                        <span className='text-gray-300'>{data.confirmations}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span>Time</span>
                                        <span className='text-gray-300'>{data.timeStamp}</span>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <Card
                            className='animate__animated animate__fadeInUp ms-500'
                            margin='m-0'>
                            <p className='text-xl text-center'>No recorded transactions yet!</p>
                        </Card>
                    )
                )}

                {/* BEP721 Transfer Events */}
                {tab.current === 3 && (
                    tab.account.nft_transactions.map((data, i) => (
                        <Card
                            margin='m-0'
                            className='animate__animated animate__fadeInUp ms-500'
                            key={i}
                            header={
                                <div className='flex justify-between'>
                                    <span>Block Number</span>
                                    <span className='text-gray-300'>{data.blockNumber}</span>
                                </div>
                            }>
                            <div className='flex flex-col gap-4'>
                                <div className='flex justify-between'>
                                    <span>From</span>
                                    <span className='text-gray-300'>{data.from}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>From</span>
                                    <span className='text-gray-300'>{data.to}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Token Name</span>
                                    <span className='text-gray-300'>{data.tokenName}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Token Symbol</span>
                                    <span className='text-gray-300'>{data.tokenSymbol}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span>Token ID</span>
                                    <span className='text-gray-300'>{data.tokenID}</span>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
            <Tabbar
                className='fixed bottom-0 left-0'>
                <TabbarLink
                    active={tab.current === 1}
                    onClick={() => {
                        client.accounts.getBalance({ address: account }).then((res) => {
                            setTab({ ...tab, current: 1, account: { ...tab.account, balance: res } })
                        })
                    }}>Wallet Balance</TabbarLink>
                <TabbarLink
                    active={tab.current === 2}
                    onClick={() => {
                        client.accounts.getTxList({ address: account }).then((res) => {
                            setTab({ ...tab, current: 2, account: { ...tab.account, transactions: res } })
                        })
                    }}>Transactions</TabbarLink>
                <TabbarLink
                    active={tab.current === 3}
                    onClick={() => {
                        client.accounts.getTokenNFTTx({ address: account }).then((res) => {
                            setTab({ ...tab, current: 3, account: { ...tab.account, nft_transactions: res } })
                        })
                    }}>NFT Transactions</TabbarLink>
            </Tabbar>
        </>
    )
}