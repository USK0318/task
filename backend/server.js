const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const posts = require('./models/posts');
const favaourite = require('./models/favaretitems');
const profile = require('./models/profile');
const settings = require('./models/settings');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/posts', async (req, res) => {
    try {
        const allPosts = await posts.find();
        res.status(200).json(allPosts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { title, author, content } = req.body;
        await posts.create({ title, author, content });
        res.status(201).json({ message: 'Post created successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/favaourite', async (req, res) => {
    try {
        const allFavaourite = await favaourite.find();
        res.status(200).json(allFavaourite);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post('/favaourite', async (req, res) => {
    try {
        const { name, description } = req.body;
        await favaourite.create({ name, description });
        res.status(201).json({ message: 'Favaourite created successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.delete('/favaourite/:id', async (req, res) => {
    try {
        await favaourite.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Favaourite deleted successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/profile', async (req, res) => {
    try {
        const allProfile = await profile.find();
        res.status(200).json(allProfile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post('/profile/:id', async (req, res) => {
    try {
        const { name, email, phone, bio } = req.body;
        await profile.findOneAndUpdate({ _id: req.params.id }, { name, email, phone, bio });
        res.status(201).json({ message: 'Profile updated successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/settings', async (req, res) => {
    try {
        const allSettings = await settings.find();
        res.status(200).json(allSettings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post('/settings/:id', async (req, res) => {
    try {
        const { theme, profileposition, postposition, faveposition } = req.body;
        await settings.findOneAndUpdate({ _id: req.params.id }, { theme, profileposition, postposition, faveposition });
        res.status(201).json({ message: 'Settings update successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.get('/settings/:id', async (req, res) => {
    try {
        const allSettings = await settings.findById(req.params.id);
        res.status(200).json(allSettings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
