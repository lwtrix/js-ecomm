const { randomBytes } = require('crypto')
const fs = require('fs');


class BaseRepository {
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

  // retrieve all records
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      })
    );
  }

  // write to records
  async writeAll(recordsArr) {
    try {
      await fs.promises.writeFile(
        this.filename,
        JSON.stringify(recordsArr, null, 2)
      );
    } catch (error) {
      console.log(`Error writing to ${this.filename} records`);
    }
  }

  // retrieve one record by id
  async getOneById(id) {
    const recordsArr = await this.getAll();
    return recordsArr.find((record) => record.id === id);
  }

  // retrieve a record based on multiple attributes
  async getOneBy(filters) {
    const recordsArr = await this.getAll();

    for (let record of recordsArr) {
      let found = true;

      for (let key in filters) {
        if (filters[key] !== record[key]) {
          found = false;
        }
      }

      if (found) {
        return record;
      }
    }
  }

  // create new record
  async create(props) {
    const id = randomBytes(4).toString('hex')
    const recordsArr = await this.getAll()

    const newRecord = { ...props, id }
    recordsArr.push(newRecord)
    this.writeAll(recordsArr)

    return newRecord
  }

  // delete a single record
  async delete(id) {
    const recordsArr = await this.getAll();
    const updatedRecordsArr = recordsArr.filter((record) => record.id !== id);
    await this.writeAll(updatedRecordsArr);
  }

  // update a single record
  async update(id, updatedAttrs) {
    const recordsArr = await this.getAll();
    const foundRecord = recordsArr.find((record) => record.id === id);

    if (!foundRecord) {
      throw new Error(`Record with id: ${id} was not found`);
    }

    Object.assign(foundRecord, updatedAttrs);
    await this.writeAll(recordsArr);
  }
}

module.exports = BaseRepository;
