import historicalEventsRepository from '../repository/historicalEventsRepository'

const noEsAlphaNum = str => /^[a-zA-Z]*$/.test(str); //retorna true en caso no ser alfanumerica, retorna false en caso contrario

exports.getHistoricalEventsByOcurrence = (ctx) => {
    if(!noEsAlphaNum(ctx.params.ocurrence)){
        ctx.status = 400
        ctx.body = {"message": "Solo se aceptan caracteres no numéricos"}
        return ctx
    }
    if(ctx.params.ocurrence.length != 2){
        ctx.status = 400
        ctx.body = {"message": "El input debe ser ac o dc"}
        return ctx
    }
    ctx.body = historicalEventsRepository.getHistoricalEvents(ctx.params.ocurrence)
    ctx.status = 200
    return ctx
}