module.exports = function InitDB(DB) {
    const service = this;
    const db = DB;

    service.createTables = function(input) {
        return new Promise((resolve, reject) => {
            db.serialize(function(err) {
                if(err) {
                    reject(err);
                }
                if(input && input.recreate===true) {
                    db.run("DROP TABLE IF EXISTS lists");
                    db.run("DROP TABLE IF EXISTS tasks");
                }
                db.run("CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar, is_starred boolean)", function(err) {reject(err)});
                db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, list_id INTEGER, message varchar, is_complete boolean, FOREIGN KEY(list_id) REFERENCES lists(id) ON DELETE CASCADE)", function(err) {reject(err)});
                resolve(true);
            });
        });
    }
}
