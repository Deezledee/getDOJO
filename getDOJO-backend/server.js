const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.listen(port, '0.0.0.0', function() {
  console.log(`Server is running on port ${port}`);
});
