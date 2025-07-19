var express = require("express");
var router = express.Router();

var {
  PaymentFormReq
} = require("../models/payment.js");
var {
  PaymentService
} = require("../service/payment.js");
var {
  PaymentArrayRepo
} = require("../repository/payment.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// GET My View page
router.get("/my-page", function (req, res, next) {
  const myData = {
    name: "Sem",
    title: "My Personal site",
    say: "hello!!!",
  };
  res.render("myview", { ...myData });
});

router.get("/payment-form", function (req, res, next) {
  // res.render("paymentProcessOk", { email:"email@email.com", amount:100, paymentMethod: "paypal", msg: "Payment processed successfully." });
  res.render("paymentForm", {});
})

router.post("/payment-process", function (req, res, next) {
  // const { email, amount, paymentMethod } = req.body;
  // {
  //   email: "email@email.com",
  //   amount: "100",
  //   paymentMethod: "paypal",
  // }
  console.log(req.body);
  const email = req.body.email;
  const amount = req.body.amount;
  const paymentMethod = req.body.paymentMethod;
  // create a new instance of PaymentFormReq
  const paymentFormReq = new PaymentFormReq(email, amount, paymentMethod);
  // create a new instance of PaymentService
  const paymentService = new PaymentService(PaymentArrayRepo);
  // process the payment
  const paymentServiceRes = paymentService.processPayment(paymentFormReq);
  // if the payment was not successful, return an error response
  if (paymentServiceRes.status !== "OK") {
    return res.render("paymentProcessError", { errorMessage: paymentServiceRes.msg });
  }
  res.render("paymentProcessOk", { email, amount, paymentMethod, msg: paymentServiceRes.msg });
})

// GET payment history
router.get("/payment-history", function (req, res, next) {
  // get the payments from the repository
  const payments = PaymentArrayRepo.getPayments();
  // render the payment history view with the payments
  console.log(payments);
  res.render("paymentHistory", { payments });
});
module.exports = router;
