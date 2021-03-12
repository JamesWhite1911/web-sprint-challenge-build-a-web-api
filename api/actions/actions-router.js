const Actions = require('./actions-model')

const express = require('express')
const router = express.Router()


//get /api/actions
router.get('/', (req, res) => {
    const { id } = req.query
    Actions.get(id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error with your request -- something broke' })
        })
})

//get /api/actions/:id
router.get('/:id', (req, res) => {
    const { id } = req.params
    Actions.get(id)
        .then(data => {
            if (!data) {
                res.status(404).json({
                    message: 'Could not find an action with that ID'
                })
            } else {
                res.json(data)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error with your request -- something broke' })
        })
})

//post /api/actions
router.post('/', (req, res) => {
    const action = req.body
    if (!action || !action.description || !action.notes) {
        res.status(400).json({ message: 'Request missing an action, action description, or action notes' })
    } else {
        Actions.insert(action)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Error with your request -- something broke' })
            });
    }
});

//put /api/actions:id
router.put('/:id', (req, res) => {
    const { id } = req.params
    const action = req.body
    if (!action || !action.description || !action.notes) {
        res.status(400).json({ message: 'Request missing an action, action description, or action notes' })
    } else {
        Actions.update(id, action)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Error with your request -- something broke' })
            });
    }
});

//delete /api/actions/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params
    Actions.remove(id)
        .then(data => {
            res.status(204).json("")
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error with your request -- something broke' })
        });
});

module.exports = router;
