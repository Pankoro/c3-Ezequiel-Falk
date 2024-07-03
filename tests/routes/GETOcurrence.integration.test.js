import request from 'supertest'
import { server, app } from '../../src/index'
import sinon from 'sinon'
import eventosJSON from '../../dataset/historical_data.json'

describe('GET /api/history', () => {

    beforeEach(() => {
        sinon.restore()
    })

    afterAll(() => {
        server.close()
    })

    //test 1
    test('Si la entrada es ac, debe retorna un array con todos los eventos ocurridos A.C.', async () => {
        const response = await request(app.callback()).get('/api/history/ac')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(eventosJSON.result.events.filter((evn) => evn.date < 0).sort())
    })

    //test 2
    test('Si la entrada es dc, debe retorna un array con todos los eventos ocurridos D.C.', async () => {
        const response = await request(app.callback()).get('/api/history/dc')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(eventosJSON.result.events.filter((evn) => evn.date > 0).sort())
    })

    //test 3.1
    test('Si la entrada es alfanumerica, debe retorna un mensaje indicando que no se aceptan caracteres numericos', async () => {
        const response = await request(app.callback()).get('/api/history/2c')
        expect(response.status).toBe(400)
        expect(response.body).toEqual({"message": "Solo se aceptan caracteres no numéricos"})
    })

    //test 3.2
    test('Si la entrada es numerica, debe retorna un mensaje indicando que no se aceptan caracteres numericos', async () => {
        const response = await request(app.callback()).get('/api/history/22')
        expect(response.status).toBe(400)
        expect(response.body).toEqual({"message": "Solo se aceptan caracteres no numéricos"})
    })
    
    //test 4
    test('Si la entrada es string > 2, debe retorna un mensaje indicando que solo se acepta ac o dc', async () => {
        const response = await request(app.callback()).get('/api/history/AntesDeCristo')
        expect(response.status).toBe(400)
        expect(response.body).toEqual({"message": "El input debe ser ac o dc"})
    })
        
})