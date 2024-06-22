import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { client } from '../utils/openai';
import { tools } from '../utils/tools';

// Initial system message for the OpenAI client
const messages = [
  {
    role: "system", content: `
      You are a helpful AI agent. Transform technical data into engaging,
      conversational responses, but only include the normal information a
      regular person might want unless they explicitly ask for more. Provide
      highly specific answers based on the information you're given. Prefer
      to gather information with the tools provided to you rather than
      giving basic, generic answers.
      `
  },
];

function Suggestion() {
  const location = useLocation(); // Get the location object from react-router
  const { state } = location; // Extract state from the location object
  const { flyingFrom, flyingTo, fromDate, toDate, budget, travelers } = state || {}; // Destructure state properties

  // State variables to store API responses
  const [weather, setWeather] = useState('');
  const [hotel, setHotel] = useState('');
  const [flights, setFlights] = useState('');
  const [loading, setLoading] = useState({ weather: true, flights: true, hotel: true }); // Loading states for each data type

  useEffect(() => {
    if (!state) {
      return; // Early return if state is missing
    }

    if (!flyingFrom || !flyingTo) {
      return; // Early return if essential data is missing
    }

    // Fetch weather information
    const fetchWeather = async () => {
      try {
        const weatherMessages = [
          ...messages,
          { role: "user", content: `Get the weather for ${flyingTo}` }
        ];
        const weatherRunner = client.beta.chat.completions.runTools({
          model: "gpt-4-1106-preview",
          messages: weatherMessages,
          tools
        }).on("message", (message) => console.log(message));
        const weatherContent = await weatherRunner.finalContent();
        setWeather(weatherContent); // Set weather state
      } catch (err) {
        console.error(err);
        setWeather('Failed to fetch weather'); // Handle error
      } finally {
        setLoading(prev => ({ ...prev, weather: false })); // Set loading state to false
      }
    };

    // Fetch flight information
    const fetchFlights = async () => {
      try {
        const flightMessages = [
          { role: "system", content: `You are a helpful agent.` },
          { role: "user", content: `I need flight options from ${flyingFrom} to ${flyingTo}.` }
        ];
        const response = await client.chat.completions.create({
          model: "gpt-4-1106-preview",
          messages: flightMessages
        });
        const flightContent = response.choices[0].message.content;
        setFlights(flightContent); // Set flights state
      } catch (err) {
        console.error(err);
        setFlights('Failed to fetch flights'); // Handle error
      } finally {
        setLoading(prev => ({ ...prev, flights: false })); // Set loading state to false
      }
    };

    // Fetch hotel information
    const fetchHotels = async () => {
      try {
        const hotelMessages = [
          { role: "system", content: `You are a helpful agent.` },
          { role: "user", content: `I need hotel options in ${flyingTo} for ${travelers} travelers within a budget of ${budget} dollars.` }
        ];
        const response = await client.chat.completions.create({
          model: "gpt-4-1106-preview",
          messages: hotelMessages
        });
        const hotelContent = response.choices[0].message.content;
        setHotel(hotelContent); // Set hotel state
      } catch (err) {
        console.error(err);
        setHotel('Failed to fetch hotels'); // Handle error
      } finally {
        setLoading(prev => ({ ...prev, hotel: false })); // Set loading state to false
      }
    };

    fetchWeather();
    fetchFlights();
    fetchHotels();

  }, [state, flyingFrom, flyingTo, travelers, budget]); // Dependencies for useEffect

  if (!state) {
    return <div>Error: Missing state</div>; // Error message if state is missing
  }

  return (
    <div className="flex flex-col items-center py-8 mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-bold text-center">Your Trip</h1>
      <div className="flex justify-between w-full mb-4">
        <div className="px-3 py-2 text-white bg-green-500 rounded-md">→ {format(new Date(fromDate), 'dd MMM yyyy')}</div>
        <div className="px-3 py-2 text-white bg-green-500 rounded-md">{format(new Date(toDate), 'dd MMM yyyy')} ←</div>
      </div>
      <div className="w-full p-4 mb-4 border rounded-md">
        <h2 className="text-xl font-bold">{flyingFrom} → {flyingTo}</h2>
      </div>
      <div className="w-full p-4 mb-4 border rounded-md">
        <h2 className="mb-2 text-xl font-bold">Weather</h2>
        <p>{loading.weather ? 'Fetching weather...' : weather}</p> {/* Display weather or loading message */}
      </div>
      <div className="w-full p-4 mb-4 border rounded-md">
        <h2 className="mb-2 text-xl font-bold">Flights</h2>
        <p>{loading.flights ? 'Fetching flights...' : flights}</p> {/* Display flights or loading message */}
      </div>
      <div className="w-full p-4 mb-4 border rounded-md">
        <h2 className="mb-2 text-xl font-bold">Hotel</h2>
        <p>{loading.hotel ? 'Fetching hotels...' : hotel}</p> {/* Display hotels or loading message */}
      </div>
    </div>
  );
}

export default Suggestion;
