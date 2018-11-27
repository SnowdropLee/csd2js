class AttrModule {
    constructor(){
        this.attrList
    }
    getAttrList(){
        return this.attrList
    }
    setAttrList(val){
        this.attrList = val
    }
    toTemplete(){
        var str = ''
        this.attrList.forEach((item) => {
            str += `import ${item} from "${item}";\n`
        })
        // console.log(str)
        return str
    }
}

module.exports = AttrModule