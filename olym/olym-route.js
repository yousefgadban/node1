const express = require('express')
const router = express.Router()
const playerModel = require('./player.model').playerModel;

module.exports = router

 

router.post('/createPlayer', (req, res) => {

    console.log('req.params', req.body);
    const {name, age, country} = req.body;
    console.log('createStudent', name, age, country);

    const newPlayer = new playerModel({
        name: name,
        age: age,
        country: country,
        jumps: [0,0,0]
    });
    newPlayer.save();
    res.send('player created');

})

router.get('/getAllPlayers', (req, res) => {

    // playerModel.find({}, (err, data) => {
    //     if (err) throw err;
    //     let updated = data.map((player) => {
    //         player['avg'] = 3
    //         //console.log(player);
    //         return player;
    //     })
    //     res.send(updated);
    // })

    playerModel.find({}).lean().exec(function(err, data) {
        if (err) throw err;
        let updated = data.map((player) => {
            player['avg'] = calculateAvg(player.jumps)
            //console.log(player);
            return player;
        })
        res.send(updated);
    });

})

const calculateAvg = (arr) => {
    const sum = arr.reduce((a, b) => a + b, 0);
    const avg = (sum / arr.length) || 0;
    return avg;
}

router.put('/updatePlayer/:id', (req, res) => {

    const {id} = req.params;
    const {jumps} = req.body;
    console.log('updatePlayer', id, jumps);

    const query = {'_id': id};
    const updatedData = {jumps: jumps}
    
    playerModel.findOneAndUpdate(query, updatedData, function(err, data) {
        if (err) return res.send(500, {error: err});
        return res.send({success: data});
    });

})


router.delete('/deletePlayer/:id', (req, res) => {
    const {id} = req.params;
    console.log('deletePlayer', id);

    playerModel.findByIdAndDelete(id, (err, data) => {
        if (err) throw err;
        if (data) {
            return res.status(200).json({success: data})
        }
        return res.status(400).json({error: 'Item not found'})

    })
});