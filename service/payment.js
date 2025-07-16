// var e = require("express");

var {
  PaymentMovement,
  PaymentFormReq,
  PaymentServiceRes
} = require("../models/payment.js");
var {
  IRepository
} = require("../repository/payment.js");

/*
SERVICE
 ____                  _          
/ ___|  ___ _ ____   _(_) ___ ___ 
\___ \ / _ \ '__\ \ / / |/ __/ _ \
 ___) |  __/ |   \ V /| | (_|  __/
|____/ \___|_|    \_/ |_|\___\___|
*/


/**
 * Interfaz para el servicio de pago.
 * @interface IService
 * @property {IRepository} repository - Repositorio para almacenar los movimientos de pago.
 * @method {PaymentServiceRes} validatePayment - Valida la solicitud de pago.
 * @method {PaymentServiceRes} processPayment - Procesa el pago.
 */
class IService {
  /**
   * Valida la solicitud de pago.
   * @param {PaymentFormReq} paymentFormReq - Solicitud de pago.
   * @returns {PaymentServiceRes}
   * @throws {Error} Si el método no está implementado.
   */
  validatePayment(paymentFormReq) {
    throw new Error("Method 'processPayment' must be implemented.");
  }
  /**
   * Procesa el pago.
   * @param {PaymentFormReq} paymentFormReq - Solicitud de pago.
   * @returns {PaymentServiceRes}
   */
  processPayment(paymentFormReq) {
    throw new Error("Method 'processPayment' must be implemented.");
  } 
}

/**
 * Implementación del servicio de pago.
 * @class PaymentService
 * @extends IService
 * @property {IRepository} repository - Repositorio para almacenar los movimientos de pago.
 */
class PaymentService extends IService {

  /**   * Crea una nueva instancia del servicio de pago.
   * @param {IRepository} repository - Repositorio para almacenar los movimientos de pago.
   */
  constructor(repository) {
    super();
    this.repository = repository;
  }

  /**
   * Valida la solicitud de pago.
   * @param {PaymentFormReq} paymentFormReq - Solicitud de pago.
   * @returns {PaymentServiceRes}
   */
  validatePayment(paymentFormReq) {
    // if the amount is less or equal than 0, return an error response
    if (paymentFormReq.amount <= 0) {
      return new PaymentServiceRes(
        "The amount must be greater than 0",
        "Error"
      )
    } else {
      // if the amount is greater than 0, return a success response
      return new PaymentServiceRes(
        `Payment of ${paymentFormReq.amount} processed successfully using ${paymentFormReq.paymentMethod}`,
        "OK"
      );
    }
  }
  /**
   * Procesa el pago.
   * @param {PaymentFormReq} paymentFormReq - Solicitud de pago.
   * @returns {PaymentServiceRes}
   */
  processPayment(paymentFormReq) {
    // Validate the payment request
    const validationRes = this.validatePayment(paymentFormReq);
    // If validation fails, return the error response
    if (validationRes.status !== "OK") {
      return validationRes;
    }
    // Create a payment instance based on the payment method
    const payment = PaymentFactory.createPayment(paymentFormReq);
    // Process the payment and return the response
    const paymentRes = payment.processPayment();
    this.repository.addPayment(
      new PaymentMovement(
        paymentFormReq.email,
        paymentFormReq.amount,
        paymentFormReq.paymentMethod,
        new Date(),
        paymentRes.status,
        Math.random().toString(36).substring(2, 15) // Generate a random ID for the transaction
      )
    );
    return paymentRes;
  }
}


/*
PAYMENT PROCESSING
 ____                                  _         
|  _ \ __ _ _   _ _ __ ___   ___ _ __ | |_       
| |_) / _` | | | | '_ ` _ \ / _ \ '_ \| __|      
|  __/ (_| | |_| | | | | | |  __/ | | | |_       
|_|__ \__,_|\__, |_| |_| |_|\___|_|_|_|\__|      
|  _ \ _ __ |___/ ___ ___  ___ ___(_)_ __   __ _ 
| |_) | '__/ _ \ / __/ _ \/ __/ __| | '_ \ / _` |
|  __/| | | (_) | (_|  __/\__ \__ \ | | | | (_| |
|_|   |_|  \___/ \___\___||___/___/_|_| |_|\__, |
                                           |___/ 
*/


