class ClassModule {
    constructor(){
        this.name
        this.path
    }
    getName(){
        return this.name
    }
    setName(val){
        this.name =val
    }
    getPath(){
        return this.path
    }
    setPath(val){
        this.path = val
    }
    toTemplete(){
        var str = ''
        // this.importList.forEach((item) => {
        //     str += `export default ${this.ClassName}{\n
        //         constructor(){\n
        //             this.name=null;\n
        //             this.pass=null;\n`
        // })
        str+=`class ${this.name} {\n
            constructor(){\n
                this.name=null;\n
                this.path=null;\n
            }\n
            
        };\n
            `
        return str
    }
}
module.exports = ClassModule