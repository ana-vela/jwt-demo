const express = require("express");
const app = express();
const PORT = 5000;
const jwt = require("jsonwebtoken");
const secret = "sekeiDFAeiqieIesk";

app.use(express.json());

// create a token from client and decode
app.post("/create-token", (req, res) => {
  // payload
  // secret
  // expiry time

  const payload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    id: req.body.id,
  };

  const expiry = 36000;
  jwt.sign(payload, secret, { expiresIn: expiry }, (err, token) => {
    if (err) {
      return res.status(500).json({ err });
    } else {
      return res.status(200).json({ token });
    }
  });
});
app.get("/decode-token", (req, res) => {
  console.log(req.headers);

  if (!req.headers.authorization) {
    return res
      .status(403)
      .json({ message: "authentication token is required" });
  }

  // pick auth header
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  const splittedStr = authHeader.split(" ");
  const token = splittedStr[1];
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.status(500).json({ err });
    } else {
      return res.status(200).json({ user: decodedToken });
    }
  });
  console.log(splittedStr);
});
app.listen(PORT, () => console.log("app started"));
