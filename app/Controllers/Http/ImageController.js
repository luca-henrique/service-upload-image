"use strict";

const Drive = use("Drive");
const File = use("App/Models/Image");

class ImageController {
  async store({ request, response }) {
    await request.multipart
      .file("image", {}, async (file) => {
        const ContentType = file.subtype;
        const ACL = "public-read";
        const key = `${(Math.random() * 100).toString(32)}- ${file.clientName}`;

        const url = await Drive.put(key, file.stream, {
          ContentType,
        });

        await File.create({
          nome: file.clientName,
          key,
          url,
          content_type: ContentType,
        });
      })
      .process();
  }

  async findByName({ params, request, response }) {
    const { name } = request.all();
    console.log(name);

    const file = await File.findBy("nome", name);
    console.log(file);

    response.implicitEnd = false;

    response.header("Content-Type", `image/${file.content_type}`);

    const stream = await Drive.getStream(file.key);

    console.log(stream);

    stream.pipe(response.response);
  }
}

module.exports = ImageController;
