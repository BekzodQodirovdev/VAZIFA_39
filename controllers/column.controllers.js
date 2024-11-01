import pool from "../db/db.js";


export async function createColumn(req, res, next) {
  try {
    const { name, column_id } = req.body;
    if (!name || !column_id)
      return res.status(400).send("Please enter all fields!");


    const newData = await pool.query(
      "INSERT INTO columns (name, column_id) VALUES ($1, $2) RETURNING *",
      [name, column_id]
    );

    if (newData.rows.length !== 1)
      return res.status(500).send("Some error on server!");

    res.status(200).send({
      message: "Created",
      user: newData.rows[0],
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllColumn(req, res, next) {
  try {
    const getData = await pool.query("SELECT * FROM columns");
    
    res.status(200).send({
      status: "Success",
      data: getData.rows,
    });
  } catch (error) {
    next(error);
  }
}

export async function searchColumn(req, res, next) {
  try {
    const key = Object.keys(req.query)[0]
    const value = Object.values(req.query)[0]
    
    const searchData = await pool.query(
      `SELECT * FROM columns WHERE ${key} ILIKE '%${value}%'`
    );
    res.status(200).send({
      status: "Success",
      data: searchData.rows,
    });
  } catch (error) {
    next(error);
  }
}

export async function getColumnById(req, res, next) {
  try {
    const id = req.params.id;
    const data = await pool.query("SELECT * FROM columns WHERE id=$1", [id]);
    res.status(200).send({
      status: "Found",
      data: data.rows[0],
    });
  } catch (error) {
    next(error);
  }
}

export async function updateColumn(req, res, next) {
  try {
    const id = req.params.id;
    const { name, column_id } = req.body;

    const data = await pool.query("SELECT * FROM columns WHERE id=$1", [id]);
    if (!data.rows.length) {
      return res.status(404).send("Column was not found!");
    }

    const editData = await pool.query(
      "UPDATE columns SET name=$1, column_id=$4 updatedAt=$2 WHERE id=$3 RETURNING *",
      [
        name || data.rows[0].name,
        new Date(),
        id,
        column_id
      ]
    );

    if (editData.rows.length !== 1)
      return res.status(500).send("Some error on server!");

    res.status(200).send({
      message: "Updated",
      data: editData.rows[0],
    });
  } catch (error) {
    next(error);
  }
}

export async function removeColumn(req, res, next) {
  try {
    const id = req.params.id;
    const oldData = await pool.query("SELECT * FROM columns WHERE id=$1", [id]);

    if (!oldData.rows.length) {
      return res.status(404).send("Column was not found!");
    }

    const data = await pool.query(
      "DELETE FROM columns WHERE id=$1 RETURNING *", [id]
    );

    res.status(200).send({
      status: "Deleted",
      user_id: data.rows[0],
    });
  } catch (error) {
    next(error);
  }
}