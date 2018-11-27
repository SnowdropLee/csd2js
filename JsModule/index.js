const ClassModule =require('./ClassModule');
const ExportModule =require('./ExportModule') ;
const ImportModule = require('./ClassModule');

class JsModule{
    constructor(name,importPart,exportPart){
        this.JsName = name
        this.importPart = new ImportModule()
        this.exportPart = new ExportModule()
    }
    getJsName(){
        return this.JsName
    }
    setJsName(val){
        this.JsName = val
    }
    getTemplete(){
        return this.templete
    }
    setTemplete(val){
        this.templete = val
    }
    toTemplete(){
        var str =''
        str+=this.importPart.toTemplete()
        str+=this.exportPart.toTemplete()
        return str
    }
}
module.exports = JsModule