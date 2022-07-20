//Just simp0ly call the workers functions as per usual but make sure it has await.
//if json data is being returned you need to part it with JSON.parse before its returned.

const jsonData = [
  {
    name: "Catherine M. Hartley",
    phone: "731-571-2685",
    address: "1735 Melville Street Arlington, TN 38002",
  },
  {
    name: "William L. Smith",
    phone: "419-636-9919",
    address: "1934 Still Street Bryan, OH 43506",
  },
  {
    name: "Steven M. Higgins",
    phone: "401-293-8028",
    address: "434 Melm Street West Warwick, RI 02893",
  },
];

const jsonData2 = [
  {
    name: "2Catherine M. Hartley",
    phone: "731-571-2685",
    address: "1735 Melville Street Arlington, TN 38002",
  },
  {
    name: "2William L. Smith",
    phone: "419-636-9919",
    address: "1934 Still Street Bryan, OH 43506",
  },
  {
    name: "2Steven M. Higgins",
    phone: "401-293-8028",
    address: "434 Melm Street West Warwick, RI 02893",
  },
];

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request, platform }) {
  // `params.id` comes from [id].js
  const item = jsonData;
  //item = JSON.parse(item);
  if (item) {
    return {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: { item },
    };
  }

  return {
    status: 404,
  };
}

export async function post({ request, platform }) {
  let { name, phone, address, preData } = await request.json();
  preData.push({ name: name, phone: phone, address: address });
  const item = preData;
  if (item) {
    return {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: { item },
    };
  }

  return {
    status: 404,
  };
}

/// this works to refresh the active data!!!!!!!!
