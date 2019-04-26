const SHA256 = require('crypto-js/sha256');

class Block
{
    constructor (index, timestamp, data, previousHash = '')
    {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nounce = 0;
    }

    calculateHash()
    {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nounce).toString();
    }

    mineBlock(complexity)
    {
        while(this.hash.substring(0, complexity) !== Array(complexity + 1).join("0")){
            this.nounce++;
            this.hash = this.calculateHash()
        }

        console.log("Mineirando ", this.hash);
    }


}

class BlockChain
{
    constructor()
    {
        this.chain = [this.createGenesisBlock()];
        this.complexity = 2;
    }

    createGenesisBlock()
    {
        return new Block(0, "26/01/2019", "Hello World!", "0");
    }

    getLatestBlock()
    {
        return this.chain[this.chain.length - 1];
    }

    addBlock(novoBloco)
    {
        novoBloco.previousHash = this.getLatestBlock().hash;
        //novoBloco.hash = novoBloco.calculateHash();
        novoBloco.mineBlock(this.complexity);
        this.chain.push(novoBloco);
    }

    isChainValid()
    {
        for(var blocks = 1; blocks < this.chain.length; blocks++)
        {
            const currentBlock = this.chain[blocks];
            const previousBlock = this.chain[blocks - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            
            if(currentBlock.previousHash !== previousBlock.hash)
            {
                return false;
            }
        }

        return true;
    }




}

let gbbMoeda = new BlockChain();
console.log("MINING");
gbbMoeda.addBlock(new Block(1,"26/01/2019", {"amount": 10}));
gbbMoeda.addBlock(new Block(2,"26/01/2019", {"amount": 40}));
gbbMoeda.addBlock(new Block(3,"26/01/2019", {"amount": 1}));

//gbbMoeda.chain[1].data = {"amount": 1000};
//gbbMoeda.chain[1].hash = gbbMoeda[1].chain.calculateHash();


console.log(gbbMoeda);
console.log("Tudo OK?", gbbMoeda.isChainValid());