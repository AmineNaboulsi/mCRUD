const { MongoClient , ObjectId } = require('mongodb');
const express = require('express');
const cops = require('cors');
const app = express();

app.use(cops());

const con = 'mongodb+srv://amineecostore:wtOoRv5byvHY8o4i@cluster0.k5hgvac.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(con);
client.connect();

app.get('/users', async (req, res) => {
    if (!client) {
        res.json({ "error": "failed to connect to db" })
        return;
    }
    const db = client.db('db1');
    const collections = await db.listCollections().toArray();

    const collectionsnames = collections.map(collection => collection.name);
    res.json({ "collections": collectionsnames })
})

app.get('/listusers', async (req, res) => {
    if (!client) {
        res.json('error', 'faild to lod')
    }
    const db = await client.db('db1')

    const itmes = await db.collection('users').find().toArray();

    res.json(itmes);
})
app.get('/listorders', async (req, res) => {

})
app.get('/listproducts', async (req, res) => {
})

app.get('/addedit', async (req, res) => {
    if (!client) {
        res.json({ "error": "faild to connect to db" })
        return;
    }
    const db = await client.db('db1');

    const { id, name, email } = req.query;

    try {

        const existingItem = await db.collection('users').findOne({_id : new ObjectId(id)});
        console.log(existingItem)
        if(existingItem){
            await await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: { name: name, email: email } });
            res.json({ "status": "done" })
        }
        else{
            res.json({ "status": "not found" })
        }
    } catch (error) {
        console.error('Error updating document:', error.message);
        return { "status": "error" };
    }

})
app.listen(3001, () => {
    console.log("done");
})