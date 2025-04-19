// src/components/PatientForm.jsx
import { useState } from "react";
import { addPatient } from "../api/api";

const PatientForm = ({ onUpdate }) => {
    const [name, setName] = useState("");
    const [triageLevel, setTriageLevel] = useState(1);

    const submit = async (e) => {
        e.preventDefault();
        if (!name || triageLevel < 1 || triageLevel > 5) return;
        await addPatient({ name, triageLevel: Number(triageLevel) });
        onUpdate();
        setName("");
        setTriageLevel(1);
    };

    return (
        <form onSubmit={submit} className="bg-white shadow p-4 rounded space-y-4 my-4">
            <h2 className="text-lg font-semibold">Add Patient</h2>
            <input
                className="border w-full p-2"
                placeholder="Patient Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <select
                className="border w-full p-2"
                value={triageLevel}
                onChange={(e) => setTriageLevel(e.target.value)}
            >
                {[1, 2, 3, 4, 5].map((lvl) => (
                    <option key={lvl} value={lvl}>
                        Triage Level {lvl}
                    </option>
                ))}
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
                Add
            </button>
        </form>
    );
};

export default PatientForm;
