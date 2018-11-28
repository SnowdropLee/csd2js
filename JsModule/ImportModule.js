const fs = require('fs');

const path = require('path');


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
            // data://teller-messages/xm/zzz.xm
            var pathstr = item.replace('data://teller-messages/xm/','')
            pathstr = pathstr.split('.xm')[0]
            str +=`import ${path.basename(item).split('.')[0]} from './${pathstr}';\n`
        })
        // console.log(str)
        return str
    }
}
module.exports = ImportModule;