SELECT vehicles.year, users.firstname, users.lastname FROM vehicles
JOIN users On users.id = vehicles.ownerId
WHERE vehicles.year > 2000
ORDER by vehicles.year DESC;
