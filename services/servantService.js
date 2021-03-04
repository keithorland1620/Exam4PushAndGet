const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../db.json');
const db = lowdb(adapter);

db.defaults({ servants: [] }).write();


exports.get = (name) => {

    if (name !== null) {
        // TODO: Return the requested servant only
        // Use .find or filter
        return db
                    .get('servants')
                    .filter((_) => _.name === name)
                    .value();
    }
    return db.get('servants').value();
};


exports.update = (servant) => {

    db.get('servants').find({name: "BB" }).update(servant).write();

    return servant;
};

exports.insert = (servant) => {
    const { name } = servant;
    const isServantExist =
        db
            .get('servants')
            .value()
            .filter((_) => _.name === name).length > 0;

    if (isServantExist) {
        return {
            success: false,
            errorMessage: `Servant ${name} alredy exist`,
        };
    }

    db.get('servants').push(servant).write();

    return {
        success: true,
    };
};



exports.delete = (name) => {

    const isServantExist =
        db
            .get('servants')
            .value()
            .filter((_) => _.name === name).length > 0;

    if (!isServantExist) {
        return {
            success: false,
            errorMessage: `${name} doesn't exist`,
        };
    }

    const servants = db.get('servants').value();

    db.set(
        'servants',
        servants.filter((_) => _.name !== name)
    ).write();

    if (db.get('servants').value().length === servants.length) {
        return {
            success: false,
            errorMessage: `Unable to delete ${name}`,
        };
    }

    return {
        success: true,
    };
};
