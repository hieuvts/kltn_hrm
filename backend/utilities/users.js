const users = [];
// Take userID (socketID), username, and room which user want to joint
//
function addUser(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}
// Get user instance by id
function getUser(id) {
  return users.find((user) => user.id === id);
}

function userLeft(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}
module.exports = {
  addUser,
  getUser,
  userLeft,
  getRoomUsers,
};
