const functions = process.argv.slice(2)
const formattedFunctions = functions.map(name => name.replace('\r', ''))
console.log(formattedFunctions)
return formattedFunctions