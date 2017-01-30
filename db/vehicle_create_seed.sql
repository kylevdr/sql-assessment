-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
-- DROP TABLE IF EXISTS vehicles;

DROP TABLE IF EXISTS Vehicles;

CREATE TABLE Vehicles (
    id serial,
    make text,
    model text,
    year numeric,
    ownerId integer
);

INSERT INTO Vehicles
(make, model, year, ownerId)
VALUES
('Toyota', 'Camry', 1991, 1),
('Honda', 'Civic', 1995, 1),
('Ford', 'Focus', 2005, 1),
('Ford', 'Taurus', 2003, 2),
('VW', 'Bug', 2010, 2),
('Mini', 'Coup', 2013, 3);
