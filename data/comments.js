const mongoCollections = require('../config/mongoCollections');
const mongocall = require("mongodb");
const comments = mongoCollections.comments;

module.exports = {
    async create(subjectLine, comment)
  {
    const booksCollection = await comments();
    let newbooks = {
      subjectLine: subjectLine,
      comment: comment
        };

        const insertInfo = await booksCollection.insertOne(newbooks);
        if (insertInfo.insertedCount === 0) throw 'Could not add comment';
        const newId = insertInfo.insertedId;
        const book = await this.get(newId.toString());
        return book;
    },
    async get(id) {
        if (!id) throw "You must provide an id to search for";
        if (typeof id != 'string') throw 'Id is not a String.';
        const booksCollection = await comments();
        const result = await booksCollection.findOne({ _id: mongocall.ObjectID(id) }); 
        if (result === null) throw `No comment with that id : ${id}`;
        result._id = result._id.toString();
    
        return result;
    },
    getAll: async () => {
      const booksCollection = await comments();
      const bookList = await booksCollection.find({},{ projection: { _id: 1, comment: 1 }}).toArray();
      return bookList;
    },

    async update(id, updatedbook) {
      const book = await this.get(id);
      console.log(book);
      let bookUpdateInfo = {
      subjectLine: updatedbook.subjectLine,
      comment: updatedbook.comment
      };
  
      const bookCollection = await comments();
      const updateInfo = await bookCollection.updateOne(
        { _id: mongocall.ObjectID(id) },
        { $set: bookUpdateInfo }
      );
      if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
        throw 'Update failed';
  
      return await this.get(id);
    },
    async remove(id) {
      if (!id) throw "You must provide an id to search for";
      const booksCollection = await comments();
      const deletionInfo = await booksCollection.removeOne({ _id: mongocall.ObjectID(id) });
      if (deletionInfo.deletedCount === 0) {
        throw `Could not delete Comment with id of ${id}`;
      }
    return {'CommentId': id.toString(), "deleted" : true}
    }
}