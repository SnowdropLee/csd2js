const ResDataBasket = require('./ResDataBasket')

class ResponseModule{
    constructor(){
        this.ResContentType
        this.ResHeader
        this.ResBody = new ResDataBasket()
    }
    getContentType(){
        return this.ResContentType
    }
    setContentType(val){
        this.ResContentType = val
    }
    getHeader(){
        return this.ResHeader
    }
    setHeader(val){
        this.ResHeader = val
    }
    getBody(){
        return this.ResBody
    }
    setBody(val){
        this.ResBody = val
    }
}

module.exports = ResponseModule