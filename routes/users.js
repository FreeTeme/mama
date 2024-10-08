const express = require('express');
const router = express.Router();
const prisma = require('E:/mama/routes/prizma.js');

// Получить всех пользователей
router.get('/', async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении пользователей' });
  }
});

// Получить пользователя по ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.findUnique({ where: { id: parseInt(id) } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Пользователь не найден' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении пользователя' });
  }
});

// Создать нового пользователя
router.post('/', async (req, res) => {
  const { name, phone, count } = req.body;
  try {
    const newUser = await prisma.users.create({
      data: { name, phone, count: count || 0 },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании пользователя' });
  }
});

// Обновить пользователя
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phone, count } = req.body;
  try {
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(id) },
      data: { name, phone, count },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении пользователя' });
  }
});

// Удалить пользователя
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.users.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении пользователя' });
  }
});

module.exports = router;
