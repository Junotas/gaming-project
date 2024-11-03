import { useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

type User = {
  id: number;
  name: string;
};

// Fetch function to load data from JSON file
const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${import.meta.env.BASE_URL}src/assets/users.json`);
  if (!response.ok) throw new Error('Failed to fetch user data');
  return response.json();
};

export const useUserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModified, setIsModified] = useState(false);

  const { data: initialUsers, refetch, isLoading, error } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    enabled: false, // leaves control fetching manually
  }) as UseQueryResult<User[], Error>;

  const toggleFetch = () => {
    if (isModified) {
      setUsers(initialUsers || []);
      setIsModified(false);
    } else {
      refetch().then((result) => {
        if (result.data) setUsers(result.data);
      });
    }
  };

  const addUser = (name: string) => {
    setUsers((prev) => [...prev, { id: Date.now(), name }]);
    setIsModified(true);
  };

  const removeUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    setIsModified(true);
  };

  return { users, isLoading, error, toggleFetch, addUser, removeUser, isModified };
};
