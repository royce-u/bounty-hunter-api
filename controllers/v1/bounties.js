// Create router and reference the models
let db = require('../../models')
let router = require('express').Router()

// GET /v1/bounties - Retrieve all bounties in the DB
router.get('/', (req, res) => {
    db.bounty.find()
    .then(bounties => {
        res.send(bounties)
    })
    .catch(err => {
        console.log('Error in index route')
        res.status(500).send({message: 'ooopsie'})
    })
})

// POST /v1/bounties - Create a new bounty
router.post('/', (req, res) => {
    db.bounty.create(req.body)
    .then(newBounty => {
        res.status(201).send(newBounty)
    })
    .catch(err => {
        console.log('Error creating a bounty', err)
        if (err.name == 'Validation Error') {
            res.status(406).send({message: 'Validation Error'})
        }
        else {
            //if you're missing a req field on the form
            res.status(503).send({message: 'Server or database error'})
        }
    })
})

// PUT /v1/bounties - Bulk update bounties
router.put('/updateAll', (req, res) => {
    db.Bounty.updateMany({},
        req.body 
    )
    .then(bounty => {
        res.send(bounty)
    })
    .catch(err => {
        console.log("update all error", err)
        res.status(500).send({message: 'oopsies'})
    })   
})

// GET /v1/bounties/:id - Retrieve a single bounty by its id
router.get('/:id', (req, res) => {
    db.bounty.findById(req.params.id)
    .then(bounty => {
        res.send(bounty)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({message: "oh shit!"})
    })
})

// DELETE /v1/bounties - Delete ALL bounties
router.delete('/', (req, res) => {
    db.bounty.find().remove()
    .then(bounty => {
        res.send(bounty,'deleted errthang')
    })
    .catch(err => {
        res.status(404).send(err)
    })
})

// PUT /v1/bounties/:id - Update a single bounty
router.put('/:id', (req ,res) => {
    db.bounty.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false})
    .then(bounty => {
        res.status(200).send('successful', bounty)
    })
    .catch(err => {
        res.status(404).send({message: "oh shit!"})
    })
})

// DELETE /v1/bounties/:id - Delete a single bounty
// router.delete('/:id', (req, res) => {
//     db.bounty.findOneAndRemove(req.params.id)
//     .then(bounty => {
//         res.status(200).send('success', bounty)
//     })
//     .catch(err => {
//         res.status(404).send(err)
//     })
// })

router.delete('/:id', (req, res) => {
    db.bounty.findbyIdAndDelete(req.params.id)
    .then(bounty => {
        res.status(200).send('success', bounty)
    })
    .catch(err => {
        res.status(404).send(err)
    })
})


// Export the router object and the routes attached to it
module.exports = router
