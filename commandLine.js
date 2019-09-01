module.exports = function(yargs) {
    
    return yargs.command('place', 'name of the place you want to get its weather info', {
        alias: 'p'
    }).alias('h','help').help().argv;
}