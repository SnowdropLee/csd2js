class CSDImportModule {
    constructor() {
        this.importList =new Map()
    }
    //获取importList
    getList() {
        return this.importList
    }
    //设置importList
    setList(val,key) {
        this.importList.set(val,key)
    }
    toTemplete() {
        var str = ''
        this.importList.forEach((val,key)=>{
            str+=`
              import ${key} from './${val};\n'
            `
          })
        // console.log(str)
        return str
    }
}
module.exports = CSDImportModule;