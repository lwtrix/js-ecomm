const fs = require('fs');
const { randomBytes } = require('crypto')

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

    const id = randomBytes(6).toString('hex')
    usersArr.push({...userAttrs, id});
    await this.writeAll(usersArr)
  }

  async writeAll(usersArr) {
    try {
      await fs.promises.writeFile(this.filename, JSON.stringify(usersArr, null, 2));
    } catch (error) {
      console.log('Error creating new user record');
    }
  }
}

const test = async () => {
  const repo = new UsersRepository('users.json');

  await repo.create({email: 'test@gmail.com', password: '123456'});
  const users = await repo.getAll();
  console.log(users);
};

test();
