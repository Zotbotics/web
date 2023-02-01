<script lang="ts">
  import Carousel from '$lib/ui/Carousel.svelte'
  // import Calendar from '$components/Calendar.svelte'
</script>

<div class="p-4">
  <div class="mx-auto my-10 flex w-full max-w-screen-lg flex-col gap-8">
    <h1 class="text-center font-bold">
      <span
        class="bg-gradient-to-br from-red-500 to-yellow-500 box-decoration-clone bg-clip-text text-transparent"
      >
        Welcome
      </span>
      <span
        class="bg-gradient-to-br from-primary-500 to-secondary-500 box-decoration-clone bg-clip-text text-transparent"
      >
        to
      </span>
      <span
        class="bg-gradient-to-br from-secondary-500 to-primary-500 box-decoration-clone bg-clip-text text-transparent"
      >
        Zotbotics
      </span>
      <span
        class="bg-gradient-to-br from-pink-500 to-violet-500 box-decoration-clone bg-clip-text text-transparent"
      >
        Makerspace
      </span>
    </h1>
    <!-- <Calendar /> -->

    <div class="h-[500px] w-full overflow-hidden rounded-2xl">
      <Carousel interval={5000} controls>
        <div class="flex flex-col items-center overflow-hidden bg-primary-300">
          <img src="/banner.png" alt="banner" class="h-full w-full object-contain" />
        </div>

        <div class="flex h-full flex-col items-center justify-evenly gap-4 bg-secondary-200">
          <div>
            <h1 class="text-center text-2xl text-primary-500">Join Us</h1>
            <p class="text-lg text-primary-500">
              Sign up for the Weekly Newsletter to get club updates!
            </p>
          </div>
          <img src="/form.png" alt="teaching" class="h-60 w-96" />
        </div>

        <div class="flex h-full items-center justify-evenly gap-4 bg-primary-200">
          <img src="/mascot.png" alt="teaching" class="h-60 w-64" />
          <div>
            <h1 class="text-center text-4xl text-secondary-500">Upcoming Projects</h1>
            <p class="text-lg text-secondary-500" />
          </div>
        </div>

        <div class="flex flex-col items-center bg-secondary-100">
          <h1 class="p-4 text-2xl text-primary-500">Workshops</h1>
          <div class="w-full overflow-hidden">
            <img src="/whiteboard.jpg" alt="teaching" class="h-full w-full object-cover" />
          </div>
        </div>

        <div class="flex flex-col items-center bg-secondary-100">
          <h1 class="p-4 text-2xl text-primary-500">Live Demos</h1>
          <div class="w-full overflow-hidden">
            <img src="/demo.png" alt="teaching" class="h-full w-full object-cover" />
          </div>
        </div>

        <div class="flex flex-col items-center bg-secondary-100">
          <h1 class="p-4 text-2xl text-primary-500">Hands on learning</h1>
          <div class="w-full overflow-hidden">
            <img src="/hands_on.png" alt="teaching" class="h-full w-full object-cover" />
          </div>
        </div>
      </Carousel>
    </div>
  </div>
</div>
