require("@nomicfoundation/hardhat-toolbox");

const NEXT_PUBLIC_RPC_URL = "https://rpc.ankr.com/eth_holesky";
const NEXT_PUBLIC_MAINNET_RPC_URL =
  "https://mainnet.infura.io/v3/86f5f381e08d4293abc8c36b2cdb0580"; // Cambia esto según tu proveedor de nodo

const NEXT_PUBLIC_PRIVATE_KEY =
  "c0f2d8bcbd5773fba6113e54cebcf168e070aa5f238c956f3ea842de2d5e34f9";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    //holesky: {
    //url: NEXT_PUBLIC_RPC_URL,
    // accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
    //},
    // mainnet: {
    // url: NEXT_PUBLIC_MAINNET_RPC_URL, // Reemplaza con tu URL RPC real
    // accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
    // chainId: 1, // ID de la red mainnet
    // },
  },
};
