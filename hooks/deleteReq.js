const useDelete = async (url, id, token) => {
    const config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
    }

    try {
        const res = await fetch(`https://hpms.vercel.app/api/${url}`, config);
        const json = await res.json();
        const data = json;
        return data;
    } catch (error) {
        console.log(error)
    }

};

export default useDelete;
