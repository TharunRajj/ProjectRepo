const path = require("path");
const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { name } = require("ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6729f6509361da69f8576272")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
//   app.listen(3000);
// });

mongoose
  .connect("mongodb+srv://Tharun:MongoDBPractice@cluster0.foxt3.mongodb.net/")
  .then((result) => {
    // console.log(result);
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Tharun",
          email: "tharunraj@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
      app.listen(3000);
    });
  })
  .catch((err) => {
    console.log(err);
  });
