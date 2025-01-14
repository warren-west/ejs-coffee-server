const COFFEE_API_URL = "https://thoughtful-vagabond-fibre.glitch.me/coffee"

// (Revealing) Module pattern
const apiHelper = {
    coffees: [],
    getCoffeeData: async function() {
        const resp = await fetch(COFFEE_API_URL)
        const data = await resp.json()

        this.coffees = data
    }
}

module.exports = apiHelper