import { getWeather } from './weather';


export const tools = [
  {
    type: 'function',
    function: {
      function: getWeather,
      parse: JSON.parse,
      parameters: {
        type: 'object',
        properties: {
          city: { type: 'string' },
        },
        required: ['city']
      },
    },
  }
]

