import axios from "axios";
import { useQuery } from "react-query";

let getPostsFromApi = () => {
  let url = "https://jsonplaceholder.typicode.com/posts";
  return axios.get(url);
};

function App() {
  let queryResponse = useQuery("GET-POSTS", getPostsFromApi);
  let { isLoading, data } = queryResponse;

  console.log(queryResponse);

  if (isLoading) {
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
