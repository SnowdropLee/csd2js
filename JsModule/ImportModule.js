class ImportModule {
    constructor() {
        this.importList 
    }
    //获取importList
    getList() {
        return this.importList
    }
    //设置importList
    setList(val) {
        this.importList = val
    }
    toTemplete() {
        var str = ''
        this.importList.forEach((item) => {
            str += `import ${item} from "./${item}";\n`
        })
        // console.log(str)
        return str
    }
}
module.exports = ImportModule;