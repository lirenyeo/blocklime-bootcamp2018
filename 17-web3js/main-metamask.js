var conf = require('./config.json')
const abi = require('../18-crowd-funder-contract/build/contracts/CrowdFunder.json')
var Web3 = require('web3')
var contract = require('truffle-contract')
var BigNumber = require('bignumber.js')
var http = require('http')
var Url = require('url')
var fs = require('fs')

var provider = new Web3.providers.HttpProvider(conf.provider)
var web3 = new Web3(provider)
var MyContract = contract(abi)
MyContract.setProvider(provider)

MyContract.at(conf.contract.address).then(function (crowdFunder) {
  var app = http.createServer((req, res) => {
    var url = Url.parse(req.url, true)

    fs.readFile('./main-metamask.html', (err, data) => {
      res.end(data.toString())
    })
  })

  app.listen(8080, function () {
    console.log("running main-metamask...")
  })
})