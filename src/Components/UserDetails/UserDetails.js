import { useLoaderData, useNavigation } from "react-router-dom";
import {
  ListItem,
  Avatar,
  ListItemText,
  List,
  Typography,
  Box,
} from "@mui/material";
import Spinner from "../Spinner/Spinner";

const styles = {
  display: "inline-flex",
  ".MuiListItemText-primary": {
    fontWeight: 600,
    textDecoration:"underline",
  },
  ".MuiListItemText-secondary": {
    fontSize: "17px",
    color: "#FFFFFF",
    paddingLeft:"5px"
  },
};
const UserDetails = () => {
  const navigation = useNavigation();
  const { name, company, location, email, bio, avatar_url } = useLoaderData();
  return (
    <>
      {navigation.state === "loading" ? (
        <Spinner />
      ) : (
        <Box
          sx={{
            boxSizing: "border-box",
            padding: "20px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
            overflow: "auto",
            background: "#FDF5DF",
          }}
        >
          <Avatar
            alt={name}
            src={avatar_url}
            sx={{ width: 150, height: 150, marginBottom: "15px" }}
          />
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            {name}
          </Typography>
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "#F92C85",
              borderRadius: "8px",
              color: "#ffffff",
              width: "35%",
              marginTop: "10px",
              padding: "20px",
            }}
          >
            <ListItem sx={{ padding: "0" }}>
              <ListItemText
                primary={"Location:"}
                secondary={`${location ? location : "Not available"}`}
                sx={styles}
              />
            </ListItem>
            <ListItem sx={{ padding: "0" }}>
              <ListItemText
                primary={"Company:"}
                secondary={`${company ? company : "Not available"}`}
                sx={styles}
              />
            </ListItem>
            <ListItem sx={{ padding: "0" }}>
              <ListItemText
                primary={"Email:"}
                secondary={`${email ? email : "Not available"}`}
                sx={styles}
              />
            </ListItem>
            <ListItem sx={{ padding: "0" }}>
              <ListItemText
                primary={"Bio:"}
                secondary={`${bio ? bio : "Not available"}`}
                sx={styles}
              />
            </ListItem>
          </List>
        </Box>
      )}
    </>
  );
};

export async function loader({ params }) {
  const data = await fetch(`https://api.github.com/users/${params.id}`);
  return data.json();
}

export default UserDetails;
