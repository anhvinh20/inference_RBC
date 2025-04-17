// resources/js/services/api.js
export function useItemsApi() {
  const getItems = async () => {
      try {
          const response = await fetch('/api/items');
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error fetching items:', error);
          throw error;
      }
  };

  return {
      getItems
  };
}

// Xuất các API khác nếu cần
export function useUsersApi() {
  const getUsers = async () => {
      // Logic fetching users
  };

  return {
      getUsers
  };
}