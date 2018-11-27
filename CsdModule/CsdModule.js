const RequestModule = require('./RequestModule/RequestModule')
const ResponseModule = require('./ResponseModule/ResponseModule')

class CsdModule{
    constructor(){
        this.csdName
        this.caption
        this.description
        this.request = new RequestModule()
        this.response = new ResponseModule()
    }
    getCsdName(){
        return this.csdName
    }
    setCsdName(val){
        this.csdName = val
    }
    getCaption(){
        return this.caption
    }
    setCaption(val){
        this.caption = val
    }
    getDescription(){
        return
         this.description
    }
    setDescription(val){
        this.description = val
    }
    getRequest(){
        return this.request
    }
    setRequest(val){
        this.request = val
    }
    getResponse(){
        return this.response
    }
    setResponse(val){
        this.response = val
    }
}

module.exports = CsdModule