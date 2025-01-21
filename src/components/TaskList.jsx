import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Chip,
} from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Ensure the path is correct

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth(); // Access user from AuthContext

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      if (!token) {
        throw new Error('No token found'); // Handle case where token is missing
      }
      const response = await axios.get('https://dtodo-server.onrender.com/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Handle 401 Unauthorized specifically
      if (error.response && error.response.status === 401) {
        // Optionally redirect to login or show a message
        alert('Unauthorized! Please log in again.');
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`https://dtodo-server.onrender.com/api/tasks/${taskId}`, {
        status: newStatus,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleAddComment = async (taskId) => {
    if (!newComment.trim()) return; // Prevent adding empty comments
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://dtodo-server.onrender.com/api/comments', {
        taskId,
        content: newComment,
        author: user?.name || 'User', // Use actual user name
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewComment('');
      fetchComments(taskId);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const fetchComments = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://dtodo-server.onrender.com/api/comments/task/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(prev => ({ ...prev, [taskId]: response.data }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      'in-progress': 'info',
      completed: 'success',
    };
    return colors[status] || 'default';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} key={task._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {task.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Assigned to: {task.assignedTo}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {task.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={task.status}
                    color={getStatusColor(task.status)}
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Due: {format(new Date(task.dueDate), 'PPP')}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleStatusChange(task._id, 'in-progress')}
                    sx={{ mr: 1 }}
                  >
                    Start
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleStatusChange(task._id, 'completed')}
                  >
                    Complete
                  </Button>
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{ mb: 1 }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleAddComment(task._id)}
                  >
                    Add Comment
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TaskList;