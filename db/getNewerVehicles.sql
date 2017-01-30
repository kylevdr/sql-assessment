SELECT Vehicles.*, Users.firstname, Users.lastname FROM Vehicles
JOIN Users ON ownerId = Users.id
WHERE year > 2000
ORDER BY year DESC;