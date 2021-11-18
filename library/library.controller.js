//const bookModel = require('./library.model');
const bookModel = require('./library.model').bookModel;


const testfun = async (req, res) => {
    console.log("testfun")
    return res.status(200).send('test')
}

const addNewBook = (req, res) => {
    const {title, author, year, lang, rating} = req.body;
    console.log('createBook', title, author, year, lang, rating);

    if (newBookValidation(title, author, year, lang, rating)) {
        const newBook = new bookModel({
            title: title,
            author: author,
            year: year,
            lang: lang,
            rating: rating
        });
        newBook.save();
        res.send('book created');
    } else {
        res.status(401).send('invalid input'); 
    }
    
}

const newBookValidation = (title, author, year, lang, rating) => {
    if (title && author && year && lang && rating) {
        if (typeof title === 'string' && typeof author === 'string', typeof year === 'number' && 
            typeof lang === 'string', typeof rating === 'number') {
                if (new Date().getFullYear() < +year) {
                    return false;
                } else if (lang.length !== 2) {
                    return false;
                } else if (rating < 0 || rating > 10) {
                    return false;
                } else {
                    return true;
                }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

const getAllBooks = (req, res) => {
    bookModel.find({}).lean().exec(function(err, data) {
        if (err) throw err;
        res.send(data);
    });
}

const getBook = (req, res) => {
    const {id} = req.params;
    bookModel.findById(id).exec(function(err, data) {
        if (err) throw err;
        res.send(data);
    });
}

const updateBook = (req, res) => {
    const {id} = req.params;
    const {title, author, year, rating, lang} = req.body;
    console.log('updateBook', id, req.body);

    const query = {'_id': id};
    const updatedData = {title: title, author: author, year: year, rating: rating, lang: lang}
    
    bookModel.findOneAndUpdate(query, updatedData, {new: true, runValidators: true}, function(err, data) {
        if (err) return res.send(500, {error: err});
        return res.send({success: data});
    });
}


const deleteBook = (req, res) => {
    const {id} = req.params;
    console.log('deleteBook', id);

    bookModel.findByIdAndDelete(id, (err, data) => {
        if (err) throw err;
        if (data) {
            return res.status(200).json({success: data})
        }
        return res.status(400).json({error: 'Item not found'})

    })
}






module.exports = {
    testfun,
    addNewBook,
    getAllBooks,
    updateBook,
    deleteBook,
    getBook
}