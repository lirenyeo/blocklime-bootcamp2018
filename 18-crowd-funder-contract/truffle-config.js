module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      from: "0xAd8f2eBec9CD5F1b6933031D338427b28e7cAB1d"
    },
    ropsten: {
      network_id: 3,
      host: "localhost",
      port: 8545,
      gas: 2900000,
      from: "0x370f660fd6779870079b5089283f2c754356ac82"
    }
  },
};