var CrowdFunder = artifacts.require("./CrowdFunder.sol");

module.exports = function(deployer) {
  // deployer is a truffle deployer agent
  deployer.deploy(
    CrowdFunder,
    20,
    'https://lirenyeo.me',
    '0x370f660fd6779870079b5089283f2c754356ac82',
    2
  );
};
