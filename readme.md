# Weather Forecast Application

A simple weather forecast application built using JavaScript, HTML, and CSS.

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Setup Instructions](#setup-instructions)
* [Usage](#usage)
* [API Documentation](#api-documentation)
* [License](#license)
* [Contributing](#contributing)
* [Author](#author)
* [Acknowledgments](#acknowledgments)

## Overview

This application retrieves weather data from the OpenWeatherMap API and displays it in a user-friendly interface. It provides essential features such as location-based forecasts, current weather conditions, and extended forecasts.

## Features

- **Basic Project Structure**: Organized with separate HTML, CSS, and JavaScript files.
- **Integration with Weather API**: Fetches weather data from a suitable weather API provider (e.g., OpenWeatherMap, WeatherAPI).
- **User Interface Design**: Simple and intuitive UI designed using Tailwind CSS.
- **Responsiveness**: Ensures responsiveness for various screen sizes (desktop, iPad Mini, iPhone SE).
- **Location-Based Forecast**:
  - Search for weather forecasts by city name.
  - Retrieve weather forecasts for the current location.
  - Dropdown menu for recently searched cities.
- **User Interaction**: Input validation and event listeners for user interactions.
- **Extended Forecast Display**: Displays a 5-day weather forecast with organized data representation (date, icon, temperature, wind, humidity).
- **Error Handling**: Gracefully handles API errors with user-friendly messages.

## Technologies Used
- HTML
- CSS (Tailwind CSS)
- JavaScript
- [Weather API Provider](https://openweathermap.org/) (or your chosen provider)

## Setup Instructions

1. Clone the repository using `git clone https://github.com/your-username/weather-forecast-app.git`
2. Install dependencies using `npm install`
3. Create a new file named `.env` and add your OpenWeatherMap API key as `API_KEY=your-api-key`
4. Start the application using `npm start`

## Usage

1. Open the application in your web browser
2. Search for a city by typing its name in the search bar
3. Click on a city in the dropdown menu to view its weather forecast
4. View the current weather conditions and extended forecast for the selected city

## API Documentation

This application uses the OpenWeatherMap API to retrieve weather data. You can find more information about the API at [OpenWeatherMap API Documentation](https://openweathermap.org/api).

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more information.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please fork the repository and submit a pull request.

## Author

Yash Wasankar

## Acknowledgments

* OpenWeatherMap API for providing weather data
* Tailwind CSS for styling and layout