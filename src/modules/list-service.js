module.exports = function ListService(DB) {
    const service = this;
    const db = DB;

    service.getAllLists = function() {
        let res = [];

        return new Promise((resolve, reject) => {
            db.all("SELECT id, name, is_starred FROM lists", (err, data) => {
                if(err) {
                    reject(err);
                }
                if(data && data.length>0) {
                    data.forEach(list => {
                        res.push({
                            id: list.id,
                            name: list.name,
                            isStarred: list.is_starred ? true : false
                        });
                    });
                }
                resolve(res);
            });
        });
    }

    service.createNewList = function(input) {
        return new Promise((resolve, reject) => {
            db.serialize(function(err) {
                if(err) {
                    reject(err);
                }
                db.run(`INSERT INTO lists (name, is_starred) VALUES ('${input.name}', false)`, function(err) {
                    reject(err);
                })
                resolve('Saved successfully');
            });
        });
    }

    service.updateList = function(input) {
        return new Promise((resolve, reject) => {
            db.serialize(function(err) {
                if(err) {
                    reject(err);
                }
                db.run(`UPDATE lists SET name='${input.name}' WHERE id=${input.id}`, function(err) {
                    reject(err);
                })
                resolve('Updated successfully');
            });
        });
    }

    service.starList = function(input) {
        return new Promise((resolve, reject) => {
            db.serialize(function(err) {
                if(err) {
                    reject(err);
                }
                db.run(`UPDATE lists SET is_starred=${input.isStarred} WHERE id=${input.id}`, function(err) {
                    reject(err);
                })
                resolve('Updated successfully');
            });
        });
    }

    service.deleteList = function(input) {
        return new Promise((resolve, reject) => {
            db.serialize(function(err) {
                if(err) {
                    reject(err);
                }
                db.run(`DELETE FROM lists WHERE id=${input.id}`, function(err) {
                    reject(err);
                })
                resolve('Deleted successfully');
            });
        });
    }
}
