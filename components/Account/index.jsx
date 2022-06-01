import { useState, useEffect } from 'react'
import { Tabbar, TabbarLink, Card, List, ListInput, ListButton } from 'konsta/react'
import API from '../../lib/web3/api'
export default function Account({ account, network }) {
    const [tab, setTab] = useState({
        current: 0,
        account: {
            balance: undefined,
            transactions: undefined,
            bep721_transafer_events: undefined
        },
        contractAddress: undefined
    })
    const fetchData = () => {
        API.bep721_transfer_events(account, tab.contractAddress, network).then((res) => {
            setTab({ ...tab, account: { ...tab.account, bep721_transafer_events: res.result } })
        })
    }
    console.log(tab)
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
                    <>
                        <Card
                            className='animate__animated animate__fadeInUp ms-500'
                            margin='m-0'
                            header="Contract Address">
                            <List
                                margin='m-0'
                                hairlines={false}>
                                <ListInput
                                    floatingLabel
                                    label="Enter Contract Address"
                                    placeholder="Enter Contract Address"
                                    onInput={(e) => setTab({ ...tab, contractAddress: e.target.value })} />
                                <ListButton
                                    className='mx-3'
                                    onClick={fetchData}>Fetch Data</ListButton>
                            </List>
                        </Card>
                        {/* Display data */}
                        {tab.account.bep721_transafer_events !== undefined && tab.account.bep721_transafer_events.map((data, i) => (
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
                        ))}
                    </>
                )}
            </div>
            <Tabbar
                className='fixed bottom-0 left-0'>
                <TabbarLink
                    active={tab.current === 1}
                    onClick={() => {
                        API.balance(account, network).then((res) => {
                            console.log(res)
                            setTab({ ...tab, current: 1, account: { ...tab.account, balance: res.result } })
                        })
                    }}>Wallet Balance</TabbarLink>
                <TabbarLink
                    active={tab.current === 2}
                    onClick={() => {
                        API.transactions(account, network).then((res) => {
                            console.log(res)
                            setTab({ ...tab, current: 2, account: { ...tab.account, transactions: res.result } })
                        })
                    }}>Transactions</TabbarLink>
                <TabbarLink
                    active={tab.current === 3}
                    onClick={() => {
                        setTab({ ...tab, current: 3 })
                    }}>BEP721 Transfer Events</TabbarLink>
            </Tabbar>
        </>
    )
}