SELECT * FROM vehicles
JOIN users On users.id = vehicles.ownerId
WHERE users.firstname LIKE $1 || '%';
