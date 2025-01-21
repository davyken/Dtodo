import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import TaskIcon from '@mui/icons-material/Task';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/"
          startIcon={<TaskIcon />}
        >
          Tasks
        </Button>
      
        <Button
          color="secondary"
          variant="contained"
          component={Link}
          to="/new-task"
        >
          New Task
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
