<script lang="ts">
  import { Calendar } from '@fullcalendar/core'
  import dayGridPlugin from '@fullcalendar/daygrid'

  import { onMount } from 'svelte'

  let node: HTMLElement
  let calendar: Calendar

  const today = new Date()

  // one day in miliseconds
  const day = 60 * 60 * 24 * 1000

  const nextMonth = today.getMonth() === 11 ? new Date(today.getFullYear() + 1, 0) : new Date(today.getFullYear(), today.getMonth() + 1, 1)

  onMount(async () => {
    await import('@fullcalendar/core/vdom.js')
    calendar = new Calendar(node, {
      plugins: [dayGridPlugin],
      themeSystem: 'standard',
      initialView: 'dayGridMonth',
      events: [
        {
          title: 'Nice',
          start: today,
        },
        {
          title: 'week long event',
          start: today,
          end: new Date(today.getTime() + day * 7),
        },
        {
          title: 'month long event',
          start: today,
          end: nextMonth
        },
      ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay',
      },
    })
    calendar.render()
  })
</script>

<div bind:this={node} />
