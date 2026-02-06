


export async function getAllJournalist() {
    const allJournalists = await fetch(`/api/journalists/available`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
    }).then(res => res.json());

    return allJournalists;
}

export async function changeStatusOfJournalistIntoDB(journalistID, status) {
    try {
        const journalist = await fetch(`/api/journalists/update/status/`, {
            method: 'PUT',
            body: JSON.stringify({ _id: journalistID, status: status }),
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await journalist.json();
        if (!result.success) return false;
        return true;

        // console.log('Updating journalist in DB with data:', journalistData);
    } catch (error) {
        console.error('Error changing journalist in DB:', error);
        throw error;
    }
}

export async function DeleteJournalistFromDB(journalistID) {
    try {

        const journalist = await fetch(`/api/journalists/delete`, {
            method: 'DELETE',
            body: JSON.stringify({ _id: journalistID }),
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await journalist.json();
        if (!result.success) return false;
        return true;

        // console.log('Delete journalist in DB with data:', journalistID);
    } catch (error) {
        console.error('Error deleting journalist in DB:', error);
        throw error;
    }
}

