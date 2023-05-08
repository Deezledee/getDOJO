const router = require("express").Router();
const Fs = require('fs/promises')



router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/techniques", (req, res, next) => {
  
  res.json([  ]);
});

module.exports = router;
