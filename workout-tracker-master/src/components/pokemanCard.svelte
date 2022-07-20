<script>
// @ts-nocheck
export let pokeman; //receiving a property
</script>
<a class="p-6 bg-gray-100 text-gray-800 text-center rounded-md show-sm hover:shadow-md flex flex-col items-center" href={`/pokeman/${pokeman.id}`}>
<img class="h-40 w-40" src={pokeman.image} alt={pokeman.name}>
<h2 class="uppercase text-2xl">{pokeman.id}.{pokeman.name}</h2></a>