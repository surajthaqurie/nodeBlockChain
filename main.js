const crypto = require('crypto');

// create a class with the name Block.
class Block {
    // Our block will contain things that we have decided in our constructor.
    constructor(index, data, prevHash) {
        this.index = index;
        this.timestamp = Math.floor(Date.now() / 1000);
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.getHash();
    }

    // return the hash of data, it will encrypt all the data. The function will use the SHA256 algorithm to encrypt.
    getHash() {
        var encript = JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp;
        var hash = crypto.createHmac('sha256', "secret")
            .update(encript)
            .digest('hex');
        // return sha(JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp);
        return hash;
    }
}

// This is all the blockchain, the actual blockchain.
class BlockChain {
    // This constructor will create a chain where we will keep all our blocks.
    constructor() {
        this.chain = [];
    }

    // This code will create a new block and add it to the chain.
    addBlock(data) {
        let index = this.chain.length;
        let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0;
        let block = new Block(index, data, prevHash);
        this.chain.push(block);
    }
    // THis  code will detect the validity of the block.
    chainIsValid() {
        for (var i = 0; i < this.chain.length; i++) {
            if (this.chain[i].hash !== this.chain[i].getHash())
                return false;
            if (i > 0 && this.chain[i].prevHash !== this.chain[i - 1].hash)
                return false;
        }
        return true;
    }
}

// This will create an object of BlockChain
const BChain = new BlockChain();

// This Code will create a block with the given data.
BChain.addBlock({ sender: "Bruce wayne", reciver: "Tony stark", amount: 100 });
BChain.addBlock({ sender: "Harrison wells", reciver: "Han solo", amount: 50 });
BChain.addBlock({ sender: "Tony stark", reciver: "Ned stark", amount: 75 });
console.dir(BChain, { depth: null })

// change block 0, changing the name “Bruce wayne” to “Joker”.
// BChain.chain[0].data.receiver = "Joker";  //==> For flase Checking validity  of this Block Chain

console.log("******** Validity of this blockchain: ", BChain.chainIsValid());