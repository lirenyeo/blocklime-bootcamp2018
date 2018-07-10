const conf = require('./config.json')
const abi = require('../18-crowd-funder-contract/build/contracts/CrowdFunder.json')
const Web3 = require ('web3')
const contract = require('truffle-contract')
const BigNumber = require('bignumber.js')
const http = require('http')
const express = require('express');

const provider = new Web3.providers.HttpProvider(conf.provider)
const web3 = new Web3(provider)
const MyContract = contract(abi)
MyContract.setProvider(provider)

MyContract.at(conf.contract.address).then(crowdFunder => {
  const app = new express();

  app.get('/', (req, res) => {
    res.sendfile('index.html');
  });

  app.get('/contribute', (req, res) => {
    const { address, value } = req.query
    const ether = web3.toWei(parseFloat(value), 'ether')
    crowdFunder.contribute({
      from: address,
      value: ether,
      gas: 4712388,
      gasPrice: 100000000000
    }).then(() => {
      console.log(`SUCCESS! SENT ${ether} ETH`)
      res.sendfile('index.html');
    }).catch(err => {
      console.log(err)
      res.sendfile('index.html');
    })
  })

  app.get('/checkBalance', (req, res) => {
    crowdFunder.currentBalance()
    .then(bal => {
      console.log(web3.fromWei(bal).toNumber())
    })
  })


  app.listen(8080, () => console.log('Server is up...'))
})
