
// import {DataBasketModule,DataBasketChldren} from './Databasket';
const DataBasketModule = require('./Databasket');
const DataBasketChldren = require('./Databasket');

class XmModule {
    constructor(){
        this.xmName
        this.xmCaption
        this.description
        this.dataBasket = new DataBasketModule()
    }
    //读取，设置name
    getXmName(){
        return this.xmName
    }
    setXmName(val){
        this.xmName = val
    }
    //读取，设置caption
    getXmCaption(){
        return this.xmCaption
    }
    setXmCaption(val){
        this.xmCaption = val
    }
    //读取，设置description
    getDescription(){
        return this.description
    }
    setDescription(val){
        this.description = val
    }
    //读取，设置dataBasket
    getDataBasket(){
        return this.getDataBasket
    }
    setDataBasket(val){
        this.dataBasket = val
    }

}

module.exports=XmModule
