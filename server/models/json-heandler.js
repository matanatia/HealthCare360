const fs = require('fs');
const readline = require('readline');

const json_path = 'DB-mockup.json';

const getJson = () => {
    return new Promise((resolve, reject) => {
        try{
            let rawdata = fs.readFileSync(json_path);
            resolve(JSON.parse(rawdata));
        }
        catch(err) {
            reject({error: err.message})
        }
    });
}

const upJson = (json) => {
    return new Promise((resolve, reject) => {
        try{
            let data = JSON.stringify(json, null, 2);
            fs.writeFileSync(json_path, data);
            resolve(data);
        }
        catch(err) {
            reject({error: err.message})
        }
    });
}


module.exports = { getJson , upJson };