export async function getStates() {
    const url = "https://api.sampleapis.com/thestates/the-states";

    const resp = await fetch(url);

    if (!resp.ok) {
        throw new Error("Failed to retrieve states")
    }
    const data = await resp.json();


    return data;
}

export async function getCityByZip(zip) {
    const url = `https://api.zippopotam.us/us/${zip}`;

    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Failed to retrieve city for ${zip}`)

    const data = await resp.json();
    return data;
}