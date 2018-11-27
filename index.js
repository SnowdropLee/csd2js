const fs = require('fs')
const path = require('path')
const CsdModule = require('./CsdModule/CsdModule')
const RequestModule = require('./CsdModule/RequestModule/RequestModule')
const ResponseModule = require('./CsdModule/ResponseModule/ResponseModule')
const ReqDataBasket = require('./CsdModule/RequestModule/ReqDataBasket')
const ReqDataBasketChildren = require('./CsdModule/RequestModule/ReqDataBasketChildren')
const ResDataBasket = require('./CsdModule/ResponseModule/ResDataBasket')
const ResDataBasketChildren = require('./CsdModule/ResponseModule/ResDataBasketChildren')
const XmModule = require('./XMmodule/XmModule');
const DataBasketModule = require('./XMmodule/Databasket')
const DatabasketChleren = require('./XMmodule/DatabasketChildren')
const JsModule = require('./JSmodule/index');
const ClassModule = require('./JSmodule/ClassModule');
const ExportModule = require('./JSmodule/ExportModule');
const ImportModule = require('./JSmodule/ImportModule');
const AttrModule = require('./JsModule/AttrModule')
const CSDExportModule = require('./JsModule/CSDExportModule')

//生成csd文件内容
function CSD2String(url) {
    console.log('url:' + url)

    //读csd文件
    var data = JSON.parse(fs.readFileSync(url))
    // console.log(data)


    //设置csdmoduld
    var csmodule = new CsdModule()
    csdName = path.basename(url).split('.')[0]
    csmodule.setCsdName(formatName(csdName))
    csmodule.setCaption(data.caption)
    csmodule.setDescription(data.description)
    var request = data.request
    csmodule.setRequest(request)
    var response = data.response
    csmodule.setResponse(response)
    // console.log(csmodule)

    //设置requestmodule
    var requestmodule = new RequestModule()
    requestmodule.setContentType(request.contentType)
    requestmodule.setHeader(request.header)
    var reqBody = request.body
    requestmodule.setBody(reqBody)
    // console.log(requestmodule)

    //设置reqdatabasket
    var reqdatabasket = new ReqDataBasket()
    reqBody.forEach(item => {
        reqdatabasket.add(item)
    })
    // console.log(reqdatabasket)

    //设置responsemodule
    var responsemoduld = new ResponseModule()
    responsemoduld.setContentType(response.contentType)
    responsemoduld.setHeader(response.header)
    var resBody = response.body
    responsemoduld.setBody(resBody)

    //设置resdatabasket
    var resdatabasket = new ResDataBasket()
    resBody.forEach(item => {
        resdatabasket.add(item)
    })
    // console.log(resdatabasket)

    //设置imopormoduld
    var importlist = []
    importlist.push(...reqdatabasket, ...resdatabasket)
    // console.group('importlist')
    //     console.dir(importlist)
    //     [ 'data://teller-messages/xm/PC_Args.xm',
    //     'data://teller-messages/xm/IP_INQ_IP_TRN_I.xm',
    //     'data://teller-messages/xm/XXX/xxx.xm',
    //     'data://teller-messages/xm/IP_INQ_IP_TRN_O.xm' ]

    // console.groupEnd()
    importlist.forEach(function (e, i, importlist) {
        importlist[i] = e.split('//')[1]
    });
    console.group('CSD2String------importlist!!!!!!!!!!')
    console.dir(importlist)
    console.groupEnd()


    // console.log('importlist:'+importlist)

    var dataChildren = [] //获取要生成js文件的数组
    var csdAttrs = []
    importlist.forEach(item => {
        if (path.extname(item) === '.xm') {
            var xmpath = ''
            if (csdFile) {
                //获取xm文件路径
                var patharr = csdFile.split('/')
                if (fs.statSync(csdFile).isDirectory()) { //如果是文件夹
                    patharr.remove('csd')
                    var itemarr = item.split('/')

                    var itempatharr = concat(patharr, itemarr)
                    // console.log('patharr!!!!!!!!!!!!!11111')
                    // console.dir(itempatharr)
                    item = itempatharr.join('/')


                    // xmpath = patharr.join('/') + '/xm/'
                } else { //是文件
                    patharr.remove('csd')
                    patharr.remove(patharr[patharr.length - 1])
                    var itemarr = item.split('/')
                    var itempatharr = concat(patharr, itemarr)
                    // console.log('patharr!!!!!!!!!!!!!22222')
                    // console.dir(itempatharr)
                    item = itempatharr.join('/')

                    // xmpath = patharr.join('/') + '/xm/'
                }
                // console.log(xmpath)
                // console.log(path.resolve('/teller-messages/xm/PC_Args.xm'))
                // console.log(path.resolve(item))
            } 
            // else {
            //     xmpath = './xm/'
            // }
            // item = xmpath + path.basename(item)
            dataChildren = dataChildren.concat(readXmFile(item))


            // console.log(dataChildren)
        }
        //设置csd文件属性
        if (path.extname(item) === '.ade') {
            // console.log(item)
            var attrName = path.basename(item).split('.')[0]
            csdAttrs.push(attrName)
        }
    })

    console.group('dataChildren')
        console.dir(dataChildren)
    console.groupEnd()

    dataChildren.forEach(item => {
        console.log(item)

        // console.log(item)
        //处理文件路径
        // itemPath = './xm/' + item + '.xm'
        // console.log(itemPath)

        //处理dataChildren
        // console.log(1111)
        // console.log(item)
        // console.log(222)
        var arr = readXmFile(item)

        // console.dir(arr)



        //生成js文件内容
        var str = XM2String(item)
        // console.log(str)
        // console.log(333)

        //生成js文件
        writeFile(path.basename(item).split('.')[0], str)
    })


    //处理importlist,只获取.xm文件,只保留名称
    var arr = []
    importlist.forEach(item => {
        if (path.extname(item) === '.xm') {
            item = path.basename(item).split('.')[0]
            // console.log(item)
            arr.push(item)
        }
        return arr
    })

    // console.log(importlist)
    var importmodule = new ImportModule()
    importmodule.setList(arr)
    // console.log(importmodule.importList)
    var importStr = importmodule.toTemplete()
    // console.log(importStr)

    // var exportmodule = new ExportModule()
    // exportmodule.setClassName(csmodule.csdName)
    // exportmodule.setList(arr)
    // exportmodule.setAttrList(csdAttrs)
    // var expStr = exportmodule.toTemplete()




    //设置csdexpmodule
    var csdexpmodule = new CSDExportModule()
    csdexpmodule.setClassName(csmodule.csdName)
    // console.log(csdexpmodule)
    // console.log(requestmodule.reqBody)
    requestmodule.reqBody.forEach(item => {
        //处理路径,只保留名称
        if (path.extname(item) === '.ade') {
            csdexpmodule.setrequestADEList(path2Name(item))
            // console.log(csdexpmodule.requestADEList)
        }
        if (path.extname(item) === '.xm') {
            csdexpmodule.setrequestXMList(path2Name(item))
            // console.log(csdexpmodule.requestXMList)
        }
    })

    responsemoduld.ResBody.forEach(item => {
        //处理路径,只保留名称
        if (path.extname(item) === '.ade') {
            csdexpmodule.setresponseADEList(path2Name(item))
            // console.log(csdexpmodule.responseADEList)
        }
        if (path.extname(item) === '.xm') {
            csdexpmodule.setresponseXMList(path2Name(item))
            // console.log(csdexpmodule.responseXMList)
        }
    })
    // console.log(csdexpmodule)



    var expStr = csdexpmodule.toTemplete()
    // console.log(csdexpmodule.toTemplete())


    // console.log(data.response.body)

    // console.log(expStr)  
    var explanStr = `
    /** 
     * @class ${csmodule.csdName}
     * @classdesc ${csmodule.description}
     * @classcap ${csmodule.description}
     */\n    
    `


    var csdData = ''
    csdData += importStr
    csdData += explanStr
    csdData += expStr
    // console.log(csdData)
    return csdData

}

