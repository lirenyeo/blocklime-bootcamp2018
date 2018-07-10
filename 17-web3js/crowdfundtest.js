var conf = require('./config.json')
var abi = require('/Users/liren/code/blockchain/crowd-funder-sc/build/contracts/CrowdFunder.json')
var Web3 = require ('web3')
var contract = require('truffle-contract')
var BigNumber = require('bignumber.js')

var web3 = new Web3(new Web3.providers.HttpProvider(conf.provider))
var MyContract = contract(abi)

MyContract.setProvider(new Web3.providers.HttpProvider(conf.provider))

MyContract.at(conf.contract.address)
  .then(crowdFunder => crowdFunder.currentBalance())
  .then(bal => {
    console.log(web3.fromWei(bal).toNumber())
  })
  .catch(err => console.log(err))
