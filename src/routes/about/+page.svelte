<script lang="ts">
  const boardMembers = [
    {
      name: 'Brian Vo',
      src: '/board/brian.jpeg',
      title: 'President',
    },
    {
      name: 'Gialan Tonthat',
      src: '/board/gialan.jpeg',
      title: 'President',
    },
    {
      name: 'Francis Ung',
      src: '/board/francis.jpeg',
      title: 'Project Manager',
    },
    {
      name: 'Owen Yee',
      src: '/board/owen.jpeg',
      title: 'Public Relations',
    },
    {
      name: 'Maxwell B',
      src: '/board/maxwell.jpeg',
      title: 'Treasurer',
    },
    {
      name: 'Brandon Nguyen',
      src: '/board/brandon.jpeg',
      title: 'Financial Manager',
    },
    {
      name: 'Emilio',
      src: '/board/emilio.jpeg',
      title: 'Secretary',
    },
  ]
</script>

<div class="flex flex-wrap justify-center gap-8 p-4">
  {#each boardMembers as member}
    <div class="card card-hover variant-soft-secondary w-96 p-4">
      <header class="card-header">
        <h1
          class="bg-gradient-to-br from-primary-500 via-tertiary-500 to-secondary-500 box-decoration-clone bg-clip-text text-transparent"
        >
          {member.name}
        </h1>
        <h3>{member.title}</h3>
      </header>

      <div class="my-8 flex items-center justify-center p-8">
        <img src={member.src} alt={member.name} height="240px" class="rounded" />
      </div>

      <footer class="card-footer">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ab blanditiis esse provident
          distinctio quidem quisquam animi eum magni. Sunt omnis totam reiciendis cum illum quae repellat
          adipisci in laborum?
        </p>
      </footer>
    </div>
  {/each}
</div>
