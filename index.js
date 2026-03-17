import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";
const yourBearerToken = "83e4e1a1-9169-4a67-8258-7f34f1df62ad";

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {

  const id = req.body.id
  const secret = req.body.secret;
  const score = req.body.score
  try {
    const result = await axios.post(API_URL + "/secrets/", { id:id, secret: secret, score: score}, config)
    const response = JSON.stringify(result.data, null, 2)
    res.render('index.ejs', { content: response } );

  } catch(error) {
    console.error('Failed to make request', error.message)
    res.render('index.ejs', {
      error: error.message
    })
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
