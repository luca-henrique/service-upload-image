"use strict";

const Schema = use("Schema");

class ImageSchema extends Schema {
  up() {
    this.create("images", (table) => {
      table.increments();

      table.string("nome");
      table.string("key");
      table.string("url");
      table.string("content_type");

      table.timestamps();
    });
  }

  down() {
    this.drop("images");
  }
}

module.exports = ImageSchema;
