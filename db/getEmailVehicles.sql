SELECT * FROM vehicles
JOIN users On users.id = vehicles.ownerId
WHERE users.email = $1;
