


const createStudent = (name, age, email) => {

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

module.exports = {
    createStudent: createStudent
}

