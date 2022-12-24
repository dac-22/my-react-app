import axios from "axios";
import { useQuery } from "react-query";

function App() {
  let url = "https://jsonplaceholder.typicode.com/posts";
  let { isFetching, data } = useQuery("GET-POSTS", () => {
    return axios.get(url);
  });
  console.log(isFetching, data);

  if (isFetching) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      {data?.data.map((item, index) => (
        <div
          key={index}
          className="alert alert-primary m-0 my-1 text-capitalize"
        >
          {item?.title}
        </div>
      ))}
    </div>
  );
}

export default App;
