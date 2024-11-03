import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useUserList } from '../hooks/useUserList';
import { Button, IconButton, TextField } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

export const Route = createFileRoute('/')({
  component: () => {
    const [newUserName, setNewUserName] = useState('');
    const { users, isLoading, error, toggleFetch, addUser, removeUser, isModified } = useUserList();

    const handleAddUser = () => {
      if (newUserName.trim()) {
        addUser(newUserName);
        setNewUserName('');
      }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleAddUser();
    };

    return (
      <div className="flex flex-col justify-center items-center min-h-screen" style={{ backgroundColor: '#f3e5f5' }}>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <div className="flex items-center space-x-2">
              <GroupIcon sx={{ color: '#6a1b9a' }} />
              <h2 className="text-2xl font-bold" style={{ color: '#6a1b9a' }}>User List</h2>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleFetch}
              sx={{ fontWeight: 'bold', marginBottom: 2 }}
              startIcon={<ReplayCircleFilledIcon />}
            >
              {isModified ? 'Reset List' : 'Fetch List'}
            </Button>
          </div>

          <div className="max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {isLoading ? (
              <p>Loading users...</p>
            ) : error ? (
              <p style={{ color: '#d32f2f' }}>Error loading users</p>
            ) : (
              <ul className="list-disc list-inside text-center space-y-2">
                {users.map((user) => (
                  <li key={user.id} className="flex justify-between items-center text-lg">
                    {user.name}
                    <IconButton
                      onClick={() => removeUser(user.id)}
                      sx={{ color: 'secondary.main' }}
                      aria-label="delete user"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form onSubmit={handleFormSubmit} className="flex items-center mt-4">
            <TextField
              variant="outlined"
              label="Add new user"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              fullWidth
              sx={{ mr: 2 }}
            />
            <IconButton
              type="submit"
              color="secondary"
              aria-label="add user"
            >
              <AddCircleIcon />
            </IconButton>
          </form>
        </div>
      </div>
    );
  },
});
