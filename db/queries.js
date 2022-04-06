const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'Feer1985',
    database: 'likeme',
    port: 5432
});
//Funcion para registro de posts
const registroPost = async (datos) => {
    try {
        const consulta = {
            text: 'INSERT INTO posts (usuario, url, descripcion, likes) VALUES ($1, $2, $3, 0);',
            values: datos,
        }
        const result = await pool.query(consulta);
        return result;
    } catch (err) {
        console.log(`El error se encuentra en la tabla: ${err.table}.
        El detalle del error es: ${err.detail}.
        El código de error es: ${err.code}.
        Restricción violada: ${err.constraint}`);
    }
}
//Funcion para agregar likes
const agregarLikes = async (id) => {
    try {
        const result = await pool.query(`UPDATE posts SET likes = likes + 1 WHERE id = ${id}`);
        return result;
    } catch (err) {
        console.log(`El error se encuentra en la tabla: ${err.table}.
        El detalle del error es: ${err.detail}.
        El código de error es: ${err.code}.
        Restricción violada: ${err.constraint}`);
    }
}
//Funcion para obtener los posts registrados
const getPosts = async () => {
    try {
        const result = await pool.query('SELECT * FROM posts ORDER BY id ASC');
        return result;
    } catch (err) {
        console.log(`El error se encuentra en la tabla: ${err.table}.
        El detalle del error es: ${err.detail}.
        El código de error es: ${err.code}.
        Restricción violada: ${err.constraint}`);
    }
}

module.exports = {
    registroPost,
    getPosts,
    agregarLikes
}