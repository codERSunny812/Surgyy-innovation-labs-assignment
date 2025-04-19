// src/Pages/Home.jsx
import { useEffect, useState } from "react";
import { getPatients, treatNextPatient } from "../api/api";
import PatientForm from "../components/PatientForm";
import Queue from "../components/Queue";
import socket from "../socket";
// import { io } from "socket.io-client";



const Home = () => {
    const [queue, setQueue] = useState([]);
    const [alert, setAlert] = useState("");


    // Home.jsx (at the top, inside the component)
    const handleLogout = async () => {
        await fetch("http://localhost:4000/api/v1/patient-auth/logout", {
            credentials: "include",
        });
        window.location.href = "/signin";
    };


    

    const fetchPatients = async () => {
        const { data } = await getPatients();
        setQueue(data.data);
    };

    const handleTreat = async () => {
        if (queue.length === 0) return;
        await treatNextPatient(queue[0].id);
        fetchPatients();
    };

    useEffect(() => {
        fetchPatients();

        socket.on("connect", () => {
            console.log("✅ Connected to socket:", socket.id);
        });

        socket.onAny((event, ...args) => {
            console.log("📡 Received Event:", event, args);
        });


        socket.on("updateQueue", (data) => {
            console.log("updateQueue:", data);
            setQueue(data);
        });

        socket.on("criticalAlert", (payload) => {
            console.log("criticalAlert:", payload);
            setAlert(payload.message);
            setTimeout(() => setAlert(""), 4000);
        });

        socket.on("staffAlert", (payload) => {
            console.log("staffAlert:",payload);
            setAlert(payload.message);
            setTimeout(() => setAlert(""), 4000);
        });

        return () => {
            window.addEventListener("beforeunload", () => {
                socket.disconnect();
            });
        };
    }, []);

    return (
        <div className=" p-6 w-full mx-auto">

            <header className="flex items-center justify-between mb-4">

                <span>
                    Patient manage
                </span>

                <button
                    className="float-right bg-gray-800 text-white px-5 py-2 rounded"
                    onClick={handleLogout}
                >
                    Logout
                </button>


            </header>
           
            

            {alert && <div className="bg-red-200 text-red-800 p-3 mb-4 rounded">{alert}</div>
            }


            <PatientForm onUpdate={fetchPatients} />
            <button
                onClick={handleTreat}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
                Treat Next Patient
            </button>
            <Queue queue={queue} onUpdate={fetchPatients} />
        </div>
    );
};

export default Home;
