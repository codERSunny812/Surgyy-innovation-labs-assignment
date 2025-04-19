// src/api/api.js
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    withCredentials: true,
});

export const addPatient = (data) => API.post("/patient/add-patient", data);
export const getPatients = () => API.get("/patient/get-patient");
export const treatNextPatient = (id) => API.put(`/patient/${id}/treat`);
export const dischargePatient = (id) => API.delete(`/patient/${id}`);
