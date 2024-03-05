const express = require("express");
var cors = require('cors');
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require('fs');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");

require("dotenv").config();
const PORT = 3000;

const salt = bcrypt.genSaltSync(10);
const jwtSecret = "fdkncmx4sd1fa3nvkcncsn"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('/uploads'));
app.use(cors({
   credentials: true,
   origin: "http://localhost:5173"
}));

mongoose.connect(process.env.MONGO_URL)

const getUserDataFromReq = (req) => {
   return new Promise((resolve, reject) => {
      jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
         if (err) throw err;
         resolve(userData);
      })
   })
}


app.post("/register", async (req, res) => {
   const { registerData } = req.body;
   const { name, email, password } = registerData
   if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
   }

   try {
      const hashedPassword = bcrypt.hashSync(password, salt);
      const userDoc = await User.create({ name, email, password: hashedPassword });
      res.status(201).json({ message: "User created successfully", user: userDoc });
   } catch (error) {
      res.status(422).json({ message: "Error creating user", error: error.message });
   }
});

app.post("/login", async (req, res) => {
   const { loginData } = req.body
   const { email, password } = loginData

   try {
      const userDoc = await User.findOne({ email });

      if (userDoc) {
         const passOk = bcrypt.compareSync(password, userDoc.password)
         if (passOk) {
            jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
               if (err) throw err;
               res.cookie("token", token).json(userDoc);
            })
         } else {
            res.status(422).json("pass not ok")
         }
      }
   } catch (error) {
      res.status(422).json("")
   }
})

app.get("/profile", (req, res) => {
   const { token } = req.cookies;
   if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
         if (err) throw err;
         const { name, email, _id } = await User.findById(userData.id);
         res.json({ name, email, _id });
      })
   } else {
      res.json(null);
   }
})

app.post("/logout", (req, res) => {
   res.cookie("token", "").json(true)
})

app.post("/upload-by-link", async (req, res) => {
   const { link } = req.body;
   const newName = "photo" + Date.now() + ".jpg";
   await imageDownloader.image({
      url: link,
      dest: "/uploads/" + newName,
   })
   res.json(newName)
})



const photosMiddleware = multer({ dest: "/uploads" })
app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
   const uploadedFiles = []
   for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("\\uploads\\", ""));
   }
   res.json(uploadedFiles)
})

app.post("/places", (req, res) => {
   const { token } = req.cookies;
   const {
      _id,
      title,
      address,
      description,
      photos,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests, price } = req.body
   jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.create({
         owner: userData.id,
         _id,
         title,
         address,
         description,
         photos,
         perks,
         extraInfo,
         checkIn,
         checkOut,
         maxGuests,
         price
      })
      res.json(placeDoc);
   })
})

app.get("/user-places", (req, res) => {
   const { token } = req.cookies;
   jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;
      res.json(await Place.find({ owner: id }))
   })
})

app.get("/places/:id", async (req, res) => {
   const { id } = req.params;
   const place = await Place.findById(id)
   res.json(place);
})

app.put("/places", async (req, res) => {
   const { token } = req.cookies;
   const {
      id,
      title,
      address,
      description,
      photos,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests, price } = req.body;

   jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.findById(id);

      if (userData.id === placeDoc.owner.toString()) {
         placeDoc.set({
            title,
            address,
            description,
            photos,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests, price
         })
         await placeDoc.save();
         res.json("success",)
      }
   })
})

app.get("/places", async (req, res) => {
   const places = await Place.find()
   res.json(places)
})

app.post("/bookings", async (req, res) => {
   const userData = await getUserDataFromReq(req);
   const { _id, place, checkIn, checkOut, numberOfGuests, fullName, price } = req.body
   await Booking.create({
      _id, place, checkIn, checkOut, numberOfGuests, fullName, price,
      user: userData.id,
   })
   res.json("ok")
})



app.get("/bookings", async (req, res) => {
   const userData = await getUserDataFromReq(req)
   res.json(await Booking.find({ user: userData.id }).populate('place'));
})
app.listen(PORT, console.log("using port " + PORT));

