import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarViewMode } from '../../config/enum';

const Calendar = ({
    events,
    handleAddAppointmentOpen,
    handleEditAppointmentOpen,
    viewMode
}) => {

    const onSelectSlot = ({ start, end }) => {
        handleAddAppointmentOpen({
            startTime: start,
            endTime: end
        });
    }

    const onSelectEvent = ({ event }) => {
        const { start, end } = event;
        handleEditAppointmentOpen({
            ...event.extendedProps,
            startTime: start,
            endTime: end
        })
    }


    return (
        <>
            {viewMode === CalendarViewMode.MONTH && (
                <FullCalendar
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin
                    ]}
                    initialView={CalendarViewMode.MONTH}
                    selectable={true}
                    allDaySlot={false}
                    nowIndicator={true}
                    events={events}
                    select={onSelectSlot}
                    eventClick={onSelectEvent}
                    height={'75vh'}
                />
            )}
            {viewMode === CalendarViewMode.WEEK && (
                <FullCalendar
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin
                    ]}
                    initialView={CalendarViewMode.WEEK}
                    selectable={true}
                    allDaySlot={false}
                    nowIndicator={true}
                    events={events}
                    select={onSelectSlot}
                    eventClick={onSelectEvent}
                    height={'75vh'}
                />
            )}
            {viewMode === CalendarViewMode.DAY && (
                <FullCalendar
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin
                    ]}
                    initialView={CalendarViewMode.DAY}
                    selectable={true}
                    allDaySlot={false}
                    nowIndicator={true}
                    events={events}
                    select={onSelectSlot}
                    eventClick={onSelectEvent}
                    height={'75vh'}
                />
            )}
        </>
    );
}

export default Calendar;