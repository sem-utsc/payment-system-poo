var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// GET My View page
router.get("/my-page", function (req, res, next) {
  const myData = {
    name: "Sem",
    title: "My Personal site",
    say: "hello!!!",
  };
  res.render("myview", { ...myData });
});

module.exports = router;
