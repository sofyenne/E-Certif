class allRouters {
    constructor(app,authorize) {

        const authRouter = require('../routes/authRouter')
        app.use('/auth' ,authRouter)

        const userRouter = require('../routes/userRouter')
        app.use('/user',userRouter)
        
        const contactSmsRouter = require('../routes/contactSmsRouter')
        app.use('/contactSms',authorize, contactSmsRouter)


        const diplomeRouter = require('../routes/diplomeRouter')
        app.use('/diplome', diplomeRouter)

        
        const etablissementRouter = require('../routes/etablissementRouter')
        app.use('/etablissement', etablissementRouter)

    }
}

module.exports = allRouters