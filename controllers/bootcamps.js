const Bootcamp = require('../Models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/async');
const { json } = require('express');


// @desc Get all Bootcamps
// @route  GET/api/v1/bootcamps
// @access Public
exports.getBootcamps =asyncHandler( async (req,res,next)=>{

    // try {
        let query;

        //copy req.query
        const reqQuery = {...req.query};

        //Create query string
        let queryStr = JSON.stringify(reqQuery);

        //Fields to exlcude
        const removeFields = ['select', 'sort', 'page', 'limit'];
    
        //Loop over and delete them feom reqQuery
        removeFields.forEach(param => delete reqQuery[param]);

        //Create Opertors ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        //Finding resource
        query = Bootcamp.find(JSON.parse(queryStr)).populate('courses'); 
        
        //Select Fields
        if(req.query.select){
            const fields = req.query.select.split(',').join(' ');
           //console.log(fields);
            query = query.select(fields);
        }

        //sort Fields
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
            
        } else {
            query = query.sort('-createdAt');
        }     
        
        //Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 25;
        const startIndex = (page - 1) * limit;
        const endIndex  = page  * limit;
        const total = await Bootcamp.countDocuments();

        query = query.skip(startIndex).limit(limit);

        //Executing query
        const bootcamps = await query;

        //Pagination Result
        const pagination = {};

        if(endIndex < total){
            pagination.next = {
                page: page+1,
                limit
            }
        }

        if(startIndex > 0){
            pagination.prev = {
                page: page-1,
                limit
            }
        }

    //     res.status(200).json({sucess: true,count: bootcamps.length, data: bootcamps})
    // } catch (error) {
    //     next(error);
    // }
        res
        .status(200)
        .json({success: true,count: bootcamps.length, pagination,data: bootcamps});



});

// @desc Get single Bootcamp
// @route  GET/api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = asyncHandler(async (req,res,next)=>{
    // try {
        const bootcamp = await Bootcamp.findById(req.params.id);

    //     if(!bootcamp){
    //       return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404));

    //     }

    //     res.status(200).json({sucess: true, data: bootcamp})
    // } catch (error) {
    //     // next(
    //     //     new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404)
    //     // );

    //     next(error);

            if(!bootcamp){
                 return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404));
            }
                 res
                .status(200)
                .json({sucess: true, data: bootcamp})

    });


// @desc create Bootcamp
// @route  POST/api/v1/bootcamps
// @access Private
exports.createBootcamps = asyncHandler(async (req,res,next)=>{
    // console.log(req.body);

    // try {
        
    //     const bootcamp = await Bootcamp.create(req.body);
    //     //201: creating a resourse
    //     res.status(201).json({
    //         success: true,
    //         data: bootcamp
    //     });
    // } catch (error) {
    //     next(error);
    // }
    const bootcamp = await Bootcamp.create(req.body);
        //201: creating a resourse
        res.status(201).json({
            success: true,
            data: bootcamp
        });
}); 


// @desc update Bootcamp
// @route  PUT/api/v1/bootcamps/:id
// @access Private
exports.updateBootcamps = asyncHandler(async (req,res,next)=>{
    // try {
    //     const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
    //         new: true,
    //         runValidators: true
    //     });

    //     if(!bootcamp){
    //         return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404));
    //     }

    //     res.status(200).json({sucess: true, data: bootcamp})
    // } catch (error) {
    //     next(error);        
    // }

    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
                new: true,
                runValidators: true
            });
    
            if(!bootcamp){
                return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404));
            }
    
            res.status(200).json({sucess: true, data: bootcamp})
});


// @desc Get all Bootcamps
// @route  DELETE/api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamps = asyncHandler(async (req,res,next)=>{
    // try {
    //     const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    //     if(!bootcamp){
    //         return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404));
    //     }

    //     res.status(200).json({sucess: true, data: {}})
    // } catch (error) {
    //     next(error);        
    // }

    const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404));
        }

        bootcamp.deleteOne();

       res.status(200).json({sucess: true, data: {}})

});

// @desc Get bootcamps within a radius
// @route  GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
exports.getBootcampsInRadius = asyncHandler(async (req,res,next)=>{
   const { zipcode, distance } = req.params;

   //get latitude and longitude from geocoder
   const loc = await geocoder.geocode(zipcode);
   const lat = loc[0].latitude;
   const lng = loc[0].longitude;

   //calc radius using radius
   //divide distance by radius of earth
   // Earth raidus = 3963 miles/6378 Km

   const radius = distance / 3963;

   const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centreSphere: [ [ lng, lat ], radius ] } }
   });

   res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps});
});

