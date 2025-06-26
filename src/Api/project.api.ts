import axiosInstance from "@/lib/axios";


export const fetchAllProjects = async () => {
  const response = await axiosInstance.get("/project/all");
  return response.data;
};

export const deleteProjectApi = async (projectId: string) => {
  const response = await axiosInstance.delete(`/delete/${projectId}`);
  return response.data;
};