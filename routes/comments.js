const express = require('express');
const router = express.Router();
const data = require('../data');
const bookdata = data.restaurants;

router.get('/:id', async (req, res) => {
    try {
      let book = await bookdata.get(req.params.id);
      res.status(200).json(book);
    } catch (e) {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      let booklist = await bookdata.getAll();
      res.status(200).json(booklist);
    } catch (e) {
      res.status(404).json({error: e});
    }
});

router.post('/', async (req, res) => {
  const blogBookData = req.body;
  try {
    const {subjectLine, comment } = blogBookData;
    const newBook = await bookdata.create (subjectLine, comment);
    res.status(200).json(newBook);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

    router.put('/:id', async (req, res) => {
        let bookInfo = req.body;
      
        if (!bookInfo) {
          res.status(400).json({ error: 'You must provide data to update a restaurant' });
          return;
        }

        try {
            await bookdata.get(req.params.id);
          } catch (e) {
            res.status(404).json({ error: 'restaurant not found' });
            return;
          }
          try {
            const updatedbook = await bookdata.update(req.params.id, bookInfo);
            res.status(200).json(updatedbook);
          } catch (e) {
            res.status(400).json({error: e});
          }
  });
  
  router.delete('/:id', async (req, res) => {
    if (!req.params.id) throw 'You must specify an ID to delete';
    try {
      await bookdata.get(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'restaurant not found' });
      return;
    }
  
    try {
     const deleted = await bookdata.remove(req.params.id);
      res.status(200).json(deleted);
    } catch (e) {
      res.status(404).json({error: "Could not delete restaurant"});
    }
  });
  module.exports = router;