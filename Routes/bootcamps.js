const express = require('express');
const router = express.Router();

const{getBootcamps
    ,getBootcamp
    ,createBootcamps
    ,updateBootcamps
    ,deleteBootcamps
    ,getBootcampsInRadius} = require('../controllers/bootcamps');


//Include other resource routers
const courseRouter = require('./courses')

//Re-route into other resouce routers
router.use('/:bootcampId/courses', courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamps);

router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamps)
    .delete(deleteBootcamps);
    
 
    

module.exports = router;