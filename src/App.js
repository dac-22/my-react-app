import axios from "axios";
import { useQuery } from "react-query";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";

let getPostsFromApi = () => {
  let url = "https://jsonplaceholder.typicode.com/posts";
  return axios.get(url);
};

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Page1 /> },
        { path: "page2", element: <Page2 /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

function RootLayout() {
  return (
    <div>
      <Link to="/" className="fs-3">
        Page1
      </Link>
      <Link to="/page2" className="fs-3">
        Page2
      </Link>

      <Outlet />
    </div>
  );
}

function Page1() {
  let queryResponse = useQuery("GET-POSTS", getPostsFromApi, {
    cacheTime: 5000,
  });
  let { isLoading, error, isError, data } = queryResponse;

  console.log(queryResponse);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>Error while fetching data</h1>
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

function Page2() {
  return (
    <div>
      <h1>Page2</h1>
    </div>
  );
}

export default App;
