import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
const db = sql("meals.db");
export default function getMeals() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  //   throw new Error("Loading meals failed")
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug=?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split(".").pop(); //To get the extension(eg: jpeg/png etc..)
  const fileName = `${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`); // To store the images in the public folder
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  meal.image = `/images/${fileName}`;
  console.log(meal);
  db.prepare(
    `INSERT INTO meals (title,summary,instructions,creator, creator_email,image,slug)
    VALUES(@title,@summary,@instructions,@creator,@creator_email,@image,@slug) `
  ).run(meal); //@title,@summary are replaced by input object meal
}
