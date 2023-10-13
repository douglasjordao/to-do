import { axiosInstance } from "./axios/axiosInstance";

const useTodoService = () => ({
  getTodos: async (page, pageSize) => {
    return axiosInstance.get('tasks', {
      params: {
        page,
        pageSize,
      },
    });
  },
});

export { useTodoService };
