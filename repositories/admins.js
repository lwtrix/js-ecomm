const fs = require('fs');
const { randomBytes, scrypt } = require('crypto');
const util = require('util');

const Scrypt = util.promisify(scrypt);

class AdminsRepository {
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

  // retrieve all admin records
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      })
    );
  }

  // create new admin record
  async create(adminAttrs) {
    const adminsArr = await this.getAll();
    const id = randomBytes(6).toString('hex');

    const salt = randomBytes(8).toString('hex');
    const pwBuff = await Scrypt(adminAttrs.password, salt, 64);

    const newAdmin = {
      id,
      ...adminAttrs,
      password: `${pwBuff.toString('hex')}.${salt}`,
    };

    adminsArr.push(newAdmin);

    await this.writeAll(adminsArr);
    return newAdmin;
  }
  
  // comparing passwords for auth
  async passwordAuth(targetPw, sourcePw) {
    const [hashedPw, salt] = targetPw.split('.');
    const sourcePwBuff = await Scrypt(sourcePw, salt, 64);

    return hashedPw === sourcePwBuff.toString('hex');
  }

  // write to admins records
  async writeAll(adminsArr) {
    try {
      await fs.promises.writeFile(
        this.filename,
        JSON.stringify(adminsArr, null, 2)
      );
    } catch (error) {
      console.log('Error writing to admin records');
    }
  }

  // retrieve one admin record by id
  async getOneById(id) {
    const adminsArr = await this.getAll();
    return adminsArr.find((admin) => admin.id === id);
  }

  // retrieve an admin record based on multiple attributes
  async getOneBy(filters) {
    const adminsArr = await this.getAll();

    for (let admin of adminsArr) {
      let found = true;

      for (let key in filters) {
        if (filters[key] !== admin[key]) {
          found = false;
        }
      }

      if (found) {
        return admin;
      }
    }
  }

  // delete a single admin record
  async delete(id) {
    const adminsArr = await this.getAll();
    const updatedadminsArr = adminsArr.filter((user) => user.id !== id);
    await this.writeAll(updatedadminsArr);
  }

  // update a single admin record
  async update(id, updatedAttrs) {
    const adminsArr = await this.getAll();
    const foundAdmin = adminsArr.find((admin) => admin.id === id);

    if (!foundAdmin) {
      throw new Error(`Admin with id: ${id} was not found`);
    }

    Object.assign(foundAdmin, updatedAttrs);
    await this.writeAll(adminsArr);
  }
}

module.exports = new AdminsRepository('admins.json');