//csd生成js文件
function CSDcreate(csdFileName, csdData) {
    fs.writeFileSync(csdFileName + '.js', csdData)
}

//递归读取xm文件，返回要生成js文件的数组
function readXmFile(filepath) {
    var xmFilearr = []
    var data = JSON.parse(fs.readFileSync(filepath))
    var FileName = path.basename(filepath).split('.')[0]
    // console.log(FileName)
    // xmFilearr = xmFilearr.concat(FileName)
    xmFilearr = xmFilearr.concat(filepath)
    // console.log(arr)
    data.dataBasket.forEach(item => {
        // console.log('data.dataBasket!!!!!!!!!!!!!!111')
        // console.log(item)

        if (csdFile) {
            var patharr = csdFile.split('/')
            patharr.remove('csd')
           
            var xmpath = patharr.join('/') + '/xm/'

            item = xmpath + path.basename(item)
            // console.log(22222222222222)
            // console.log(item)

            // item = path.resolve('/' + item.split('//')[1])
            // item = './xm/' + path.basename(item)
        } else {
            item = './xm/' + path.basename(item)
        }
        if (path.extname(item) === '.xm') {
            xmFilearr = xmFilearr.concat(readXmFile(item))

        }
        // 重置item路径

    })

    return xmFilearr
}

