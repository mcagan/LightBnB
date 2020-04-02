const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryText = "SELECT * FROM users WHERE users.email = $1;"
  const values = [email]
  return pool.query(queryText, values)
  .then(res => res.rows[0])
  .catch(err => console.log('Err', err));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryText = "SELECT * FROM users WHERE users.id= $1;"
  const values = [id]
  return pool.query(queryText, values)
  .then(res => res.rows[0])
  .catch(err => console.log('Err', err));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryText = "INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *;"
  const hashedPassword = bcrypt.hashSync(user.password, 10)
  const values = [user.name, hashedPassword, user.email]
  return pool.query(queryText, values)
  .then(res => res.rows)
  .catch(err => console.log('Err', err));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryText = "SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating FROM properties JOIN reservations ON property_id = properties.id JOIN property_reviews ON property_reviews.property_id = properties.id WHERE reservations.guest_id = $1 AND end_date < now()::date GROUP BY properties.id, reservations.id ORDER BY reservations.start_date LIMIT $2;"
  const values = [guest_id, limit]
  return pool.query(queryText, values)
  .then(res => res.rows)
  .catch(err => console.log('Err', err));
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 * 
 */

const getAllProperties = function(options, limit = 10) {
  let queryParams = []
  let queryString = "SELECT properties.*, AVG(property_reviews.rating) AS average_rating FROM properties JOIN property_reviews ON properties.id = property_reviews.property_id "
  if (options.city) {
    queryParams.push(`%${options.city}%`)
      queryString += `WHERE city LIKE $${queryParams.length} `
    }

  if(options.owner_id) {
    queryParams.push(options.owner_id)
    if (queryParams.length === 1) {
      queryString += `WHERE owner_id = $${queryParams.length} `
    } else {
      queryString += `AND owner_id = $${queryParams.length} `
    }
    
  }
  if(options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    if (queryParams.length === 1) {
      queryString += `WHERE cost_per_night >= $${queryParams.length} `
    } else {
      queryString += `AND cost_per_night >= $${queryParams.length} `
    }
  }

  if(options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    if (queryParams.length === 1) {
      queryString += `WHERE cost_per_night <= $${queryParams.length} `
    } else {
      queryString += `AND cost_per_night <= $${queryParams.length} `
    }
  }
  queryString += `
  GROUP BY properties.id `
  if(options.minimum_rating) {
    queryParams.push(options.minimum_rating)
    queryString += `
    HAVING AVG(property_reviews.rating) >= $${queryParams.length} `
  }
  queryParams.push(limit);
  queryString += `ORDER BY cost_per_night 
  LIMIT $${queryParams.length};
  `;
  return pool.query(queryString, queryParams).then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryText = "INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;"
  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms]
  return pool.query(queryText, values)
  .then(res => res.rows)
  .catch(err => console.log('Err', err));
}
exports.addProperty = addProperty;
