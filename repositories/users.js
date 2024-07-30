const fs = require('fs');
const { randomBytes, scrypt } = require('crypto');
const util = require('util');

const Scrypt = util.promisify(scrypt);

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository requires a file name');
    }
    this.filename = filename;

    // check if file exists and create file otherwise
    try {
      fs.accessSync(this.filename);
    } catch (error) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  // retrieve all user records
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      })
    );
  }

  // create new user record
  async create(userAttrs) {
    const usersArr = await this.getAll();
    const id = randomBytes(6).toString('hex');

    const salt = randomBytes(8).toString('hex');
    const pwBuff = await Scrypt(userAttrs.password, salt, 64);

    const newUser = {
      id,
      ...userAttrs,
      password: `${pwBuff.toString('hex')}.${salt}`,
    };

    usersArr.push(newUser);

    await this.writeAll(usersArr);
    return newUser;
  }
  
  // comparing passwords for auth
  async passwordAuth(targetPw, sourcePw) {
    const [hashedPw, salt] = targetPw.split('.');
    const sourcePwBuff = await Scrypt(sourcePw, salt, 64);

    return hashedPw === sourcePwBuff.toString('hex');
  }

  // write to users records
  async writeAll(usersArr) {
    try {
      await fs.promises.writeFile(
        this.filename,
        JSON.stringify(usersArr, null, 2)
      );
    } catch (error) {
      console.log('Error writing to users records');
    }
  }

  // retrieve one user record by id
  async getOneById(id) {
    const usersArr = await this.getAll();
    return usersArr.find((user) => user.id === id);
  }

  // retrieve on user record based on multiple attributes
  async getOneBy(filters) {
    const usersArr = await this.getAll();

    for (let user of usersArr) {
      let found = true;

      for (let key in filters) {
        if (filters[key] !== user[key]) {
          found = false;
        }
      }

      if (found) {
        return user;
      }
    }
  }

  // delete a single user record
  async delete(id) {
    const usersArr = await this.getAll();
    const updatedUsersArr = usersArr.filter((user) => user.id !== id);
    await this.writeAll(updatedUsersArr);
  }

  // update a single user record
  async update(id, updatedAttrs) {
    const usersArr = await this.getAll();
    const foundUser = usersArr.find((user) => user.id === id);

    if (!foundUser) {
      throw new Error(`User with id: ${id} was not found`);
    }

    Object.assign(foundUser, updatedAttrs);
    await this.writeAll(usersArr);
  }
}

module.exports = new UsersRepository('users.json');
