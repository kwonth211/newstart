import React, { useState } from "react"
import { Button, AppBar, IconButton, Toolbar, Typography } from "@material-ui/core"
import { Route, Link } from "react-router-dom"
// import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme, fade } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 2,
      // color: "red",
      color: "primary",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: "wrap",
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
      textDecoration: "none",
    },
  })
)
function Header() {
  const classes = useStyles()

  return (
    <div style={{ backgroundColor: "red" }} className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" noWrap className={classes.toolbarTitle}>
            <Link className={classes.link} to="/">
              Company name
            </Link>
          </Typography>
          <nav>
            <Link variant="button" href="#" className={classes.link}>
              Features
            </Link>
            <Link variant="button" href="#" className={classes.link}>
              Enterprise
            </Link>
            <Link variant="button" href="#" className={classes.link}>
              Support
            </Link>
          </nav>
          <Button href="/login" variant="outlined" className={classes.link}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Header
