const fs = require("fs");

const envelopes = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/envelopes.json`)
);

exports.getAllEnvs = (req, res) => {
  res.status(200).send({
    status: "success",
    results: envelopes.length,
    data: {
      envelopes,
    },
  });
};

exports.createEnv = (req, res) => {
  const newId = envelopes[envelopes.length - 1].id + 1;
  const newEnvelope = Object.assign({ id: newId }, req.body);

  envelopes.push(newEnvelope);
  fs.writeFile(
    `${__dirname}/../data/envelopes.json`,
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
};

exports.getEnv = (req, res) => {
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
};

exports.updateEnv = (req, res) => {
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
      `${__dirname}/../data/envelopes.json`,
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
};

exports.deleteEnv = (req, res) => {
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
      `${__dirname}/../data/envelopes.json`,
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
};

exports.transferEnvBudget = (req, res) => {
  const idFrom = req.params.from * 1;
  const idTo = req.params.to * 1;

  const envelopeFrom = envelopes.find((el) => el.id === idFrom);
  const envelopeTo = envelopes.find((el) => el.id === idTo);

  if (!envelopeFrom || !envelopeTo) {
    res.status(404).json({
      status: "fail",
      message: "Can not find envelope :(",
    });
  } else {
    let idxFirst = envelopes.indexOf(envelopeFrom);
    let idxSec = envelopes.indexOf(envelopeTo);

    envelopes[idxFirst].budget -= req.body.budgetToChange;
    envelopes[idxSec].budget += req.body.budgetToChange;

    fs.writeFile(
      `${__dirname}/../data/envelopes.json`,
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
};
