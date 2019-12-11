const express = require('express');
const router = express.Router();
const Entry = require('../model/entry');
const path = require('path')
const mongoose = require('mongoose')



router.get('/latest', (req, res) => {
      Entry.find({deletedAt:null})
            .limit(3)
            .sort({
                  createdAt: -1
            })
            .then((doc) => {
                  console.log(doc, 'the doc');
                  res.json({ data: doc });

            })
            .catch(err => {
                  console.log(err);
                  res.status(400).json({
                        err: err.message
                  });
            });

});


router.get('/all', (req, res) => {
      Entry.find({deletedAt:null})
            .sort({
                  createdAt: -1
            })
            .then((doc) => {
                  console.log(doc);
                  res.json({ data: doc });

            })
            .catch(err => {
                  console.log(err);
                  res.status(400).json({
                        err: err.message
                  });
            });

});


router.post('/delete/:id', (req, res) => {
      let data = {
            deletedAt: new Date()
      }
      Entry.findByIdAndUpdate(req.params.id,data, {new : true})
            .then(doc => {
                  if (doc) {
                        res.json(doc);
                  } else {
                        res.end();
                  }
            })
            .catch(err => {
                  res.send(err);
            });

});

router.post('/update', (req, res) => {
      console.log(typeof req.body.id)
      Entry.findById(req.body.id)
            .then(doc => {
                  if (doc) {
                        console.log(doc)
                        res.json(doc)
                  } else {
                        console.log('not found')
                        res.end()
                  }
            })
            .catch(err => {
                  res.send(err)
                  console.log(err)
            });

});
router.post('/update/:entryID', (req, res) => {
      let date = new Date();
      let data = { title: req.body.title, body: req.body.body, editedAt: date.toISOString() };
      let options = { new: true };
      Entry.findByIdAndUpdate(req.params.entryID, data, options)
            .then(doc => {
                  if (doc) {
                        res.json(doc);
                  } else {
                        res.end();
                  }
            })
            .catch(err => {
                  res.send(err);
            });

});

router.post('/add', (req, res) => {
      let filename;
      console.log('test')
      console.log(req.file)
      console.log( __dirname+'../public')

      if (req.file == undefined) {
            filename = null
      } else {
            filename = req.file.filename
      }

      let data = { title: req.body.title, body: req.body.body, img: filename };
      let entry = new Entry(data);

      entry.save()
            .then((data) => {
                  res.json({ data: data, message: 'Successfully Saved' });
                  console.log(data);
            }).catch((err) => {
                  res.status(400).json(err.message);
                  console.log(err)
            });
});


module.exports = router;