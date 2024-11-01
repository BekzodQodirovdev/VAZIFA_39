import pool from "../db/db.js";


export async function createBoard(req, res, next) {
  try {
    const { title, columns } = req.body;
    if (!title || ! columns)
      return res.status(400).send("Please enter all fields!");


    const newData = await pool.query(
      "INSERT INTO boards (title, columns) VALUES ($1, $2) RETURNING *",
      [title, columns]
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

export async function getAllBoards(req, res, next) {
  try {
    const getData = await pool.query("SELECT * FROM boards");
    
    res.status(200).send({
      status: "Success",
      data: getData.rows,
    });
  } catch (error) {
    next(error);
  }
}

export async function searchBoard(req, res, next) {
  try {
    const key = Object.keys(req.query)[0]
    const value = Object.values(req.query)[0]
    
    const searchData = await pool.query(
      `SELECT * FROM boards WHERE ${key} ILIKE '%${value}%'`
    );
    res.status(200).send({
      status: "Success",
      data: searchData.rows,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBoardById(req, res, next) {
  try {
    const id = req.params.id;
    const data = await pool.query("SELECT * FROM boards WHERE id=$1", [id]);
    res.status(200).send({
      status: "Found",
      data: data.rows[0],
    });
  } catch (error) {
    next(error);
  }
}

export async function updateBoard(req, res, next) {
  try {
    const id = req.params.id;
    const { title, columns } = req.body;

    const data = await pool.query("SELECT * FROM boards WHERE id=$1", [id]);
    if (!data.rows.length) {
      return res.status(404).send("Board was not found!");
    }
    const oldBoard = data.rows[0]

    const editData = await pool.query(
      "UPDATE boards SET title=$1, columns=$2 updatedAt=$3 WHERE id=$4 RETURNING *",
      [
        title || oldBoard.title,
        columns || oldBoard.columns,
        new Date(),
        id,
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

export async function removeBoard(req, res, next) {
  try {
    const id = req.params.id;
    const oldData = await pool.query("SELECT * FROM boards WHERE id=$1", [id]);

    if (!oldData.rows.length) {
      return res.status(404).send("board was not found!");
    }

    const data = await pool.query(
      "DELETE FROM boards WHERE id=$1 RETURNING *", [id]
    );

    res.status(200).send({
      status: "Deleted",
      user_id: data.rows[0],
    });
  } catch (error) {
    next(error);
  }
}