class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({ firstName, lastName, email, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  deleteUser(id) {
    delete this.storage[id];
  }

  searchUsers({ name, email }) {
    if (name && email) {
      return Object.values(this.storage).filter(
        (user) =>
          String([user.firstName, user.lastName].join(""))
            .toLowerCase()
            .includes(name.toLowerCase()) &&
          String(user.email).toLowerCase().includes(email.toLowerCase()),
      );
    } else if (name) {
      return Object.values(this.storage).filter((user) =>
        String([user.firstName, user.lastName].join(""))
          .toLowerCase()
          .includes(name.toLowerCase()),
      );
    } else if (email) {
      return Object.values(this.storage).filter((user) =>
        String(user.email).toLowerCase().includes(email.toLowerCase()),
      );
    }
  }
}

module.exports = new UsersStorage();
