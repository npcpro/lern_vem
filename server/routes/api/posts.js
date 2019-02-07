const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {

  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

async function loadPostsCollection(){


  const client = await mongodb.MongoClient.connect('mongodb://root2:zxcV1234@ds251287.mlab.com:51287/lern_vue_express',{
    useNewUrlParser:true
  });
  console.log('/////////////');
  console.log(client);
  return client.db('lern_vue_express').collection('posts');

}
// // Add Post
  router.post('/',async(req,res) =>{
    const posts = await loadPostsCollection();
    await posts.insertOne({
      text:req.body.text,
      createdAt: new Date()
    });
    res.status(201).send();
  })

  /// Delete posts
  router.delete('/:id',async(req,res) =>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id:new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
  });
// router.post('/', async (req, res) => {
//   const posts = await loadPostsCollection();
//   await posts.insertOne({
//     text: req.body.text,
//     createdAt: new Date()
//   });
//   res.status(201).send();
// });
//
// // Delete Post
// router.delete('/:id', async (req, res) => {
//   const posts = await loadPostsCollection();
//   await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
//   res.status(200).send();
// });
//
// async function loadPostsCollection() {
//   const client = await mongodb.MongoClient.connect(
//     'mongodb://YOUR_OWN_MONGODB',
//     {
//       useNewUrlParser: true
//     }
//   );
//
//   return client.db('vue_express').collection('posts');
// }
//
module.exports = router;
