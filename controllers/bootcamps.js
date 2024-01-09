// @desc Get all Bootcamps
// @route  GET/api/v1/bootcamps
// @access Public
exports.getBootcamps = (req,res,next)=>{
    res.status(200).json({sucess: true, msg: 'Get all bootcamps'})

};

// @desc Get single Bootcamp
// @route  GET/api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = (req,res,next)=>{
    res.status(200).json({success: true, msg: `Get the bootcamp for ID ${req.params.id}`})

};


// @desc create Bootcamp
// @route  POST/api/v1/bootcamps
// @access Private
exports.createBootcamps = (req,res,next)=>{
    res.status(200).json({sucess: true, msg: 'Create new bootcamp'})

};


// @desc update Bootcamp
// @route  PUT/api/v1/bootcamps/:id
// @access Private
exports.updateBootcamps = (req,res,next)=>{
    res.status(200).json({success: true, msg: `Update the bootcamp for ID ${req.params.id}`})

};


// @desc Get all Bootcamps
// @route  DELETE/api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamps = (req,res,next)=>{
    res.status(200).json({success: true, msg: `Delete the bootcamp for ID ${req.params.id}`})

};


