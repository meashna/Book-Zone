const router = require("express").Router();
const User = require("../models/user.js");


router.post("/signup", async (req, res) => {
  try {
    const { username, email, phonenumber, password} = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
  
    const user = new User({
      username,
      phonenumber,
      email,
      password
    });
    await user
      .save()
      // .then(() => res.status(200).json({ message: "User added" }));
      .then((savedUser) =>
        res.status(200).json({ message: "User added", _id: savedUser._id })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User already exists" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    if (req.body.password !== user.password) {
      return res
        .status(400)
        .json({ message: "Incorrect password. Please try again." });
    }

    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (error) {
    return res.status(500).json({
      message:
        "An error occurred during the sign-in process. Please try again later.",
    });
  }
});

module.exports = router;
