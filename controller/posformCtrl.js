const db = require('../model/index');
const posform = require('../model/posform')
const AppError = require('../utils/apperror');
const catchAsync = require("../utils/catchAsync");
const Posform = db.postform;

exports.save = catchAsync(async (req, res,next) => {
    
    if(!req.body.casher_name){
      return next(new AppError("casher name must be needed",400))
    }
    console.log(req.body.casher_name)
    const postform = await Posform.create({
      order_id : req.body.order_id,
      casher_name: req.body.casher_name,
      counter_no: req.body.counter_no,
      order_date: req.body.order_date,
      refund: req.body.refund,
      discount: req.body.discount,
      discount_percentage: req.body.discount_percentage
    });
  
    res.status(200).json({
      status: "success",
      message: "save successfully",
      RequestedAt: req.requestTime,
      postform,
    });
  });
  
exports.deleteAll = catchAsync(async (req,res,next)=>{
 Posform.destroy({
    where: {},
    truncate: false,
  })
  res.status(200).json({
    status : "success",
    message: "delete successfully", 
  })
})

exports.delete = catchAsync(async (req,res,next)=>{
  const id = req.params.id;

  Posform.destroy({
    where: { order_id: id },
  })
    .then((num) => {
      console.log(num)
      if (num == 1) {
        res.send({
          message: "POSform was deleted successfully!",
        });
      } else {
        return next(new AppError(`Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,401))
      }
    })
})
exports.update = catchAsync(async (req,res,next)=>{
  const id = req.params.id;

  Posform.update(req.body,{
    where: { order_id: id },
  })
    .then((num) => {
      console.log(num)
      if (num == 1) {
        res.send({
          message: "POSform was updated successfully!",
        });
      } else {
        return next(new AppError(`Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,401))
      }
    })
});
// exports.findAll = catchAsync(async (req,res,next)=>{
//     // const posform = req.query;
//     const data = Posform.findAll();
//     res.status(200).json({
//       status: "success",
//       RequestedAt: req.requestTime,
//       data,
//     });
// });
exports.findAll = (req, res) => {
  const posform = req.query;
  Posform.findAll(posform)
    .then((data) => {
      res.status(201).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "fail",
        message: err.message,
      });
    });
};