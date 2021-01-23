class BaseService {
  constructor(model) {
    this.model = model
  }

  save(objects) {
    return this.model.insertMany(objects)
  }

  load() {
    return this.model.find()
  }

  async insert(object) {
    return await this.model.create(object)
  }

  async update(id, object) {
    return this.model.findByIdAndUpdate(id, object)
  }

  async removeBy(property, value) {
    return this.model.deleteOne({[property]: value})
  }

  async find(id) {
    return this.model.findById(id)
  }

  async query(object) {
    return this.model.find(object)
  }

  async findBy(property, value) {
    return this.model.find({[property]: value})
  }
}

module.exports = BaseService
