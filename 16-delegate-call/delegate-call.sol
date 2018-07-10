contract E {
  uint public n;
  address public sender;

  function setN(uint _n) {
    n = _n;
    sender = msg.sender;
  }
}

contract D {
    uint public n;
    address public sender;

    var e = new E();

    function callSetN(uint _n) {
        e.setN(_n);
    }

    // result:
    // msg.sender -> contract D address
    // contract E's state variable n will be changed to local _n

    function delegateallSetN(uint _n) {
        e.delegatecall(bytes4(sha3("setN(uint256)")), _n);
    }

    // result:
    // msg.sender -> address of actual person who calls contract D
    // contract D's state variable will get updated, not E
}

/*
1. you dont touch contract E n variable
2. msg.sender remains the person who calls contract D
3. bytes4(sha3("func name")) is just how function names are in blockchain. first 4 bytes of sha3 hashing of function name
*/