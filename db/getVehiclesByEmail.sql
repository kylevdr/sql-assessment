SELECT * FROM Vehicles
JOIN Users on ownerId = Users.id
WHERE Users.email = $1;