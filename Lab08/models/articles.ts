import * as db from '../helpers/database';

export const getById = async (id: any) => {
    let query = 'Select * From articles where ID = ?';
    let value = [id];
    let data = await db.run_query(query, value);
    return data;
}

export const getAll = async()=> {
    let query = 'Select * from articles';
    let data = await db.run_query(query, null);
    return data;
}

export const add = async(article: any) => {
    let keys = Object.keys(article);
    let values = Object.values(article);
    let key = keys.join(',');
    let param = '';
    for (let i: number = 0; i < values.length; i++) { param += '?,'}
    param = param.slice(0,-1);
    let query = `Insert into articles (${key}) values (${param})`;
    try {
        await db.run_insert(query, values);
        return {status: 201};
    } catch (err: any) {
        return err;
    }
}

export const update = async(id: number, article: any) => {
    if (!Object.keys(article).length) {
        // Return 400 Bad Request if no fields are provided to update
        return { status: 400, message: "No fields to update" };
    }
    let keys = Object.keys(article);
    let values = Object.values(article);
    let sql = 'UPDATE articles SET ';
    for (let i: number = 0; i < keys.length; i++) { 
        sql += `${keys[i]} = ?,`;
    }
    sql = sql.slice(0,-1);
    sql += ` where id = ?`;

    values.push(id);

    console.log("Generated SQL:", sql); // Log the SQL query
    console.log("Values:", values); // Log the values

    try {
        const status = await db.run_update(sql, values);
        if(status[1] == 1) { // Return 1 if the ID found, else 404
            return {status: 201};
        } else {
            return {status: 404, message: "Article not found" };
        }
    } catch (err: any) {
        console.error("Error updating article:", err);
        return { status: 500, message: "Internal Server Error" };
    }
}

export const deleteArticle = async(id: number) => {
    try {
        await db.run_delete('articles', 'id', id);
        return
    } catch (err: any) {
        return err;
    }
}