const { Router } = require('express')
const Event = require('./model')
const router = new Router()


router.get(
  '/events',
  (request, response, next) => {
    Event.findAll()
      .then(listOfEvents => {
        response.send(listOfEvents)
      })
      .catch(error => next(error))
  }
)

// pagination
// router.get(
//   '/event',
//   (req, res, next) => {
//   const limit = req.query.limit || 25
//   const offset = req.query.offset || 0
//   Event
//     .count()
//     .then(total => {
//       Event
//         .findAll({ limit, offset })
//         .then(events => res.send({ events, total }))
//       })
//     .catch(error => next(error))
//   }
// )

// parallel Promises - pagination
// router.get('/events', (req, res, next) => {
//   const limit = req.query.limit || 25
//   const offset = req.query.offset || 0

//   Promise.all([
//     Event.count(),
//     Event.findAll({ limit, offset })
//   ])
//     .then(([total, events]) => {
//       res.send({
//         events, total
//       })
//     })
//     .catch(error => next(error))
// })

router.post(
  '/events',
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
  '/events/:id',
  (request, response, next) => {
    Event.findByPk(request.params.id)
      .then((event) => response.send((event)))
      .catch(error => next(error))
  }
)

router.put(
  '/events/:id',
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
  '/events/:id',
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