// Abstract class for creating a payment and extend for the concrete implementation
class Payment {
  /**
   * Creates a new payment.
   * @param {PaymentFormReq} paymentFormReq - The payment request.
   */
  constructor(paymentFormReq) {
    this.paymentFormReq = paymentFormReq;
  }
  // Abstract method to process the payment
  processPayment() {
    throw new Error("Method 'processPayment' must be implemented.");
  }
}

// Concrete implementation of the Payment class for PayPal payments
class PayPalPayment extends Payment {
  processPayment() {
    // Logic to process PayPal payment
    console.log(`Processing PayPal payment for ${this.paymentFormReq.email}`);
    // Simulate a payment processing using a random condition to respond with success or error
    if (Math.random() < 0.5) {
      console.log(`PayPal payment of ${this.paymentFormReq.amount} processed successfully`);
      return new PaymentServiceRes(
        `PayPal payment of ${this.paymentFormReq.amount} processed successfully`,
        "OK"
      );
    }
    console.error(`PayPal payment failed for ${this.paymentFormReq.email}`);
    return new PaymentServiceRes(
      "PayPal payment failed",
      "Error"
    );
  }
}

// Concrete implementation of the Payment class for Credit Card payments
class CreditCardPayment extends Payment {
  processPayment() {
    // Logic to process Credit card payment
    console.log(`Processing Credit card payment for ${this.paymentFormReq.email}`);
    // Simulate a payment processing using a random condition to respond with success or error
    if (Math.random() < 0.8) {
      console.log(`Credit card payment of ${this.paymentFormReq.amount} processed successfully`);
      return new PaymentServiceRes(
        `Credit card payment of ${this.paymentFormReq.amount} processed successfully`,
        "OK"
      );
    }
    console.error(`Credit card payment failed for ${this.paymentFormReq.email}`);
    return new PaymentServiceRes(
      "Credit card payment failed",
      "Error"
    );
  }
}

// Concrete implementation of the Payment class for Bank Transfer payments
class BankTransferPayment extends Payment {
  processPayment() {
    // Logic to process Bank Transfer payment
    console.log(`Processing Bank Transfer payment for ${this.paymentFormReq.email}`);
    // Simulate a payment processing using a random condition to respond with success or error
    if (Math.random() < 0.95) {
      console.log(`Bank Transfer payment of ${this.paymentFormReq.amount} processed successfully`);
      return new PaymentServiceRes(
        `Bank Transfer payment of ${this.paymentFormReq.amount} processed successfully`,
        "OK"
      );
    }
    console.error(`Bank Transfer payment failed for ${this.paymentFormReq.email}`);
    return new PaymentServiceRes(
      "Bank Transfer payment failed",
      "Error"
    );
  }
}

/*
FACTORY
 _____          _                   
|  ___|_ _  ___| |_ ___  _ __ _   _ 
| |_ / _` |/ __| __/ _ \| '__| | | |
|  _| (_| | (__| || (_) | |  | |_| |
|_|  \__,_|\___|\__\___/|_|   \__, |
                              |___/  
*/

// Factory class to create payment instances based on the payment method
class PaymentFactory {
  /**
   * Creates a payment instance based on the payment method.
   * @param {PaymentFormReq} paymentFormReq - The payment request.
   * @returns {Payment} - The payment instance.
   */
  static createPayment(paymentFormReq) {
    switch (paymentFormReq.paymentMethod) {
      case "paypal":
        return new PayPalPayment(paymentFormReq);
      case "creditCard":
        return new CreditCardPayment(paymentFormReq);
      case "bankTransfer":
        return new BankTransferPayment(paymentFormReq);
      default:
        throw new Error("Unsupported payment method");
    }
  }
}

module.exports = {
  PaymentService
};