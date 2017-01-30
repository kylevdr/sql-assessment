UPDATE Vehicles
SET ownerId = null
WHERE id = $2
AND ownerId = $1;