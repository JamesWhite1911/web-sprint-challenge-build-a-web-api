const Projects = require('./projects-model')

const express = require('express')
const router = express.Router()


//get /api/projects
router.get('/', (req, res) => {
    const { id } = req.query
    Projects.get(id)
        .then(project => {
            res.json(project)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error with your request -- something broke' })
        });
})

//get /api/projects/:id
router.get('/:id', (req, res) => {
    const { id } = req.params
    Projects.get(id)
        .then(data => {
            if (!data) {
                res.status(404).json({
                    message: 'Could not find a project with that ID'
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

//post /api/projects
router.post('/', (req, res) => {
    const project = req.body
    if (!project || !project.name || !project.description) {
        res.status(400).json({ message: 'Request missing a project, project name, or project description' })
    } else {
        Projects.insert(project)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Error with your request -- something broke' })
            });
    }
});

//put /api/projects:id
router.put('/:id', (req, res) => {
    const { id } = req.params
    const project = req.body
    if (!project || !project.name || !project.description) {
    } else {
        Projects.update(id, project)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Error with your request -- something broke' })
            });
    }
});

//delete /api/projects/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params
    Projects.remove(id)
        .then(data => {
            res.status(204).json("")
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error with your request -- something broke' })
        });
});

//get /api/projects/:id/actions
router.get('/:id/actions', (req, res) => {
    const { id } = req.params
    Projects.get(id) //we could use getProjectActions here but I like how this works, too
        .then(data => {
            if (!data) {
                res.status(404).json({
                    message: 'Could not find a project with that ID'
                })
            } else {
                res.json(data.actions)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error with your request -- something broke' })
        })
})

module.exports = router;
