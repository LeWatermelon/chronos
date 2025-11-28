import User from "../../database/models/User.js";

async function handleMe(req, res) {
    try {
        if (!req.session.user || !req.session.user.id) {
            return res.json(null);
        }

        const user = await User.findById(req.session.user.id);

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

export default handleMe;
