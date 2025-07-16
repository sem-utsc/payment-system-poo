// var e = require("express");

// Model to register a payment movement
/**
 * Modelo para el movimiento de pago.
 * @class PaymentMovement
 * @property {string} email - Correo electrónico del usuario.
 * @property {number} amount - Monto del pago.
 * @property {string} paymentMethod - Método de pago utilizado.
 * @property {Date} date - Fecha del movimiento de pago.
 * @property {string} status - Estado del movimiento de pago ("Pendiente", "Completado", "Fallido").
 * @property {uuid} id - ID de la transacción del pago.
 */
class PaymentMovement {
  /**
   * @param {string} email - Correo electrónico del usuario.
   * @param {number} amount - Monto del pago.
   * @param {string} paymentMethod - Método de pago utilizado.
   * @param {Date} date - Fecha del movimiento de pago.
   * @param {string} status - Estado del movimiento de pago ("Pendiente", "Completado", "Fallido").
   * @param {string} id - ID de la transacción del pago.
   */
  constructor(email, amount, paymentMethod, date, status, id) {
    this.email = email;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.date = date;
    this.status = status;
    this.id = id;
  }
}

/**
 * Modelo para la solicitud de pago.
 * @class PaymentFormReq
 * @property {string} email - Correo electrónico del usuario.
 * @property {number} amount - Monto a pagar.
 * @property {string} paymentMethod - Método de pago seleccionado.
 */
class PaymentFormReq {
  /**
   * @param {string} email - Correo electrónico del usuario.
   * @param {number} amount - Monto a pagar.
   * @param {string} paymentMethod - Método de pago seleccionado.
   */
  constructor(email, amount, paymentMethod) {
    this.email = email;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
  }
}

/**
 * Modelo para la respuesta del servicio de pago.
 * @class PaymentServiceRes
 * @property {string} msg - Mensaje de respuesta.
 * @property {string} status - Estado de la respuesta ("OK" o "Error").
 */
class PaymentServiceRes {
  /**
   * @param {string} msg - Mensaje de respuesta.
   * @param {string} status - Estado de la respuesta.
   */
  constructor(msg, status) {
    this.msg = msg;
    this.status = status;
  }
}

module.exports = {
    PaymentMovement,
    PaymentFormReq,
    PaymentServiceRes
};