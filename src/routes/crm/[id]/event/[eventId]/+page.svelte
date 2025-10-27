<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  $: contactId = $page.params.id;
  $: eventId = $page.params.eventId;
  
  // Active tab is now dynamic based on selected pax
  let activeTab = '';
  
  const venueOptions = ['Studio Kencana', 'Grand Ballroom', 'Royal Hall', 'Paradise Garden'];
  const paxOptions = ['200', '400', '600', '800', '1000'];
  
  let eventData = {
    name: 'Akad - Juni & Hermansyah',
    eventDate: '',
    selectedVenues: [],
    selectedPax: []
  };
  
  let tempVenue = '';
  let tempPax = '';
  
  // Reactive: Update active tab when selected pax changes
  $: {
    if (eventData.selectedPax.length > 0 && !eventData.selectedPax.includes(activeTab)) {
      activeTab = eventData.selectedPax[0];
    } else if (eventData.selectedPax.length === 0) {
      activeTab = '';
    }
  }
  
  // Buffet data
  let buffetType = '';
  let buffetItems = [
    { category: '', menu: '', quantity: '', notes: '' }
  ];
  
  // Gubukan data
  let gubukanItems = [
    { category: '', menu: '', quantity: '', notes: '' }
  ];
  
  // Dekorasi data
  let dekorasiType = '';
  let dekorasiVendor = '';
  let dekorasiItems = [
    { item: '', quantity: '', notes: '' }
  ];
  
  // Rias dan Busana data
  let riasBusanaType = '';
  let riasBusanaVendor = '';
  let riasBusanaItems = [
    { item: '', quantity: '', notes: '' }
  ];
  
  // Photo dan Video data
  let photoVideoType = '';
  let photoVideoVendor = '';
  let photoVideoItems = [
    { item: '', quantity: '', notes: '' }
  ];
  
  // Entertainment data
  let entertainmentType = '';
  let entertainmentVendor = '';
  
  // Wedding Organizer data
  let weddingOrganizerType = '';
  let weddingOrganizerVendor = '';
  
  // Pendukung data
  let pendukungMc = '';
  let pendukungUpacaraAdat = '';
  let pendukungIntegiri = '';
  let pendukungTarian = '';
  
  function addVenue() {
    if (tempVenue && !eventData.selectedVenues.includes(tempVenue)) {
      eventData.selectedVenues = [...eventData.selectedVenues, tempVenue];
      tempVenue = '';
    }
  }
  
  function removeVenue(venue) {
    eventData.selectedVenues = eventData.selectedVenues.filter(v => v !== venue);
  }
  
  function addPax() {
    if (tempPax && !eventData.selectedPax.includes(tempPax)) {
      eventData.selectedPax = [...eventData.selectedPax, tempPax];
      tempPax = '';
    }
  }
  
  function removePax(pax) {
    eventData.selectedPax = eventData.selectedPax.filter(p => p !== pax);
  }
  
  function goBack() {
    goto(`/crm/${contactId}`);
  }
  
  function addBuffetLine() {
    buffetItems = [...buffetItems, { category: '', menu: '', quantity: '', notes: '' }];
  }
  
  function removeBuffetLine(index) {
    buffetItems = buffetItems.filter((_, i) => i !== index);
  }
  
  function addGubukanLine() {
    gubukanItems = [...gubukanItems, { category: '', menu: '', quantity: '', notes: '' }];
  }
  
  function removeGubukanLine(index) {
    gubukanItems = gubukanItems.filter((_, i) => i !== index);
  }
  
  function addDekorasiLine() {
    dekorasiItems = [...dekorasiItems, { item: '', quantity: '', notes: '' }];
  }
  
  function removeDekorasiLine(index) {
    dekorasiItems = dekorasiItems.filter((_, i) => i !== index);
  }
  
  function addRiasBusanaLine() {
    riasBusanaItems = [...riasBusanaItems, { item: '', quantity: '', notes: '' }];
  }
  
  function removeRiasBusanaLine(index) {
    riasBusanaItems = riasBusanaItems.filter((_, i) => i !== index);
  }
  
  function addPhotoVideoLine() {
    photoVideoItems = [...photoVideoItems, { item: '', quantity: '', notes: '' }];
  }
  
  function removePhotoVideoLine(index) {
    photoVideoItems = photoVideoItems.filter((_, i) => i !== index);
  }
  
  function handleSave() {
    console.log('Saving event details...', eventData);
    alert('Event details saved!');
  }
  
  function handleProceedToContract() {
    goto(`/crm/${contactId}/event/${eventId}/contract`);
  }
</script>

