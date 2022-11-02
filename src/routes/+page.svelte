<script lang="ts">
  import Carousel from '$components/ui/Carousel.svelte'
  import Calendar from '$components/Calendar.svelte'
</script>

<div class="p-4">
  <div class="mx-auto w-full max-w-screen-lg my-10 flex flex-col gap-8">
    <h1 class="text-primary text-center text-2xl">Welcome to Zotbotics Makerspace</h1>
    <Calendar />

    <div class="h-[500px] w-full rounded-2xl overflow-hidden">
      <Carousel interval={5000} controls>
        <div class="flex flex-col items-center overflow-hidden bg-primary">
          <img src="/banner.png" alt="banner" class="w-full h-full object-contain" />
        </div>

        <div class="h-full flex flex-col justify-evenly items-center gap-4 bg-secondary">
          <div>
            <h1 class="text-primary text-center text-2xl">Join Us</h1>
            <p class="text-primary text-lg">
              Sign up for the Weekly Newsletter to get club updates!
            </p>
          </div>
          <img src="/form.png" alt="teaching" class="w-96 h-60" />
        </div>

        <div class="h-full flex justify-evenly items-center gap-4 bg-primary">
          <img src="/mascot.png" alt="teaching" class="w-64 h-60" />
          <div>
            <h1 class="text-secondary text-center text-4xl">Upcoming Projects</h1>
            <p class="text-secondary text-lg" />
          </div>
        </div>

        <div class="flex flex-col items-center bg-secondary">
          <h1 class="text-primary text-2xl p-4">Workshops</h1>
          <div class="w-full overflow-hidden">
            <img src="/whiteboard.jpg" alt="teaching" class="w-full h-full object-cover" />
          </div>
        </div>

        <div class="flex flex-col items-center bg-secondary">
          <h1 class="text-primary text-2xl p-4">Live Demos</h1>
          <div class="w-full overflow-hidden">
            <img src="/demo.png" alt="teaching" class="w-full h-full object-cover" />
          </div>
        </div>

        <div class="flex flex-col items-center bg-secondary">
          <h1 class="text-primary text-2xl p-4">Hands on learning</h1>
          <div class="w-full overflow-hidden">
            <img src="/hands_on.png" alt="teaching" class="w-full h-full object-cover" />
          </div>
        </div>
      </Carousel>
    </div>
  </div>
</div>
