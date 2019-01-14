import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma';

const userOne = {
  input: {
    name: 'red',
    email: 'red@icloud.com',
    password: bcrypt.hashSync('red@icloud.com')
  },
  user: undefined,
  jwt: undefined
};

const userTwo = {
  input: {
    name: 'black',
    email: 'black@icloud.com',
    password: bcrypt.hashSync('black@icloud.com')
  },
  user: undefined,
  jwt: undefined
};

const seedDatabase = async () => {
  // Delete test data
  await prisma.mutation.deleteManyUsers();
  // Create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_KEY);
  // Create user two
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_KEY);
};

export { seedDatabase as default, userOne, userTwo };
