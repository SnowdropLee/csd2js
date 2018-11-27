class ResDataBasketChildren{
    constructor(){
        this.itemName
        this.list=[]
    }
    getName(){
        return this.ItemName
    }
    setName(val){
        this.ItemName=val
    }
    add(val){
        this.list=this.list.concat(val)
    }
}

module.exports=ResDataBasketChildren