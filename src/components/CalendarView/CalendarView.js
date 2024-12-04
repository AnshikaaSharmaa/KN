// CalendarView.js

import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarView = ({ tasks, onCompleteTask }) => {
  const events = tasks.map((task) => ({
    title: task.title,
    start: new Date(task.dueDate),
    end: new Date(task.dueDate), // You can change this if your tasks have actual end times
    priority: task.importance, // Ensure this field matches your form field (importance)
    id: task.id,
  }));

  const eventStyleGetter = (event) => {
    let backgroundColor = '';
    switch (event.priority) {
      case 'High':
        backgroundColor = '#FF6B6B'; // Soft red
        break;
      case 'Medium':
        backgroundColor = '#FFD166'; // Soft yellow
        break;
      case 'Low':
        backgroundColor = '#6BCB77'; // Soft green
        break;
      default:
        backgroundColor = '#B2B2B2'; // Gray
    }
    return {
      style: {
        backgroundColor: backgroundColor,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  const handleEventClick = (event) => {
    // Mark task as completed when clicked
    onCompleteTask(event.id);
  };

  return (
    <div>
      <h2>Calendar View</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleEventClick} // Add event click handler
      />
    </div>
  );
};

export default CalendarView;
