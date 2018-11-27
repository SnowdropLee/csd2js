//dataBasketChildren模型
class DataBasketChldren {
    constructor(){
        this.list=[]
    }
    add(val){
        this.list = this.list.concat(val)
    }
  
}
module.exports = DataBasketChldren;