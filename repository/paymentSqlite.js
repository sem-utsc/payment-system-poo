// Repositorio SQLite para movimientos de pago
// Requiere Node.js 22+ y el flag --experimental-sqlite
const path = require('path');
const { PaymentMovement } = require('../models/payment.js');

const Database = require('better-sqlite3');

// Ruta de la base de datos (persistente en disco)
const dbPath = path.join(__dirname, '../payment.db');
const db = new Database(dbPath);

// Crear tabla si no existe
const initSQL = `
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  amount REAL NOT NULL,
  method TEXT NOT NULL,
  status TEXT NOT NULL,
  date TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now', 'UTC'))
);
`;
db.exec(initSQL);

// Clase repositorio SQLite
class PaymentSqliteRepository {
  /**
   * Adds a payment movement to the repository.
   * @param {PaymentMovement} payment - The payment movement to add.
   */
  addPayment(payment) {
    const stmt = db.prepare(
      'INSERT INTO payments (email, amount, method, status) VALUES (?, ?, ?, ?)' 
    );
    stmt.run(payment.email, payment.amount, payment.paymentMethod, payment.status);
  }

  getPayments() {
    const stmt = db.prepare('SELECT * FROM payments');
    const rows = stmt.all();
    // Mapear a instancias de PaymentMovement si es necesario
    return rows.map(row => new PaymentMovement(row.email, row.amount, row.method, new Date(row.date), row.status, row.id));
  }
}

const PaymentSqliteRepo = new PaymentSqliteRepository();

module.exports = {
  PaymentSqliteRepository,
  PaymentSqliteRepo
};
