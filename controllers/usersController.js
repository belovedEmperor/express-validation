const { body, validationResult, matchedData } = require("express-validator");

const alphaErr = "must only contain letters.";
const shortLengthErr = "must be between 1 and 10 characters.";
const emailErr = "must be a valid email.";
const numberErr = "must be a number.";
const longLengthErr = "must be less than 200 characters.";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${shortLengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${shortLengthErr}`),
  body("email").trim().isEmail().withMessage(`Email ${emailErr}`),
  body("age")
    .trim()
    .optional({ values: "falsy" })
    .isNumeric()
    .withMessage(`Age ${numberErr}`),
  body("bio")
    .trim()
    .optional({ values: "falsy" })
    .isLength()
    .withMessage(`Bio ${longLengthErr}`),
];

const usersStorage = require("../storages/usersStorage");

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User List",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create User",
  });
};

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("createUser", { title: "Create user", errors: errors.array() });
    }

    const { firstName, lastName, email, age, bio } = matchedData(req);
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", { title: "Update user", user: user });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, age, bio } = matchedData(req);
    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      email,
      age,
      bio,
    });
    res.redirect("/");
  },
];

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};
