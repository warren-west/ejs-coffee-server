require('dotenv').config()

// (Revealing) Module pattern
const apiHelper = {
    coffees: [],
    getCoffeeData: async function() {
        try {
            console.log("Fetching coffee data from API")
            const resp = await fetch(process.env.API_URL)
            const data = await resp.json()
    
            this.coffees = data
        } catch(ex) {
            console.log(ex.message)
        }
    }
}

module.exports = apiHelper