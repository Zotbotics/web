<script lang="ts">
  import { Calendar } from '@fullcalendar/core'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import googleCalendarPlugin from '@fullcalendar/google-calendar'
  import { onMount } from 'svelte'

  let node: HTMLElement
  let calendar: Calendar

  function initCalendar() {
    calendar = new Calendar(node, {
      plugins: [googleCalendarPlugin, dayGridPlugin],
      themeSystem: 'standard',
      initialView: 'dayGridMonth',
      googleCalendarApiKey: 'AIzaSyDmuBZD36_8mSREAhn8XHQyRjfXVC7G2X0',
      events: {
        googleCalendarId: 'i4mj1jrm10q7900u3od2qfaaeg@group.calendar.google.com',
      },
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay',
      },
    })
    calendar.render()
  }

  function destroyCalendar() {
    if (calendar) {
      calendar.destroy()
    }
  }

  onMount(async () => {
    initCalendar()
    return destroyCalendar
  })
</script>

<div bind:this={node} />
