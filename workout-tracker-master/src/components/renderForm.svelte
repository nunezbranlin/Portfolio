<script>
    export let data;
</script>


{#each data as i}
<div class="my-4">
<p>Name: {i.name}</p>
<p>Phone: {i.phone}</p>
<p>Address: {i.address}</p>
</div>
{/each}