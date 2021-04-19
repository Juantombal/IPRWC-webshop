const db = require('../util/database');

module.exports = class User {
  constructor(name, email, postcode, street, password, isadmin) {
    this.name = name;
    this.email = email;
    this.postcode = postcode;
    this.street = street;
    this.password = password;
    this.isadmin = isadmin;
  }

  static find(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM users');
  }

  static save(user) {
    return db.execute(
      'INSERT INTO users (name, email, postcode, street, password, isadmin) VALUES (?, ?, ?, ?, ?, ?)',
      [user.name, user.email, user.postcode, user.street, user.password, user.isadmin]
    );
  }

  static makeAdmin(id) {
    return db.execute(
        'UPDATE users SET isadmin = true WHERE id = ?', [id],
    );
  }

  static makeNotAdmin(id) {
    return db.execute(
        'UPDATE users SET isadmin = false WHERE id = ?', [id],
    );
  }
};
