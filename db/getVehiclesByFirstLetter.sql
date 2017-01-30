SELECT * FROM Vehicles
JOIN Users on ownerId = Users.id
WHERE Users.firstname LIKE $1;