const ImportModule = require('./ImportModule')

class ExportModule{
    constructor(){
        this.ClassName
        this.importList 
        this.attrList
    }
    getClassName(){
        return this.ClassName
    }
    setClassName(val){
        this.ClassName=val
    }
     //获取importList
     getList() {
        return this.ClassName
    }
    //设置importList
    setList(val) {
        this.importList = val
    }
    getAttrList(){
        return this.attrList
    }
    setAttrList(val){
        this.attrList = val
    }
    toTemplete() {
        var str = ''
        str += `export default class ${this.ClassName}{\n
            constructor(){\n
                `
        this.importList.forEach((item) => {
            str +=`
                this.${item} = new ${item}();\n
            `
        })
        if(this.attrList){
            this.attrList.forEach(item=>{
                str+=`
                    this.${item} = null;\n
                `
            })
        }
        str += `}};\n`

        return str
    }
}
module.exports = ExportModule