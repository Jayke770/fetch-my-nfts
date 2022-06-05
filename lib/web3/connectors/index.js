import { InjectedConnector } from '@web3-react/injected-connector'
const injected = new InjectedConnector({
    supportedChainIds: [1, 2, 3, 4, 5, 42, 97, 56]
})
const connectors = {
    injected: injected
}
export default connectors