const blackList = require("./blackList.json");
const fs = require('fs');


module.exports = {

    insert: async function (id) {
        fs.readFile('./blackList.json', async function read(err, data) {
            if (err) {
                throw err;
            }
            const listObject = JSON.parse(data);
            const index = listObject.findIndex(e => id == e['id']);
            console.log(id);

            console.log(index);
            if (index == -1) {
                listObject.push({ "id": id });
                const list = JSON.stringify(listObject);
                await fs.writeFile('./blackList.json', list, function (err, data) {
                    if (err) throw err;

                })
            }

        });







    },

    remove: async function (id) {
        fs.readFile('./blackList.json', async function read(err, data) {
            const listObject = JSON.parse(data);
            const index = listObject.findIndex(e => id == e['id']);
            if (index != undefined) {
                listObject.splice(index, 1);
                await fs.writeFile('./blackList.json', JSON.stringify(listObject), function (err, data) {
                    if (err) throw err;
                })
            }
        });
    },


    get: async function (id) {
        const data = fs.readFileSync('./blackList.json')
        const listObject = JSON.parse(data);
        const index = listObject.findIndex(e => id == e['id']);
        if (index != -1) {
        
            return true;
        }
        
        return false;
    }


}