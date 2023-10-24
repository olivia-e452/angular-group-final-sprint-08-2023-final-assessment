const API_ROOT = 'http://localhost:8080/'


// may need token?
export default async function fetchFromAPI(method: string, endpoint: string, body: any) {
    let url = `${API_ROOT}${endpoint}`
    let options: any = { 
        method, 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    console.log("options", options, "url", url)
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return data
    } catch (error) {
        console.error(error)
    }
}