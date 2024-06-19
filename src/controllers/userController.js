const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const catchError = require('../utils/catchError');

// Crear usuario
exports.createUser = catchError(async (req, res) => {
  const { password, ...userData } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ ...userData, password: hashedPassword });
  res.status(201).json(user);
});

// Obtener todos los usuarios
exports.getAllUsers = catchError(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

// Obtener usuario por ID
exports.getUserById = catchError(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'no encontrado' });
  }
});

// Actualizar usuario
exports.updateUser = catchError(async (req, res) => {
  const { password, email, ...userData } = req.body;
  const [updated] = await User.update(userData, {
    where: { id: req.params.id },
  });
  if (updated) {
    const updatedUser = await User.findByPk(req.params.id);
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: 'no encontrado' });
  }
});

// Eliminar usuario
exports.deleteUser = catchError(async (req, res) => {
  const deleted = await User.destroy({
    where: { id: req.params.id },
  });
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'no encontrado' });
  }
});

// Login de usuario
exports.login = catchError(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: 'inválido' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'inválido' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Obtener usuario ya logueado
exports.getLoggedInUser = catchError(async (req, res) => {
  res.json(req.user);
});

