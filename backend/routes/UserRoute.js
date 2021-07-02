import express from 'express';
import User from "../model/UserModel.js";
import bcrypt from 'bcryptjs';

const userRoute = new express.Router();

userRoute.post("/register" ,async(req,res) => {
    const user = new User({
        username : req.body.username,
        email : req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    const createdUser = await user.save();
    res.status(200).send({createdUser})
})

userRoute.post('/signin',async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            username: user.username,
            email: user.email,
          });
          return;
        }
      }
      res.status(401).send({ message: 'Invalid email or password' });
    }
  );

export default userRoute;