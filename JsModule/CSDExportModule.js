class CSDExportModule {
    constructor() {
        this.ClassName
        this.requestAttr
        this.requestXMList = []
        this.requestADEList = []
        this.responseAttr
        this.responseXMList = []
        this.responseADEList = []
    }
    getClassName() {
        return this.ClassName
    }
    setClassName(val) {
        this.ClassName = val
    }
    getRequestAttr() {
        return this.requestAttr
    }
    setRequestAttr(val) {
        this.requestAttr = val
    }
    getResponseAttr() {
        return this.responseAttr
    }
    setResponseAttr(val) {
        this.responseAttr = val
    }
    getrequestXMList() {
        return this.requestXMList
    }
    setrequestXMList(val) {
        this.requestXMList.push(val)
    }
    getrequestADEList() {
        return this.requestADEList
    }
    setrequestADEList(val) {
        this.requestADEList.push(val)
    }

    getresponseXMList() {
        return this.responseXMList
    }
    setresponseXMList(val) {
        this.responseXMList.push(val)
    }

    getresponseADEList() {
        return this.responseADEList
    }
    setresponseADEList(val) {
        this.responseADEList.push(val)
    }

    toTemplete() {
        var str = ''
        str += `
        export default class ${this.ClassName}{
            constructor(){
                this.request = new ${this.ClassName}Request();
                this.response = new ${this.ClassName}Response();
            }
        }`
        //设置 Request类
        // str +=`
        //     class ${this.ClassName}Request{
        //         constructor(){`
        // this.requestXMList.forEach(item=>{
        //     str+=`
        //         this.${item} = new ${item}();\n
        //     `
        // })
        // this.requestADEList.forEach(item=>{
        //     str+=`
        //         this.${item} = null;\n
        //     `
        // })
        // str += `}};\n`
        str += `
        class ${this.ClassName}Request{
            constructor(){
                this.content = new Requestcontent()
            }
        }
        `

        //设置Response类
        // str +=`
        //     class ${this.ClassName}Response{
        //         constructor(){`
        // this.responseXMList.forEach(item=>{
        //     str+=`
        //         this.${item} = new ${item}();\n
        //     `
        // })
        // this.responseADEList.forEach(item=>{
        //     str+=`
        //         this.${item} = null;\n
        //     `
        // })
        // str += `}};\n`
        str += `
        class ${this.ClassName}Response{
            constructor(){
                this.content = new Responsecontent()
            }
        }
        `
        //设置Requestcontent
        str += `
        class Requestcontent{
            constructor(){`
        this.requestXMList.forEach(item => {
            str += `
                this.${item} = new ${item}();\n
            `
        })
        this.requestADEList.forEach(item => {
            str += `
                this.${item} = null;\n
            `
        })
        str += `}};\n`


        //设置Responsecontent
        str += `
        class Responsecontent{
            constructor(){`
        this.responseXMList.forEach(item=>{
            str+=
            `
            this.${item} = new ${item}();\n
            `
        })
        this.responseADEList.forEach(item=>{
            str+=`
            this.${item} = null;\n
            `
        })
        str += `}};\n`
        return str
    }

}

module.exports = CSDExportModule;