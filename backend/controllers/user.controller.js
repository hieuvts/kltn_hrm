const publicAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

const userRole = (req, res) => {
  res.status(200).send("User Content.");
};

const adminRole = (req, res) => {
  res.status(200).send("Admin Content.");
};

const moderatorRole = (req, res) => {
  res.status(200).send("Moderator Content.");
};

module.exports = {
  publicAccess,
  userRole,
  adminRole,
  moderatorRole,
};
