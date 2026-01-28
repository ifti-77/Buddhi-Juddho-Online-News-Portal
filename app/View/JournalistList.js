"use client"

import { changeStatusOfJournalistIntoDB, DeleteJournalistFromDB, getAllJournalist } from "@/lib/journalistInteractions";
import { useEffect, useState } from "react"

export default function JournalistList() {

    const [journalists, setJournalists] = useState([]);

    useEffect(() => {
        async function fetchJournalists() {
            // "use server"
            const response = await getAllJournalist();
            const data = await response
            setJournalists(data);
        }
        fetchJournalists();
    }, []);

    const handleStatusChange = async (journalistId, newStatus) => {
        const response = await changeStatusOfJournalistIntoDB(journalistId, newStatus);
        if (response) {
            journalists.forEach(journalist => {
                if (journalist._id === journalistId) {
                    journalist.status = newStatus;
                }
            });

            setJournalists([...journalists]);
            alert(`Journalist ${newStatus === 'active' ? 'activated' : 'blocked'} successfully.`);
        }
    }

    const DeleteJournalist = async (journalistId) => {
        const response = await DeleteJournalistFromDB(journalistId)
        if (response) {
            const updatedJournalistList = journalists.filter(item => item._id !== journalistId);
            setJournalists(updatedJournalistList);
            alert("Journalist deleted successfully.");
        }
    }
    return (
        <div>
            <label>Journalist List</label>
            <ul>
                {journalists.map(journalist => (
                    <div key={journalist._id}>
                        <li key={journalist._id}>{journalist.name} - {journalist.role} - {journalist.status}
                            {journalist.status === "active" && <button onClick={() => confirm("Are you sure you want to block this journalist?") && handleStatusChange(journalist._id, 'block')}>Block</button>}
                            {journalist.status === "block" && <button onClick={() => confirm("Are you sure you want to activate this journalist?") && handleStatusChange(journalist._id, 'active')}>activate</button>}
                            <button onClick={() => confirm("Are you sure you want to delete this journalist?") && DeleteJournalist(journalist._id)}>Delete</button>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}
