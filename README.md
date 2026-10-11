# Appointment Management Frontend API Service

This repository contains the API service module written in **TypeScript** for managing appointments in a web application. It handles communication with the backend server to fetch, create, and update appointment records.

## Features

* **Fetch Appointments (`getAppointments`)**: Retrieves all existing appointments from the backend database.
* **Create Appointment (`createAppointment`)**: Sends new appointment data to the server using a POST request.
* **Update Appointment (`updateAppointment`)**: Updates an existing appointment record by its unique identifier (`id`).

## Base URL

The service connects to the backend API endpoint:
```ts
const BASE_URL = 'http://localhost:8081/api/v1/appointments';
