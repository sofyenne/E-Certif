class genereiqueService {
    constructor(dao) {
        this.dao = dao
    }

    afficheAll() {
        return this.dao.find().exec()
    }
    ajout(x) {
        return this.dao.create(x)
    }
    findById(x) {

        return this.dao.findById(x).exec();
    }

    findByIdAndUpdate(id, updatedData) {
        return this.dao.findByIdAndUpdate(id, updatedData)
    }

    findByIdAndDelete(id) {

        return this.dao.findByIdAndDelete(id).exec()


    }

    findOneAndUpdateOrCreate(condition, data) {

        try {
            return  this.dao.findOneAndUpdate(condition, data, {
                new: true,
                upsert: true // Make this update into an upsert
            }).exec()
        } catch (error) {
            
            return error
        }
       

    }

    deleteMany(condition) {

        return  this.dao.deleteMany(condition).exec()

    }

}

module.exports = genereiqueService