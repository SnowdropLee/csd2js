const ReqDataBasket = require('./ReqDataBasket')


class RequestModule{
    constructor(){
        this.reqContentType
        this.reqHeader
        this.reqBody = new ReqDataBasket()
    }
    getContentType(){
        return this.reqContentType
    }
    setContentType(val){
        this.reqContentType = val
    }
    getHeader(){
        return this.reqHeader
    }
    setHeader(val){
        this.reqHeader = val
    }
    getBody(){
        return this.reqBody
    }
    setBody(val){
        this.reqBody = val
    }
}

module.exports = RequestModule