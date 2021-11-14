const fs = require('fs');
const uniqid = require('uniqid');


const getAllItems = async () => {
    const items = await loadAllItems();
    return items
}

const loadAllItems = () => {

    return new Promise((resolve, reject) => {
        try {
            const dataBuffer = fs.readFileSync('../market.json', 'utf8');
            const dataJSON = dataBuffer.toString();
            resolve(JSON.parse(dataJSON));
        } catch (e) {
            resolve([]);
        }
    })
   
}

const loadItems = () => {
    try{
        const dataBuffer = fs.readFileSync('./market.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        console.log('error');
        return [];
    }
}

const createItem = (name, price) => {

    return new Promise((resolve, reject) => {
    
            const items = loadItems();
        
            if (true) {
                items.push({
                    id: uniqid(),
                    name: name,
                    price: price
                })
                saveItems(items)
                resolve({
                    id: uniqid(),
                    name: name,
                    price: price
                })
            } else {
                console.log('error');
                reject({result: 'errror'})
            }
    
        
    })
    
}

const saveItems = (items) => {
    const dataJSON = JSON.stringify(items);
    fs.writeFileSync('./market.json', dataJSON);
}


module.exports = {
    getAllItems: getAllItems,
    createItem: createItem
}