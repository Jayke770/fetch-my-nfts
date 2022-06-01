// import fetch from "node-fetch"
const api_key = process.env.BSCSCAN_API_KEY
//this code only support bsc networks
const API = {
    //get wallet balance
    balance: async (address, network) => {
        let res = undefined
        const url = network === 'mainnet' ? 'api-testnet.bscscan.com' : 'api-testnet.bscscan.com'
        const endpoint = `https://${url}/api?module=account&action=balance&address=${address}&apikey=${api_key}`
        try {
            await fetch(endpoint).then(async (req) => {
                if (req.ok) {
                    res = await req.json()
                } else {
                    throw new Error(`${req.status} ${req.statusText}`)
                }
            })
        } catch (e) {
            res = e.message
        }
        //return response
        return res
    },
    transactions: async (address, network) => {
        let res = undefined
        const url = network === 'mainnet' ? 'api-testnet.bscscan.com' : 'api-testnet.bscscan.com'
        const endpoint = `https://${url}/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${api_key}`
        try {
            await fetch(endpoint).then(async (req) => {
                if (req.ok) {
                    res = await req.json()
                } else {
                    throw new Error(`${req.status} ${req.statusText}`)
                }
            })
        } catch (e) {
            res = e.message
        }
        //return response
        return res
    },
    bep721_transfer_events: async (address, contract_address, network) => {
        let res = undefined
        const url = network === 'mainnet' ? 'api-testnet.bscscan.com' : 'api-testnet.bscscan.com'
        const endpoint = `https://${url}/api?module=account&action=tokennfttx&contractaddress=${contract_address}&address=${address}&page=1&offset=10000&sort=asc&apikey=${api_key}`
        try {
            await fetch(endpoint).then(async (req) => {
                if (req.ok) {
                    res = await req.json()
                } else {
                    throw new Error(`${req.status} ${req.statusText}`)
                }
            })
        } catch (e) {
            res = e.message
        }
        //return response
        return res
    }
}
export default API