# Travel Agent

The travel agent application built with Vite, React, and TailwindCSS. It allows users to plan trips by entering details such as departure city, destination city, travel dates, budget, and number of travelers. It fetches weather, flight, and hotel information using the OpenAI API and OpenWeatherMap API.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm
- You have API keys for OpenAI and OpenWeatherMap

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/jacky-xbb/travel-agent
cd travel-agent
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root of the project and add your API keys:

```plaintext
VITE_OPENAI_API_KEY=your-openai-api-key
VITE_OPENAI_BASE_URL=https://api.openai.com/v1
VITE_WEATHER_API_KEY=your-openweathermap-api-key
```

4. **Start the development server:**

```bash
npm run dev
```

5. **Open your browser and navigate to:**

```
http://localhost:5173
```

## Project Structure

```
src/
├── components/
│   └── TravellerCounter.jsx
├── pages/
│   ├── Plan.jsx
│   └── Suggestion.jsx
├── utils/
│   ├── openai.js
│   ├── tools.js
│   └── weather.js
├── App.jsx
├── main.jsx
└── index.css
```

## Components

### TravellerCounter

Component for incrementing and decrementing the number of travelers.

### Plan Page

Page for users to input trip details such as departure city, destination city, travel dates, budget, and number of travelers.

### Suggestion Page

Page for displaying trip suggestions including weather, flight, and hotel information.

### OpenAI and Weather Utilities

Utility modules for interacting with the OpenAI API and fetching weather data from the OpenWeatherMap API.

## Contributing

Contributions are always welcome! Please create a pull request or submit an issue to this repository.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
