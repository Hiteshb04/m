const Bootcamp = require('../Models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');

// @desc Get all Bootcamps
// @route  GET/api/v1/bootcamps
// @access Public
exports.getBootcamps = async (req,res,next)=>{

    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({sucess: true,count: bootcamps.length, data: bootcamps})
    } catch (error) {
        next(error);
    }

};

// @desc Get single Bootcamp
// @route  GET/api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = async (req,res,next)=>{
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp){
          return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404));

        }

        res.status(200).json({sucess: true, data: bootcamp})
    } catch (error) {
        // next(
        //     new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404)
        // );

        next(error);
    }
};


// @desc create Bootcamp
// @route  POST/api/v1/bootcamps
// @access Private
exports.createBootcamps = async (req,res,next)=>{
    // console.log(req.body);

    try {
        
        const bootcamp = await Bootcamp.create(req.body);
        //201: creating a resourse
        res.status(201).json({
            success: true,
            data: bootcamp
        });
    } catch (error) {
        next(error);
    }

};


// @desc update Bootcamp
// @route  PUT/api/v1/bootcamps/:id
// @access Private
exports.updateBootcamps = async (req,res,next)=>{
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        });

        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404));
        }

        res.status(200).json({sucess: true, data: bootcamp})
    } catch (error) {
        next(error);        
    }
};


// @desc Get all Bootcamps
// @route  DELETE/api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamps = async (req,res,next)=>{
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404));
        }

        res.status(200).json({sucess: true, data: {}})
    } catch (error) {
        next(error);        
    }
};


