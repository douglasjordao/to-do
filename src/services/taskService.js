import { axiosInstance } from "./axios/axiosInstance";

const useTaskService = () => ({
  getTasks: async (page, pageSize) => {
    return axiosInstance.get('tasks', {
      params: {
        page,
        pageSize,
      },
    });
  },
  createTask: async (form) => {
    try {
      await axiosInstance.post('task', form);

      return true;
    } catch {
      return false;
    }
  },
});

export { useTaskService };
