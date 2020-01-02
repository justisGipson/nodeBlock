const crypto = require('crypto')

class Block {
    constructor(index, data, prevHash) {
        this.index = index
        this.timestamp  = Math.floor(Date.now() / 1000)
        this.data = data
        this.prevHash = prevHash
        this.hash = this.getHash()
    }

    getHash() {
        let encrypt = JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp
        let hash = crypto.createHmac('sha256', 'secret')
        .update(encrypt)
        .digest('hex')
        // return sha(JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp)
        return hash
    }
}

class Blockchain {
    constructor() {
        this.chain = []
    }

    addBlock(data) {
        let index = this.chain.length
        let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0
        let block = new Block(index, data, prevHash)
        this.chain.push(block)
    }

    chainIsValid() {
        for(let i = 0; i < this.chain.length; i++){
            if(this.chain[i].hash !== this.chain[i].getHash()) {
                return false
            }
            if(i > 0 && this.chain[i].prevHash !== this.chain[i-1].hash) {
                return false
            }            
        }
        return true
    }
}

const BChain = new Blockchain()
BChain.addBlock({sender: "User1", receiver: "User2", amount: 100})
BChain.addBlock({sender: "User3", receiver: "User4", amount: 50})
BChain.addBlock({sender: "User5", receiver: "User6", amount: 200})
console.dir(BChain, {depth: null})


console.log("********** Validity of this blockchain: ", BChain.chainIsValid())
