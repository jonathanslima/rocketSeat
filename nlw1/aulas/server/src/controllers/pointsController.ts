import knex from "../database/connection";
import { Request as req, Response as res } from "express";

class PointsController {
  async show(request: req, response: res) {
    const { id } = request.params;
    const point = await knex("points").where("id", id).first();
    if (!point) {
      return response.status(400).json({ message: "Point not found!" });
    }

    return response.json(point);
  }

  async create(request: req, response: res) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const points = {
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await knex("points").insert(points);

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await knex("point_items").insert(pointItems);

    return response.json({
      id: point_id,
      ...points,
    });
  }
}

export default PointsController;
