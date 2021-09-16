exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.watcherBoard = (req, res) => {
  res.status(200).send("Watcher Content.");
};
