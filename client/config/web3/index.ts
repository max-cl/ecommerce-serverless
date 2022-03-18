import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";
import { provider } from "web3-core";

// const ETHERIUM_NETWORK_ID = 1; // ETHERIUM
const ETHERIUM_NETWORK_ID = 1337; // LOCAL ETHERIUM (GANACHE)

const connector = new InjectedConnector({
    supportedChainIds: [ETHERIUM_NETWORK_ID],
});

const getLibrary = (provider: provider) => {
    const library = new Web3(provider);
    return library;
};

export { connector, getLibrary };
