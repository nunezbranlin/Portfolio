<script>
    // populated with data from the endpoint  
    // bellow is how you get the data fromt he endpoint
    export let item;
  </script>
  
  <h1>KV Test</h1>
  {#each JSON.parse(item) as i}
    <p>Name: {i.name}</p>
    <p>Phone: {i.phone}</p>
    <p>Address: {i.address}</p>
  {/each}