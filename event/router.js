const { Router } = require('express')
const Event = require('./model')
const router = new Router()


router.get(
  '/event',
  (request, response, next) => {
    Event.findAll()
      .then(listOfEvents => {
        response.send(listOfEvents)
      })
      .catch(error => next(error))
  }
)

router.post(
  '/event',
  (request, response, next) => {
    Event
      .findOne({ where: { name: request.body.name }})
      .then((event) => {
        if ((event)) {
          response.status(403).send("Name already used.",)
        } else {
          return Event
            .create(request.body)
            .then((event) => response.send((event)))
        }
      })
      .catch(next)
  }
)

router.get(
  '/event/:id',
  (request, response, next) => {
    Event.findByPk(request.params.id)
      .then((event) => response.send((event)))
      .catch(error => next(error))
  }
)

router.put(
  '/event/:id',
  (request, response, next) => {
    Event
      .findByPk(request.params.id)
      .then(event => {
        if (event) {
          return event.update(request.body)
            .then(event => response.send(event))
        }
        return response.status(404).end()
      })
      .catch(error => next(error))
  }
)
//      
router.delete(
  '/event/:id',
  (request, response, next) => {
    Event
      .destroy({
        where: {
          id: request.params.id
        }
      })
      .then(number => response.send({ number }))
      .catch(next)
  }
)


module.exports = router