import { User } from '../server.mjs'; // Use .mjs extension for ESM

export const createUser = async (req, res) => {
    let user = new User();

    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.cpassword = req.body.cpassword;

    const document = await user.save();
    console.log(document);
    console.log("data sent to db");
};

export const loginUser = async (req, res) => {
    let login = new User();

    const { username, password } = req.body;

    try {
        const user = await login.findOne({ username, password });

        if (user) {
            console.log("hello");
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
};
