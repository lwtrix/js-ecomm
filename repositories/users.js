const fs = require('fs');
const { randomBytes } = require('crypto');

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

  async getAll() {
    // open file, parse and read contents
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      })
    );
  }

  async create(userAttrs) {
    const usersArr = await this.getAll();

    const id = randomBytes(6).toString('hex');
    usersArr.push({ ...userAttrs, id });
    await this.writeAll(usersArr);
  }

  async writeAll(usersArr) {
    try {
      await fs.promises.writeFile(
        this.filename,
        JSON.stringify(usersArr, null, 2)
      );
    } catch (error) {
      console.log('Error creating new user record');
    }
  }

  async getOneById(id) {
    const usersArr = await this.getAll();
    return usersArr.find((user) => user.id === id);
  }

  async delete(id) {
    const usersArr = await this.getAll()
    const updatedUsersArr = usersArr.filter(user => user.id !== id)
    await this.writeAll(updatedUsersArr)
  }

  async update(id, updatedAttrs) {
    const usersArr = await this.getAll()
    const foundUser = usersArr.find((user) => user.id === id);
    
    if(!foundUser) {
      throw new Error(`User with id: ${id} was not found`)
    }

    Object.assign(foundUser, updatedAttrs)
    await this.writeAll(usersArr);
  }
}

const test = async () => {
  const repo = new UsersRepository('users.json');

  await repo.update('bf175471e93d', { email: 'david01@gmail.com', password: 'mypass'})
  const users = await repo.getAll()
  console.log(users)
};

test();
