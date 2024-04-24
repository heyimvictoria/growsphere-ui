import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import authHeader from '../services/AuthHeader';



// Function to clean double quotes and trim white spaces
const cleanString = (str) => {
    if (!str || typeof str !== 'string') {
      return ''; // Return empty if undefined or not a string
    }
    return str.replace(/^"|"$|\\"/g, '').trim(); // Clean leading/trailing double quotes
  };

const convertArrayToDate = (dateArray) => {
  const [year, month, day] = dateArray.map(Number);
  return new Date(year, month - 1, day); // Adjust for zero-based month index in JS
};



// Generate water events with cleaned water requirements
const generateWaterEvents = (plant, startDate) => {
    const events = [];
    const endDate = moment("2024-09-30");
    let currentDate = moment(startDate);
  
    // Get and clean water frequency
    const rawWaterFrequency = plant.waterFrequency;
    const waterFrequency = cleanString(rawWaterFrequency.toLowerCase());
  
    // Get and clean water requirements
    const rawWaterRequirements = plant.waterRequirements; // Make sure the field name matches
    const waterRequirementsDescription = cleanString(rawWaterRequirements);
  
    console.log(`Water requirements for ${plant.commonName}: ${waterRequirementsDescription}`); // Log for debugging
  
    const waterPatterns = {
      high: [1, 3, 5, 6, 7],
      moderate: [1, 3, 6, 7],
      low: [1, 3, 7],
    };
  
    const selectedPattern = waterPatterns[waterFrequency]; 
  
    if (!selectedPattern) {
      console.error(`Invalid or missing water frequency: ${rawWaterFrequency}`);
      return events; // Return empty if invalid
    }
  
    while (currentDate.isSameOrBefore(endDate)) {
      const dayOfWeek = currentDate.isoWeekday(); // Get the day of the week
  
      if (selectedPattern.includes(dayOfWeek)) { // If current day matches the pattern
        const title = `${plant.commonName} - Watering`; // Event title
        const event = {
          title,
          start: currentDate.format(),
          allDay: true,
          extendedProps: { description: waterRequirementsDescription },
        };
  
        events.push(event); // Add the event
      }
  
      currentDate.add(1, 'days'); // Move to the next day
    }
  
    return events; // Return the generated water events
  };

  
function Calendar() {
  const [plants, setPlants] = useState([]);
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [calendarData, setCalendarData] = useState([]);

  // Fetch plant data
  useEffect(() => {
    const fetchPlants = async () => {

        
      try {
        const headers = authHeader();
        console.log("Authorization Header:", headers);
        const response = await axios.get('http://localhost:8080/calendar/plants', {
            headers, 
          }); // API endpoint to fetch plants

        
        const cleanedPlants = response.data.map((plant) => ({
          ...plant,
          commonName: cleanString(plant.commonName), // Clean the string
        }));
        console.log("Calendar Data:", response.data);

        setPlants(cleanedPlants);
      } catch (error) {
        console.error('Error fetching plants:', error.response ? error.response.data : error.message);
      }
    };

    fetchPlants(); // Fetch plants
  }, []);

  useEffect(() => {
    if (selectedPlants.length === 0) {
      setCalendarData([]); // Clear calendar data if no plants selected
      return;
    }

    const fetchCalendar = async () => {
      try {
        const payload = selectedPlants.map((id) => parseInt(id)); // Convert plant IDs to integers
        const headers = authHeader(); // Get the authorization header
        const response = await axios.post('http://localhost:8080/calendar/generate', payload, { headers }); // Fetch calendar data with authorization
    
        
        const events = response.data.flatMap((event) => {
            console.log("Raw Event Data:", response.data);
            console.log("Event data:", event);
          
            const description = event.sowDescription || "No description available";
          
            // Check for valid insideSowDate and convert to a date array
            const insideSowDateArray = event.insideSowDate ? event.insideSowDate.split('-') : null;
            const outsideSowDateArray = event.outsideSowDate ? event.outsideSowDate.split('-') : null;
            const harvestDateArray = event.harvestDate ? event.harvestDate.split('-') : null;

            const createEvent = (title, dateArray, description, color = null) => {
                console.log("Date array:", dateArray);
              
                if (!dateArray || dateArray.length !== 3) {
                  console.error("Invalid or incomplete date array:", dateArray);
                  return null;
                }
              
                const date = convertArrayToDate(dateArray); // Convert to JavaScript Date
                if (isNaN(date.getTime())) { // Check for valid date
                  console.error("Invalid date conversion:", dateArray);
                  return null;
                }
              
                const formattedDate = moment(date).format('YYYY-MM-DD'); // Format with moment
              
                // Create the event object
                const event = {
                  title,
                  start: formattedDate,
                  allDay: true,
                  extendedProps: { description }, // Tooltip content
                };
              
                // Assign the background color if provided
                if (color) {
                  event.backgroundColor = color; // Set the background color
                  event.borderColor = color;     // Set the border color
                }
              
                return event; // Return the event object
              };
              
              const eventsList = [];
              
              // Assign specific colors to different event types
              const sowColor = 'green'; // Color for sowing events
              const waterColor = 'blue'; // Color for water events
              const harvestColor = 'orange'; // Color for harvest events
              
              // Generate events for inside sowing
              if (insideSowDateArray) {
                const title = `${event.plant.commonName} - Inside Sow`;
                const eventObj = createEvent(title, insideSowDateArray, description, sowColor); // Pass sowColor
                if (eventObj) {
                  eventsList.push(eventObj);
                }
              }
              
              // Generate events for outside sowing
              if (outsideSowDateArray) {
                const title = `${event.plant.commonName} - Outside Sow`;
                const eventObj = createEvent(title, outsideSowDateArray, description, sowColor); // Pass sowColor
                if (eventObj) {
                  eventsList.push(eventObj);
                }
              
                // Generate watering events with waterColor
                const waterEvents = generateWaterEvents(event.plant, convertArrayToDate(outsideSowDateArray), waterColor); // Pass waterColor
                eventsList.push(...waterEvents); // Add water events
              }
              
              // Generate harvest events with harvestColor
              if (harvestDateArray) {
                const title = `${event.plant.commonName} - Harvest`;
                const eventObj = createEvent(title, harvestDateArray, description, harvestColor); // Pass harvestColor
                if (eventObj) {
                  eventsList.push(eventObj);
                }
              }
              
              return eventsList; // Return the final list of events
            });
          
          
        console.log("Generated Events:", events);
    
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
            {plant.commonName} {/* Display the common name */}
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