<div class="flex min-h-screen bg-gray-50">
  <Sidebar />
  
  <main class="flex-1 p-8 overflow-y-auto">
    <div class="max-w-4xl mx-auto">
      <div class="mb-6">
        <button
          on:click={goBack}
          class="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Contact
        </button>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">{eventData.name}</h1>
        
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
          <input
            type="date"
            bind:value={eventData.eventDate}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        
        <div class="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Venue</label>
            <div class="flex gap-2 mb-2">
              <select
                bind:value={tempVenue}
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Select venue</option>
                {#each venueOptions as venue}
                  <option value={venue}>{venue}</option>
                {/each}
              </select>
              <button
                on:click={addVenue}
                class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
              >
                Add
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              {#each eventData.selectedVenues as venue}
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800">
                  {venue}
                  <button on:click={() => removeVenue(venue)} class="ml-2 hover:text-amber-900">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              {/each}
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Number of Pax</label>
            <div class="flex gap-2 mb-2">
              <select
                bind:value={tempPax}
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Select pax</option>
                {#each paxOptions as pax}
                  <option value={pax}>{pax} Pax</option>
                {/each}
              </select>
              <button
                on:click={addPax}
                class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
              >
                Add
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              {#each eventData.selectedPax as pax}
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800">
                  {pax} Pax
                  <button on:click={() => removePax(pax)} class="ml-2 hover:text-amber-900">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              {/each}
            </div>
          </div>
        </div>
        
        <div class="border-b border-gray-200 mb-6">
          {#if eventData.selectedPax.length > 0}
            <nav class="flex space-x-4">
              {#each eventData.selectedPax as pax}
                <button
                  class="px-4 py-2 font-medium border-b-2 transition-colors {activeTab === pax ?
                    'border-amber-600 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}"
                  on:click={() => activeTab = pax}
                >
                  {pax} Pax
                </button>
              {/each}
            </nav>
          {:else}
            <div class="py-4 text-center text-gray-400 text-sm">
              Please select Number of Pax to view tabs
            </div>
          {/if}
        </div>
        
        {#if eventData.selectedPax.length > 0 && activeTab}
        <div class="space-y-8">
          <section>
            <h2 class="text-lg font-bold text-gray-800 mb-4">Venue</h2>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Venue</label>
                <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Select venue</option>
                  {#each venueOptions as venue}
                    <option value={venue}>{venue}</option>
                  {/each}
                </select>
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Harga</label>
                <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
            </div>
          </section>
          
          <section>
            <div class="mb-4">
              <h2 class="text-lg font-bold text-gray-800 mb-2">Buffet</h2>
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">Type</label>
                <select bind:value={buffetType} class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Select type</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="deluxe">Deluxe</option>
                </select>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Category</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Menu</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Quantity</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Notes</th>
                    <th class="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {#each buffetItems as item, index}
                    <tr class="border-b">
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.category} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.menu} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.quantity} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.notes} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2">
                        <button on:click={() => removeBuffetLine(index)} class="text-red-500 hover:text-red-700">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
            <button on:click={addBuffetLine} class="mt-2 text-amber-700 hover:text-amber-800 font-medium text-sm">Add a line</button>
          </section>
          
          <section>
            <h2 class="text-lg font-bold text-gray-800 mb-4">Gubukan</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Category</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Menu</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Quantity</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Notes</th>
                    <th class="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {#each gubukanItems as item, index}
                    <tr class="border-b">
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.category} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.menu} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.quantity} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.notes} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2">
                        <button on:click={() => removeGubukanLine(index)} class="text-red-500 hover:text-red-700">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
            <button on:click={addGubukanLine} class="mt-2 text-amber-700 hover:text-amber-800 font-medium text-sm">Add a line</button>
          </section>
          
          <section>
            <div class="mb-4">
              <h2 class="text-lg font-bold text-gray-800 mb-2">Dekorasi Pelaminan dan Ruangan</h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">Type</label>
                  <select bind:value={dekorasiType} class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="">Select type</option>
                    <option value="type1">Type 1</option>
                    <option value="type2">Type 2</option>
                  </select>
                </div>
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">Vendor</label>
                  <select bind:value={dekorasiVendor} class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="">Select vendor</option>
                    <option value="vendor1">Vendor 1</option>
                    <option value="vendor2">Vendor 2</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Item</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Quantity</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Notes</th>
                    <th class="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {#each dekorasiItems as item, index}
                    <tr class="border-b">
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.item} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.quantity} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.notes} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2">
                        <button on:click={() => removeDekorasiLine(index)} class="text-red-500 hover:text-red-700">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
            <button on:click={addDekorasiLine} class="mt-2 text-amber-700 hover:text-amber-800 font-medium text-sm">Add a line</button>
          </section>
          
          <section>
            <div class="mb-4">
              <h2 class="text-lg font-bold text-gray-800 mb-2">Rias dan Busana</h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">Type</label>
                  <select bind:value={riasBusanaType} class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="">Select type</option>
                    <option value="type1">Type 1</option>
                    <option value="type2">Type 2</option>
                  </select>
                </div>
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">Vendor</label>
                  <select bind:value={riasBusanaVendor} class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="">Select vendor</option>
                    <option value="vendor1">Vendor 1</option>
                    <option value="vendor2">Vendor 2</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Item</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Quantity</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Notes</th>
                    <th class="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {#each riasBusanaItems as item, index}
                    <tr class="border-b">
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.item} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.quantity} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.notes} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2">
                        <button on:click={() => removeRiasBusanaLine(index)} class="text-red-500 hover:text-red-700">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
            <button on:click={addRiasBusanaLine} class="mt-2 text-amber-700 hover:text-amber-800 font-medium text-sm">Add a line</button>
          </section>
          
          <section>
            <div class="mb-4">
              <h2 class="text-lg font-bold text-gray-800 mb-2">Photo dan Video</h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">Type</label>
                  <select bind:value={photoVideoType} class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="">Select type</option>
                    <option value="type1">Type 1</option>
                    <option value="type2">Type 2</option>
                  </select>
                </div>
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">Vendor</label>
                  <select bind:value={photoVideoVendor} class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="">Select vendor</option>
                    <option value="vendor1">Vendor 1</option>
                    <option value="vendor2">Vendor 2</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Item</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Quantity</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Notes</th>
                    <th class="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {#each photoVideoItems as item, index}
                    <tr class="border-b">
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.item} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.quantity} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2 pr-2">
                        <input type="text" bind:value={item.notes} class="w-full px-2 py-1 border border-gray-300 rounded" />
                      </td>
                      <td class="py-2">
                        <button on:click={() => removePhotoVideoLine(index)} class="text-red-500 hover:text-red-700">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
            <button on:click={addPhotoVideoLine} class="mt-2 text-amber-700 hover:text-amber-800 font-medium text-sm">Add a line</button>
          </section>
          
          <section>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <div class="mb-4">
                  <h2 class="text-lg font-bold text-gray-800 mb-2">Entertainment</h2>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="flex items-center gap-2">
                      <label class="text-sm text-gray-600">Type</label>
                      <select bind:value={entertainmentType} class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <option value="">Select type</option>
                        <option value="type1">Type 1</option>
                        <option value="type2">Type 2</option>
                      </select>
                    </div>
                    <div class="flex items-center gap-2">
                      <label class="text-sm text-gray-600">Vendor</label>
                      <select bind:value={entertainmentVendor} class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <option value="">Select vendor</option>
                        <option value="vendor1">Vendor 1</option>
                        <option value="vendor2">Vendor 2</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div class="mb-4">
                  <h2 class="text-lg font-bold text-gray-800 mb-2">Wedding Organizer</h2>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="flex items-center gap-2">
                      <label class="text-sm text-gray-600">Type</label>
                      <select bind:value={weddingOrganizerType} class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <option value="">Select type</option>
                        <option value="type1">Type 1</option>
                        <option value="type2">Type 2</option>
                      </select>
                    </div>
                    <div class="flex items-center gap-2">
                      <label class="text-sm text-gray-600">Vendor</label>
                      <select bind:value={weddingOrganizerVendor} class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <option value="">Select vendor</option>
                        <option value="vendor1">Vendor 1</option>
                        <option value="vendor2">Vendor 2</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 class="text-lg font-bold text-gray-800 mb-4">Pendukung</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600 w-32">MC</label>
                <select bind:value={pendukungMc} class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Select type</option>
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                </select>
              </div>
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600 w-32">Upacara Adat</label>
                <select bind:value={pendukungUpacaraAdat} class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Select type</option>
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                </select>
              </div>
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600 w-32">Integiri</label>
                <select bind:value={pendukungIntegiri} class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Select type</option>
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                </select>
              </div>
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600 w-32">Tarian</label>
                <select bind:value={pendukungTarian} class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Select type</option>
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                </select>
              </div>
            </div>
          </section>
        </div>
        
        <div class="flex justify-between items-center mt-8 pt-6 border-t">
          <button
            on:click={handleSave}
            class="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Save
          </button>
          <button
            on:click={handleProceedToContract}
            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Proceed to Contract
          </button>
        </div>
        {:else}
        <div class="py-12 text-center text-gray-400">
          <p>Please select at least one Number of Pax to begin filling out the event details</p>
        </div>
        {/if}
      </div>
    </div>
  </main>
</div>