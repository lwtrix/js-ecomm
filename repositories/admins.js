const { randomBytes, scrypt } = require('crypto');
const util = require('util');
const BaseRepository = require('./baseRepo');

const Scrypt = util.promisify(scrypt);

class AdminsRepository extends BaseRepository{
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

}

module.exports = new AdminsRepository('admins.json');
