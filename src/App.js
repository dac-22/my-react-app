import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";

let getPostsFromApi = () => {
  let url = "http://localhost:4000/messages";
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
  let [message, setMessage] = useState("");
  let queryClient = useQueryClient();
  let queryResponse = useQuery("get-messages", getPostsFromApi, {});
  let { isLoading, error, isError, data } = queryResponse;

  let { mutate: addMessage } = useMutation(
    async (m1) => {
      let url = `http://localhost:4000/messages`;
      axios.post(url, {
        id: Math.floor(Math.random() * 1000),
        message: m1 || "hiiii",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("get-messages");
      },
    }
  );

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
      <input
        type="text"
        placeholder="Enter Messages"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="button"
        value="Add Message"
        onClick={() => addMessage(message)}
      />

      {data?.data.map((item, index) => (
        <div
          key={index}
          className="alert alert-primary m-0 my-1 text-capitalize"
        >
          {item?.message}
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
