<script>
  import RenderForm from "../components/renderForm.svelte"
export let item;
let name;
let phone;
let address;

$: data = item;
async function handleSubmit() {
    // Send a POST request to src/routes/local.js endpoint
    let submit = await fetch('/form', {
      method: 'POST',
      body: JSON.stringify({ name: name, phone: phone, address: address, preData: data }),
      headers: new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json"
}),
    });
    let resp = await submit.json();

    data = resp.item;
      

  }
</script>
<form on:submit|preventDefault={handleSubmit}>
<input type="text" placeholder="name" bind:value={name}>
<input type="text" placeholder="belt color" bind:value={phone}>
<input type="number" placeholder="age" bind:value="{address}">
<button>Submit</button>
</form>

<RenderForm data={data} />  

