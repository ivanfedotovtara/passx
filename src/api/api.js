import axios from "axios";

export function CategoriesList(user_id) {
  let categories;
  axios
    .post("/api/categories", {
      user_id,
    })
    .then((res) => {
      const data = res.data;
      categories = data.data;

      return categories;
    })
    .catch((err) => console.log(err));
}
