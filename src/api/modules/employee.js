// 员工管理相关接口
import request from '../request';

export const getEmployeeList = (params) => request.get('/employee/list', { params });
export const addEmployee = (data) => request.post('/employee/add', data);
export const updateEmployee = (id, data) => request.put(`/employee/${id}`, data);
export const deleteEmployee = (id) => request.delete(`/employee/${id}`);
export const getEmployeeDetail = (id) => request.get(`/employee/${id}`);
