global.__base = __dirname + "/"
console.log(global.__base)

const path = require('path')
const fs = require("fs")
const fileExists = require('fs').existsSync
const glob = require('glob')
let routesDir = path.join(global.__base, '../oldPython/resources/schemas/*.json')
let files = glob.sync(routesDir)
this.routerFiles = files;
let i18nString = ''
let cdsString = `using { \n   managed,\n    sap,\n    cuid\n} from '@sap/cds/common';\n\nnamespace star.wars;\n`
if (files.length !== 0) {
    for (let file of files) {
        console.log(`Reading ${file}`)
        let importData = fs.readFileSync(file)
        let schema = JSON.parse(importData)
        i18nString += `# ${schema.title}\n`
        i18nString += `${schema.title} = ${schema.description}\n`

        cdsString += `entity ${schema.title} : cuid, managed {\n`
        for (let property in schema.properties) {
            switch (property) {
                case 'created':
                    break
                case 'edited':
                    break
                default:
                    let dataType = 'String'
                    if(schema.properties[property].format){
                        if(schema.properties[property].format == 'date-time'){
                            dataType = `DateTime`
                        }
                        if(schema.properties[property].format == 'date'){
                            dataType = `Date`
                        }
                    }
                    if(schema.properties[property].type == 'integer'){
                        dataType = `Integer`
                    }
                    if(schema.properties[property].type == 'array'){
                        dataType = `Association to many Blank`
                    }                    
                    i18nString += `${property} = ${schema.properties[property].description} \n`
                    cdsString += `${property} : ${dataType};\n`
                    break
            }
        }
        cdsString += `}\n\n`

        cdsString += `annotate ${schema.title} with @(title : '{i18n>${schema.title}}') {\n`
        for (let property in schema.properties) {
            switch (property) {
                case 'created':
                    break
                case 'edited':
                    break
                default:
                    cdsString += `${property} @title : '{i18n>${property}}';\n`
                    break
            }
        }
        cdsString += `}\n\n`
    }
    fs.writeFile("./i18n.properties", i18nString, null, (err) => {
        if (err) { console.err(err) }
    })
    fs.writeFile("./schema.cds", cdsString, null, (err) => {
        if (err) { console.err(err) }
    })
}