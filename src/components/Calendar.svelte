<script lang="ts">
  import { Calendar } from '@fullcalendar/core';
  import dayGridPlugin from '@fullcalendar/daygrid';

  import { onMount } from 'svelte'

  let node: HTMLElement
  let calendar: Calendar

  onMount(async () => {
    await import('@fullcalendar/core/vdom.js');
    calendar = new Calendar(node, {
      plugins: [dayGridPlugin],
      themeSystem: 'standard',
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      }
    });
    calendar.render()
  })

</script>

<div bind:this={node}></div>
