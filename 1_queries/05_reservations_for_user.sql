SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
FROM properties
JOIN reservations ON property_id = properties.id
JOIN property_reviews ON property_reviews.property_id = properties.id
WHERE reservations.guest_id = 1 AND end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;