//生成xm文件对应js文件内容
function XM2String(filePath) {
    var data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    var xmmodule = new XmModule()
    xmmodule.setXmName(data.xmName)
    xmmodule.setXmCaption(data.caption)
    xmmodule.setDescription(data.description)
    xmmodule.setDataBasket(data.dataBasket)
    // console.log(xmmodule.dataBasket)
    var databasket = new DataBasketModule()
    databasket.add(data.dataBasket)
    // console.log(databasket)
    var importmodule = new ImportModule()
    var importarr = []
    var attrmodule = new AttrModule
    var attrarr = []
    xmmodule.dataBasket.forEach((item) => {
        switch (path.extname(item)) {
            case '.xm':
                // console.log(item)
                importarr.push(path.basename(item).split('.')[0])
                break;
            case '.ade':
                // console.log(item)
                attrarr.push(path.basename(item).split('.')[0])
                // console.log(attrarr)
        }
    })
    importmodule.setList(importarr)
    attrmodule.setAttrList(attrarr)
    // console.log(importmodule)
    var importStr = importmodule.toTemplete()
    // console.log(importStr)        
    var exportmodule = new ExportModule()
    exportmodule.setClassName(path.basename(filePath).split('.')[0])
    // console.log(importmodule.importList)
    exportmodule.setList(importmodule.importList)
    exportmodule.setAttrList(attrmodule.attrList)
    var exportStr = exportmodule.toTemplete()
    // console.log(exportStr)

    var explanStr = `
    /** 
    * @class ${xmmodule.xmName}
    * @classdesc ${xmmodule.description}
    * @classcap ${xmmodule.xmCaption}
    */
    `

    var dataStr = ""
    dataStr += importStr
    dataStr += explanStr
    dataStr += exportStr
    // console.log(dataStr)
    return dataStr
}
//生成xm文件对应js文件
function writeFile(filename, data) {
    // console.log(targetPath)       E:/csd
    // console.log(filename)
    // if (!fs.existsSync('./js/')) {
    //     fs.mkdirSync('./js/')
    // }
    // if (fs.existsSync('./js/')) {
    //     fs.writeFileSync('./js/' + path.basename(filename).split('.')[0] + '.js', data, (err) => {
    //         console.log('write ' + path.basename(filename).split('.')[0] + '.js')
    //     })
    // }
    if (targetPath) {
        // console.log(targetPath)
        // console.log(filename)
        // console.log(data)
        // console.log(4444)
        // fs.writeFileSync('E:/teller-messages/1.js',data)
        fs.writeFileSync(targetPath + '/' + filename + '.js', data) //在同一文件夹下生成
        console.log(filename + '.js创建成功')
    } else {
        // console.log('nnn')
        // console.log(fs.existsSync('./js'))
        if (!fs.existsSync('./js')) { //如果没有
            fs.mkdirSync('js')
            fs.writeFileSync('./js/' + filename + '.js', data)
            console.log(filename + '.js创建成功')
        } else {
            fs.writeFileSync('./js/' + filename + '.js', data)
            console.log(filename + '.js创建成功')
        }
    }


}

