const express =require('express')
 
const  router = express.Router(); 

const Event = require('../models/event');

router.get('/all-events',(req,res)=>{
Event.find()
.then((result)=>{
    res.send(result)
})
.catch((err)=>{
    console.log(err);
})
})


//post request
router.post('/',(req,res)=>{
const event = new Event(req.body);
event.save()
    .then((result)=>{
    res.redirect('/events')
    })
    .catch((err)=>{
    console.log(err)
    });
})

router.get('/create',(req,res)=>{
res.render('create', {title: 'New Event' });
})

router.get('/:id',(req,res)=>{
const id = req.params.id;
Event.findById(id)
.then((result)=>{
    res.render('details',{event: result, title:'Event Details'})
})
.catch((err)=>{
    console.log(err)
})
})


router.delete('/:id',(req,res)=>{
const id = req.params.id;
Event.findByIdAndDelete(id)
.then(result =>{
    res.json({ redirect:'/events'})
})
.catch((err)=>{
    console.log(err)
})
})

//blog routes
router.get('/', (req, res) => {
Event.find().sort({ createdAt: -1 })
    .then(result => {
    res.render('events', { events: result, title: 'All events' });
    })
    .catch(err => {
    console.log(err);
    });
});

module.exports =router;