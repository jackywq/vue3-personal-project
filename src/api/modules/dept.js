// 部门管理相关接口
import request from '../request';

export const getDeptList = (params) => request.get('/dept/list', { params });
export const addDept = (data) => request.post('/dept/add', data);
export const updateDept = (id, data) => request.put(`/dept/${id}`, data);
export const deleteDept = (id) => request.delete(`/dept/${id}`);
