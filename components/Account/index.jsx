import { useState } from 'react'
import { Tabbar, TabbarLink, Card } from 'konsta/react'
export default function Account({ account, chain }) {
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
                <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
                    {tab.current === 3 && (
                        tab.account.nft_transactions.map((data, i) => {
                            const metadata = JSON.parse(data.metadata)
                            return (
                                <Card
                                    margin='m-0'
                                    key={i}
                                    header={
                                        <div className='relative -mx-4'>
                                            <img
                                                src={metadata ? metadata.image : data.token_uri}
                                                className="h-72 w-full object-contain" />
                                            <span className='absolute px-2 bottom-2'>{data.name}</span>
                                        </div>
                                    }>
                                </Card>
                            )
                        })
                    )}
                </div>
            </div>
            <Tabbar
                className='fixed bottom-0 left-0'>
                <TabbarLink
                    active={tab.current === 1}
                    onClick={() => {
                        fetch(`/api/web3/balance?address=${account}&chain=${chain}`).then(async (req) => {
                            if (req.ok) {
                                const { data } = await req.json()
                                setTab({ ...tab, current: 1, account: { ...tab.account, balance: data } })
                            } else {
                                throw new Error(`${req.status} ${req.statusText}`)
                            }
                        }).catch((e) => {
                            console.log(e)
                        })
                    }}>Wallet Balance</TabbarLink>
                <TabbarLink
                    active={tab.current === 2}
                    onClick={() => {
                        fetch(`/api/web3/transaction_list?address=${account}&chain=${chain}`).then(async (req) => {
                            if (req.ok) {
                                const { data } = await req.json()
                                setTab({ ...tab, current: 2, account: { ...tab.account, transactions: data } })
                            } else {
                                throw new Error(`${req.status} ${req.statusText}`)
                            }
                        }).catch((e) => {
                            console.log(e)
                        })
                    }}>Transactions</TabbarLink>
                <TabbarLink
                    active={tab.current === 3}
                    onClick={() => {
                        fetch(`/api/web3/nfts?address=${account}&chain=${chain}`).then(async (req) => {
                            if (req.ok) {
                                const { data } = await req.json()
                                console.log(data)
                                setTab({ ...tab, current: 3, account: { ...tab.account, nft_transactions: data } })
                            } else {
                                throw new Error(`${req.status} ${req.statusText}`)
                            }
                        }).catch((e) => {
                            console.log(e)
                        })
                    }}>{"NFT's"}</TabbarLink>
            </Tabbar>
        </>
    )
}