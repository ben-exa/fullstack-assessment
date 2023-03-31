const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const { faker } = require('@faker-js/faker');
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const residents = [];
for (let x = 0; x < 2500; x += 1) {
    const gender = faker.name.sex();
    const dob = faker.date.birthdate({
        max: 90,
        min: 45,
        mode: 'age',
    });
    residents.push({
        // Begin basic data only returned in GET /residents
        image_url: `https://avatars.dicebear.com/api/open-peeps/${x}.svg`,
        id: x.toString(),
        first_name: faker.name.firstName(gender),
        last_name: faker.name.lastName(),
        gender,
        dob: `${dob.getFullYear()}-${dob.getMonth() + 1}-${dob.getDate()}`,
        facility_id: faker.datatype.number(100).toString(),
        room_id: faker.datatype.number(49).toString(),
    });
}
app.get('/residents', (req, res) => {
    const { name, id, gender, facility_id, room_id } = req.query;
    const filteredResidents = residents.filter((resident) => {
        const conditions = [];
        if (name) {
            const lowercaseName = name.toLowerCase();
            conditions.push(resident.first_name.toLowerCase().includes(lowercaseName) || resident.last_name.includes(lowercaseName));
        }
        if (id) {
            conditions.push(resident.id == id);
        }
        if (gender) {
            conditions.push(resident.gender == gender);
        }
        if (facility_id) {
            conditions.push(resident.facility_id == facility_id);
        }
        if (room_id) {
            conditions.push(resident.room_id == room_id);
        }
        return conditions.every(condition => condition === true) || conditions.length === 0;
    });
    return res.send(filteredResidents);
});
app.get('/status', (req, res) => {
    res.send('ok');
});
app.listen(port, () => {
    console.log(`exacare-fullstack-interview backend listening on port ${port}`);
});
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.error(res);
    return res.status(500).send('Something broke, check backend logs');
}
app.use(errorHandler);
//# sourceMappingURL=index.js.map