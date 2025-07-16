// var e = require("express");
var { 
    PaymentMovement
} = require("../models/payment.js");

// Repository to store payment movements
// Interface for the repository
/**
 * Interface for the repository.
 * @interface IRepository
 * @property {Array<PaymentMovement>} payments - Array to store payment movements.
 * @method {void} addPayment - Adds a payment movement to the repository.
 * @method {Array<PaymentMovement>} getPayments - Retrieves all payment movements from the repository.
 */
class IRepository {
  /**
   * Adds a payment movement to the repository.
   * @param {PaymentMovement} payment - The payment movement to add.
   */
  addPayment(payment) {
    throw new Error("Method 'addPayment' must be implemented.");
  }
  /**
   * Retrieves all payment movements from the repository.
   * @returns {Array<PaymentMovement>} - Array of payment movements.
   */
  getPayments() {
    throw new Error("Method 'getPayments' must be implemented.");
  }
}

/**
 * Repository to manage payment movements.
 * @class PaymentRepository
 * @extends IRepository
 * @property {Array<PaymentMovement>} payments - Array to store payment movements.
 */
class PaymentArrayRepository extends IRepository {
  /**
   * Creates a new instance of PaymentRepository.
   */
  constructor() {
    super();
    this.payments = [];
  }
  /**
   * Adds a payment movement to the repository.
   * @param {PaymentMovement} payment - The payment movement to add.
   */
  addPayment(payment) {
    this.payments.push(payment);
  }
  /**
   * Retrieves all payment movements from the repository.
   * @returns {Array<PaymentMovement>} - Array of payment movements.
   */
  getPayments() {
    return this.payments;
  }
}

const PaymentArrayRepo = new PaymentArrayRepository();

module.exports = {
  IRepository,
  PaymentArrayRepo
};