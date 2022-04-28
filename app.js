const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const envelopes = JSON.parse(
  fs.readFileSync(`${__dirname}/data/envelopes.json`)
);

app.get("/envelopes", (req, res) => {
  res.status(200).send({
    status: "success",
    results: envelopes.length,
    data: {
      envelopes,
    },
  });
});

app.post("/envelopes", (req, res) => {
  const newId = envelopes[envelopes.length - 1].id + 1;
  const newEnvelope = Object.assign({ id: newId }, req.body);

  envelopes.push(newEnvelope);
  fs.writeFile(
    `${__dirname}/data/envelopes.json`,
    JSON.stringify(envelopes),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          envelopes,
        },
      });
    }
  );
});

app.get("/envelopes/:id", (req, res) => {
  const id = req.params.id * 1;
  const envelope = envelopes.find((el) => el.id === id);
  if (!envelope) {
    res.status(404).json({
      status: "fail",
      message: "Can not find envelope :(",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        envelope,
      },
    });
  }
});

app.patch("/envelopes/:id", (req, res) => {
  const id = req.params.id * 1;
  const envelope = envelopes.find((el) => el.id === id);

  if (!envelope) {
    res.status(404).json({
      status: "fail",
      message: "Can not find envelope :(",
    });
  } else {
    envelopes[id].budget = req.body.budget;

    fs.writeFile(
      `${__dirname}/data/envelopes.json`,
      JSON.stringify(envelopes),
      (err) => {
        res.status(201).json({
          status: "success",
          data: {
            envelope,
          },
        });
      }
    );
  }
});

app.delete("/envelopes/:id", (req, res) => {
  const id = req.params.id * 1;
  const envelope = envelopes.find((el) => el.id === id);

  if (!envelope) {
    res.status(404).json({
      status: "fail",
      message: "Can not find envelope :(",
    });
  } else {
    let idx = envelopes.indexOf(envelope);
    const dataToDelete = envelopes.splice(idx, 1);

    fs.writeFile(
      `${__dirname}/data/envelopes.json`,
      JSON.stringify(envelopes),
      (err) => {
        res.status(201).json({
          status: "success",
          data: {
            envelopes,
          },
        });
      }
    );
  }
});

const port = 4444;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
