class ReqDataBasketChildren{
    constructor(){
        this.ItemName
        this.list=[]
    }
    getName(){
        return this.ItemName
    }
    setName(val){
        this.ItemName=val
    }
    add(val){
        this.list = this.list.concat(val)
    }
}

module.exports=ReqDataBasketChildren