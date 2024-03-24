import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

const UserList = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterUser, SetFilterUser] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await fetch("https://api.github.com/users");
        if (!response.ok) {
          throw new Response("Something went wrong!");
        }
        const userData = await response.json();
        setUserInfo(userData);
        SetFilterUser(userData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    };
    getUserDetails();
  }, []);
  const userSearchHandler = (e) => {
    setLoading(true);
    const searchUserList = userInfo.filter((user) =>
      user.login.toLowerCase().includes(e.target.value.toLowerCase())
    );
    SetFilterUser(searchUserList);
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <h1 style={{ margin: "2rem auto", textAlign: "center", color: "red" }}>
          Oops!Something went wrong. Please try again later.
        </h1>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "#1A2238",
          }}
        >
          <TextField
            onChange={userSearchHandler}
            placeholder="Search user..."
            variant="standard"
            sx={{
              padding: "15px",
              width: "40.5%",
              borderRadius: "8px",
              background: "#ede7e1",
              margin: "10px 0",
            }}
          ></TextField>
          <Card
            sx={{
              minWidth: "43%",
              boxShadow: 4,
              borderRadius: 2,
              overflow: "auto",
              height: "100vh",
              background: "#ede7e1",
            }}
          >
            {filterUser.length > 0 ? (
              <CardContent sx={{ background: "#ede7e1", position: "relative" }}>
                <List>
                  {filterUser.map((user) => (
                    <ListItem
                      key={user.id}
                      component={Link}
                      to={`/users/${user.login}`}
                      sx={{
                        margin: "5px",
                        boxShadow: 3,
                        borderRadius: "8px",
                        background: "#7e5645",
                        "&:hover": {
                          backgroundColor: "#d8cbc4",
                          borderRadius: "8px",
                          ".MuiListItemText-root": {
                            color: "black",
                          },
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={user.login}
                          src={user.avatar_url}
                          sx={{ width: 70, height: 70, marginRight: "20px" }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.login}
                        sx={{
                          color: "#FFFFFF",
                          ".MuiListItemText-primary": {
                            fontSize: "18px",
                            fontWeight: 400,
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            ) : (
              <Typography
                sx={{
                  position: "absolute",
                  top: "60%",
                  left: "43%",
                  fontSize: "20px",
                  fontWeight: 700,
                }}
              >
                No records found.
              </Typography>
            )}
          </Card>
        </Box>
      )}
    </>
  );
};

export default UserList;
