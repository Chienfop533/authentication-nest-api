import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const handleHashPassword = async (plainPassword: string) => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const compareHashPassword = async (
  plainPassword: string,
  hashPassword: string,
) => {
  try {
    return await bcrypt.compare(plainPassword, hashPassword);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
