import { Toolbar, AppBar, Typography } from "@mui/material";
import { Fragment } from "react";
import { Avatar } from "@mui/material";
function TopBar() {
  let drawerWidth = 270;
  return (
    <Fragment>
      <div>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar className="fw-bold d-flex align-items-between justify-content-between">
            <h5>Welcome To Developer Hub</h5>
            <Avatar alt="Client" src={localStorage.getItem('userProfilePic')} />
          </Toolbar>
        </AppBar>
      </div>
    </Fragment>
  );
}

export default TopBar;
