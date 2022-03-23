const { Router } = require("express");
const Appointment = require("../models/Appointment");

const router = Router();

// Create record in MongoDB Atlas using Mongoose.js ORM
router.post("/", (request, response) => {
  const appointment = new Appointment(request.body);
  appointment.save((error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

router.get("/", (request, response) => {
  Appointment.find({}, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

// Get a single record by ID using a query parameter
router.get("/:id", (request, response) => {
  Appointment.findById(request.params.id, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

router.get("/crust/:crust", (request, response) => {
  Appointment.find({crust: request.params.crust}, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

router.delete("/:id", (request, response) => {
  Appointment.findByIdAndRemove(request.params.id, {}, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

router.put("/:id", (request, response) => {
  const body = request.body;
  Appointment.findByIdAndUpdate(

    request.params.id,

    {
      $set: {
        customer: body.customer,
        start: body.start,
        end: body.end
      }
    },

    {
      new: true,
      upsert: true
    },

    (error, record) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(record);
    }
  );
});

module.exports = router;
