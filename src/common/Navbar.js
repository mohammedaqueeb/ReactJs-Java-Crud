import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },

  logo: {
    flexGrow: "0",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "17px",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          CTC
        </Typography>
        <div className={classes.navlinks}>
          <Link to="/" className={classes.link}>
            Dashboard
          </Link>
          <Link to="/domains" className={classes.link}>
            Domain
          </Link>
          {/* <Link to="/products" className={classes.link}>
              Product
            </Link> */}
          <Link to="/product-version" className={classes.link}>
            Product Version
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
