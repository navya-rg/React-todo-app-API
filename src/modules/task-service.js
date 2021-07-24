module.exports = function TaskService(DB) {
    const service = this;
    const db = DB;

    service.getAllTasks = function() {
        let res = [];

        return new Promise((resolve, reject) => {
            db.all(`SELECT id, list_id, message, is_complete FROM tasks`, (err, data) => {
                if(err) {
                    reject(err);
                }
                if(data && data.length>0) {
                    data.forEach(task => {
                        res.push({
                            id: task.id,
                            listId: task.list_id,
                            message: task.message,
                            isComplete: task.is_complete ? true : false
                        });
                    });
                }
                resolve(res);
            });
        });
    }

    service.getTasks = function(input) {
        let res = [];

        return new Promise((resolve, reject) => {
            db.all(`SELECT id, list_id, message, is_complete FROM tasks WHERE list_id=${input.listId}`, (err, data) => {
                if(err) {
                    reject(err);
                }
                if(data && data.length>0) {
                    data.forEach(task => {
                        res.push({
                            id: task.id,
                            listId: task.list_id,
                            message: task.message,
                            isComplete: task.is_complete ? true : false
                        });
                    });
                }
                resolve(res);
            });
        });
    }


    service.createNewTask = function(input) {
        return new Promise((resolve, reject) => {
            db.serialize(function(err) {
                if(err) {
                    reject(err);
                }
                var stmt = db.prepare("INSERT INTO tasks (list_id, message, is_complete) VALUES (?,?,?)");
                stmt.run(input.listId, input.message, false, function(err) {
                    reject(err);
                });
                stmt.finalize();
                resolve('Saved successfully');
            });
        });
    }

    service.updateTask = function(input) {
        return new Promise((resolve, reject) => {
            db.serialize(function(err) {
                if(err) {
                    reject(err);
                }
                db.run(`UPDATE tasks SET message='${input.message}' WHERE id=${input.id}`, function(err) {
                    reject(err);
                })
                resolve('Updated successfully');
            });
        });
    }

    service.completeTask = function(input) {
        return new Promise((resolve, reject) => {
            db.serialize(function(err) {
                if(err) {
                    reject(err);
                }
                db.run(`UPDATE tasks SET is_complete=${input.isComplete} WHERE id=${input.id}`, function(err) {
                    reject(err);
                })
                resolve('Updated successfully');
            });
        });
    }

    service.deleteTask = function(input) {
        return new Promise((resolve, reject) => {
            db.serialize(function(err) {
                if(err) {
                    reject(err);
                }
                db.run(`DELETE FROM tasks WHERE id=${input.id}`, function(err) {
                    reject(err);
                })
                resolve('Deleted successfully');
            });
        });
    }
}
