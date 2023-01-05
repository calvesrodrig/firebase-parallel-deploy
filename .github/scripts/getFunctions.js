const functions = process.argv.slice(2)
const formattedFunctions = functions.map(name => name.replace('\r', ''))
return formattedFunctions