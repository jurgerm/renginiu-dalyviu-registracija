const API_URL = `${process.env.REACT_APP_BASE_URL}/v1/dalyviai`;

export class DalyviaiApi {

    static async addDalyviai(dalyvis, token) {
        if (!dalyvis) throw new Error("No argument");
        const res = await fetch(
            `${API_URL}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(dalyvis),
        });
        console.log(dalyvis, token);

        return res.json();
    }

    static async getDalyviai(token) {
        const res = await fetch(
            `${API_URL}/`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                }
            }
        );

        return res.json();
    }

    static async updateDalyviai(dalyvis, token) {
        if (!dalyvis) {
            throw new Error("Nepaduotas dalyvis atnaujinimui.");
        }
        const res = await fetch(
            `${API_URL}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(dalyvis),
        });
        console.log(dalyvis, token);

        return res.json();
    }

    static async deleteDalyviai(dalyvis_id, token) {
        if (!dalyvis_id) throw new Error("No argument");
        const res = await fetch(
            `${API_URL}/${dalyvis_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        });
        console.log(dalyvis_id, token);

        return res.json();
    }


}
