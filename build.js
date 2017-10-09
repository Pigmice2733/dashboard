const spike = require('./spike')

console.log('compiling')
spike.compile()
spike.on('info', console.log)
spike.on('done', console.log)
spike.on('success', console.log)
spike.on('compile', process.exit)
