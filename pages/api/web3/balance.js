import { BscScan } from '@jpmonette/bscscan'
export default async function Balance(req, res) {
    const { method, query: { address, chain } } = req
    const client = new BscScan({
        apikey: process.env.BSCSCAN_API_KEY,
        baseUrl: parseInt(chain) === 56 ? 'https://api.bscscan.com/api?' : 'https://api-testnet.bscscan.com/api?'
    })
    try {
        if (method === 'GET') {
            client.accounts.getBalance({ address: address }).then((data) => {
                return res.send({
                    data: data
                })
            }).catch((e) => {
                throw new Error(e)
            })
        } else {
            return res.status(403).send()
        }
    } catch (e) {
        console.log(e)
        return res.status(500).send()
    }
}