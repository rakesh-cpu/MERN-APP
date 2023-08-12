import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { createUser, loginUser } from './controlers/users.mjs'; // Use .mjs extension for ESM

const dbUrl = "mongodb+srv://rakeshdontula66:4423@cluster0.v67zu62.mongodb.net/?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(dbUrl, connectionParams).then(() => {
    console.log("connected to db");
}).catch((e) => {
    console.log("error", e);
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    cpassword: String,
});

export const User = mongoose.model('User', userSchema);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.get('/', async (req, res) => {
    let docs = await User.find({});
    res.send(docs);
    
});
app.post('/signup', createUser);
app.post('/signin', loginUser);

app.listen(5000, () => console.log(`Server Running on Port: http://localhost:5000`));
