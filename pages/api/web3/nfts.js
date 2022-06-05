export default function NFTs(req, res) {
    const { method, query: { address, chain } } = req
    const _chain = parseInt(chain) === 56 ? 'bsc' : 'bsc testnet'
    try {
        if (method === 'GET') {
            const link = `https://deep-index.moralis.io/api/v2/${address}/nft?&chain=${_chain}&format=decimal`
            fetch(link, {
                headers: {
                    Accept: "application/json",
                    "X-Api-Key": 'ZiRB9WnVKWBUNviwxM9rSlFiRkE9oavngp6k81FZKSMiHshKevunYwsyivMAhSo7'
                }
            }).then(async (req) => {
                if (req.ok) {
                    const { result } = await req.json()
                    return res.send({
                        data: result
                    })
                } else {
                    throw new Error(`${req.status} ${req.statusText}`)
                }
            }).catch((e) => {
                throw new Error(e)
            })
        } else {
            return res.status(403).send()
        }
    } catch (e) {
        return res.status(500).send()
    }
}