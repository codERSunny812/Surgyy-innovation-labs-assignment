// src/components/Queue.jsx
import { dischargePatient } from "../api/api";

const Queue = ({ queue, onUpdate }) => {
    const handleDischarge = async (id) => {
        await dischargePatient(id);
        onUpdate();
    };

    return (
        <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Current Queue</h2>
            <ul className="space-y-2">
                {queue.map((p) => (
                    <li key={p.id} className="p-3 bg-gray-100 rounded shadow flex justify-between items-center">
                        <div>
                            <p><strong>{p.name}</strong> - Level {p.triageLevel}</p>
                            <p className="text-sm text-gray-500">Wait Time: {p.estimatedWaitTime}</p>
                        </div>
                        <button
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() => handleDischarge(p.id)}
                        >
                            Discharge
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Queue;
