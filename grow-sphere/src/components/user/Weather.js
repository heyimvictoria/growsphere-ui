import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// making the json strings readible in the code
const cleanString = (str) => str.replace(/(^"|"$)/g, '').trim();

const convertArrayToDate = (dateArray) => {
  const [year, month, day] = dateArray;
  return new Date(year, month - 1, day); // Adjust for zero-based month index in JS
};

function Calendar() {
  const [plants, setPlants] = useState([]);
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [calendarData, setCalendarData] = useState([]);

  // Fetch plant data
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('http://localhost:8080/calendar/plants'); // API endpoint to fetch plants
        const cleanedPlants = response.data.map((plant) => ({
          ...plant,
          commonName: cleanString(plant.commonName), // Clean the string
        }));
        setPlants(cleanedPlants);
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    fetchPlants(); // Fetch plants
  }, []);

  // Fetch calendar data when selectedPlants changes
  useEffect(() => {
    if (selectedPlants.length === 0) {
      setCalendarData([]); // Clear calendar data if no plants selected
      return;
    }

    const fetchCalendar = async () => {
      try {
        const payload = selectedPlants.map((id) => parseInt(id)); // Convert plant IDs to integers
        const response = await axios.post('http://localhost:8080/calendar/generate', payload); // Fetch calendar data
    
        const events = response.data.flatMap((event) => {
          const description = event.sowDescription || "No description available";
          const createEvent = (title, dateArray) => {
            const date = convertArrayToDate(dateArray); // Convert dateArray to JavaScript Date
            return {
              title,
              start: moment(date).format(), // Start date formatted with moment
              allDay: true,
              extendedProps: { description }, // Tooltip content
            };
          };
    
          const eventList = [];
    
          if (event.insideSowDate) {
            eventList.push(createEvent(`${event.plant.commonName} - Inside Sow`, event.insideSowDate)); 
          }
    
          if (event.outsideSowDate) {
            eventList.push(createEvent(`${event.plant.commonName} - Outside Sow`, event.outsideSowDate)); 
          }
    
          if (event.harvestDate) {
            eventList.push(createEvent(`${event.plant.commonName} - Harvest`, event.harvestDate)); 
          }
    
          return eventList; // Return all generated events
        });
    
        setCalendarData(events); // Store the generated events in state
      } catch (error) {
        console.error('Error fetching calendar data:', error); // Log any errors encountered
      }
    };

    fetchCalendar(); // Fetch the calendar events when the selected plants change
  }, [selectedPlants]);

  useEffect(() => {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl); 
    });
  }, [calendarData]); // Reinitialize tooltips when calendar data changes
  

  // Event handlers for mouse hover and leave
  const handleEventMouseEnter = (info) => {
    const { description } = info.event.extendedProps; 
    if (description) {
      info.el.setAttribute('data-bs-toggle', 'tooltip'); 
      info.el.setAttribute('data-bs-placement', 'top'); 
      info.el.setAttribute('title', description); // Tooltip text
    }
  };

  const handleEventMouseLeave = (info) => {
    info.el.removeAttribute('data-bs-toggle'); // Remove Bootstrap trigger
    info.el.removeAttribute('data-bs-placement'); // Remove placement
    info.el.removeAttribute('title'); // Remove tooltip text
  };

  // Function to render checkboxes for plant selection
  const renderPlantCheckboxes = (plantType) => {
    const filteredPlants = plants.filter(
      (plant) => cleanString(plant.plantType).toLowerCase() === plantType.toLowerCase()
    );

    return (
      <ul>
        {filteredPlants.map((plant) => (
          <li key={plant.id}>
            <input
              type="checkbox"
              value={plant.id}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) {
                  setSelectedPlants((prev) => [...prev, plant.id]);
                } else {
                  setSelectedPlants((prev) => prev.filter((id) => id !== plant.id));
                }
              }}
            />
            {plant.commonName} 
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>Calendar</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>Vegetables</h2>
          {renderPlantCheckboxes('vegetable')} {/* Render the checkboxes for vegetables */}
        </div>

        <div>
          <h2>Herbs</h2>
          {renderPlantCheckboxes('herb')} {/* Render checkboxes for herbs */}
        </div>

        <div>
          <h2>Fruits</h2>
          {renderPlantCheckboxes('fruit')} {/* Render checkboxes for fruits */}
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin]} // Calendar plugin
        initialView="dayGridMonth" // Default view
        events={calendarData} // Calendar events
        eventMouseEnter={handleEventMouseEnter} // Tooltip on hover
        eventMouseLeave={handleEventMouseLeave} // Remove tooltip on leave
      />
    </div>
  );
}

export default Calendar;


