import axios from "axios";
import { useEffect, useState } from "react";

function Github() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, isLoading] = useState(true);

  const handleSearch = async () => {
    console.log(query);
    const config = {
      url: `https://api.github.com/search/users?q=${query}`,
      method: "get",
    };
    return axios(config)
      .then((res) => {
        console.log(res.data.items);
        setUsers(res.data.items);
        isLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   useEffect(() => {

  //   }, []);

  return (
    <>
      <h3>Github Users</h3>
      <div>
        <input
          onChange={(e) => setQuery(e.target.value)}
          placeholder=" Search here"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <h3>...loading</h3>
      ) : (
        <div style={{ margin: "auto", width: "600px" }}>
          <h3>Obtained Results</h3>
          {users.map((item) => {
            return (
              <div
                key={item.id}
                style={{
                  border: "1px solid black",
                  //   width: "200px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  margin: "1rem",
                }}
              >
                <img src={item.avatar_url} style={{ width: "10%" }} />
                <div
                  style={{
                    gap: "1rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h5>Username:{item.login}</h5>
                  <a href={item.followers_url}>Link to followers </a>
                  <a href={item.following_url}>Link to following</a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
export default Github;