//名称处理
function formatName(name) {
    if (name.indexOf('-') !== -1) {
        var arr = name.split('-')
        // console.log(arr)
        var letter = arr[1].slice(0, 1)
        // .toUpperCase()
        arr[1] = arr[1].replace(letter, letter.toUpperCase())
        // console.log(arr.join(''))
        return arr.join('')
    } else {
        return name
    }

}

function concat(arr1, arr2) {
    var arr = arr1.concat();
    //或者使用slice()复制，var arr = arr1.slice(0)
    for (var i = 0; i < arr2.length; i++) {
        arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0;
    }
    return arr;
}



function path2Name(filepath) {
    var name = path.basename(filepath).split('.')[0]
    return name
}

// CSD2String('./csd/query-customerinfo.csd')                          

var pathObj = { //文件对象
    indir: null,
    outdir: null
}



Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
}

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}




let arg = process.argv.splice(2)
// console.log(arg)
// console.log(path.resolve())


if (arg[0] && arg[1]) { //有参数
    pathObj.indir = arg[0]
    pathObj.outdir = arg[1]
    var csdFile = arg[0]
    var targetPath = arg[1]

    if (fs.statSync(csdFile).isDirectory()) { //第一个参数为路径
        console.log('读取路径：' + csdFile)
        // targetPath = targetPath.split('/')[0]
        // console.log('targetPath:'+targetPath)
        fs.readdirSync(csdFile).forEach(item => {
            // console.log(item) csd-csd.csd
            // console.log(csdFile+'/'+item)
            console.log('目标路径：' + targetPath)
            var str = CSD2String(csdFile + '/' + item)

            // CSDcreate(targetPath+'/'+path.basename(item).split('.')[0]+'.js', str)
            CSDcreate(targetPath + '/' + path.basename(item).split('.')[0], str)
            console.log(path.basename(item).split('.')[0] + '.js创建成功')

        })
    } else { // 第一个参数为文件
        console.log('读取文件:' + csdFile)
        var str = CSD2String(csdFile)
        // console.log(str)
        // targetPath = targetPath.split('/')[0]+'/'+ path.basename(csdFile).split('.')[0]
        console.log('目标路径：' + targetPath)
        // console.log(targetPath+'/'+path.basename(csdFile).split('.')[0]+'.js')
        CSDcreate(targetPath + '/' + path.basename(csdFile).split('.')[0], str)
        console.log(path.basename(csdFile).split('.')[0] + '.js创建成功')

    }

} else { //无参数
    // console.log(2222)
    fs.readdirSync('./csd').forEach(item => {
        // console.log(item)
        item = './csd/' + item
        // console.log(item)
        var str = CSD2String(item)
        // console.log(str)
        // CSDcreate('./js/'+path.basename(item).split('.')[0],str)
        if (fs.existsSync('./js')) {
            // console.log(path.basename(item).split('.')[0])
            fs.writeFileSync('./js/' + path.basename(item).split('.')[0] + '.js', str)
        } else {
            // console.log('n')
            fs.mkdirSync('js')
            fs.writeFileSync('./js/' + path.basename(item).split('.')[0] + '.js', str)
        }
    })
}