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
  
  // Auto-save venue when selected
  $: {
    if (tempVenue && !eventData.selectedVenues.includes(tempVenue)) {
      eventData.selectedVenues = [...eventData.selectedVenues, tempVenue];
      tempVenue = '';
    }
  }
  
  // Auto-save pax when selected
  $: {
    if (tempPax && !eventData.selectedPax.includes(tempPax)) {
      eventData.selectedPax = [...eventData.selectedPax, tempPax];
      tempPax = '';
    }
  }
  
  // Buffet data
  let buffetType = '';
  let buffetQuantity = '';
  let buffetItems = [
    { category: '', menu: '', notes: '' }
  ];
  
  // Gubukan data
  let gubukanItems = [
    { category: '', menu: '', notes: '' }
  ];
  
  // Dekorasi data
  let dekorasiVendor = '';
  let dekorasiItems = [
    { item: '', quantity: '', notes: '' }
  ];
  
  // Rias dan Busana data
  let riasBusanaVendor = '';
  let riasBusanaItems = [
    { item: '', quantity: '', notes: '' }
  ];
  
  // Photo dan Video data
  let photoVideoVendor = '';
  let photoVideoItems = [
    { item: '', quantity: '', notes: '' }
  ];
  
  // Entertainment data
  let entertainmentVendor = '';
  
  // Wedding Organizer data
  let weddingOrganizerVendor = '';
  
  // Pendukung data
  let pendukungMc = '';
  let pendukungUpacaraAdat = '';
  let pendukungIntegiri = '';
  let pendukungTarian = '';
  
  function removeVenue(venue) {
    eventData.selectedVenues = eventData.selectedVenues.filter(v => v !== venue);
  }
  
  function removePax(pax) {
    eventData.selectedPax = eventData.selectedPax.filter(p => p !== pax);
  }
  
  function goBack() {
    goto(`/crm/${contactId}`);
  }
  
  function addBuffetRow() {
    buffetItems = [...buffetItems, { category: '', menu: '', quantity: '', notes: '' }];
  }
  
  function removeBuffetRow(index) {
    buffetItems = buffetItems.filter((_, i) => i !== index);
  }
  
  function addGubukanRow() {
    gubukanItems = [...gubukanItems, { category: '', menu: '', quantity: '', notes: '' }];
  }
  
  function removeGubukanRow(index) {
    gubukanItems = gubukanItems.filter((_, i) => i !== index);
  }
  
  function addDekorasiRow() {
    dekorasiItems = [...dekorasiItems, { item: '', quantity: '', notes: '' }];
  }
  
  function removeDekorasiRow(index) {
    dekorasiItems = dekorasiItems.filter((_, i) => i !== index);
  }
  
  function addRiasBusanaRow() {
    riasBusanaItems = [...riasBusanaItems, { item: '', quantity: '', notes: '' }];
  }
  
  function removeRiasBusanaRow(index) {
    riasBusanaItems = riasBusanaItems.filter((_, i) => i !== index);
  }
  
  function addPhotoVideoRow() {
    photoVideoItems = [...photoVideoItems, { item: '', quantity: '', notes: '' }];
  }
  
  function removePhotoVideoRow(index) {
    photoVideoItems = photoVideoItems.filter((_, i) => i !== index);
  }
</script>

<div class="flex min-h-screen bg-gray-50">
  <Sidebar />
  
  <main class="flex-1 p-8 overflow-y-auto">
    <div class="max-w-5xl mx-auto">
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
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-800 mb-4">{eventData.name}</h1>
          
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
              <input
                type="date"
                bind:value={eventData.eventDate}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Venue</label>
            <div class="mb-2">
              <select
                bind:value={tempVenue}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Select venue</option>
                {#each venueOptions as venue}
                  <option value={venue}>{venue}</option>
                {/each}
              </select>
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
            <div class="mb-2">
              <select
                bind:value={tempPax}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Select pax</option>
                {#each paxOptions as pax}
                  <option value={pax}>{pax} Pax</option>
                {/each}
              </select>
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
                  class="px-4 py-2 font-medium border-b-2 transition-colors {activeTab === pax ? 'border-amber-600 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}"
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
              <div class="space-y-2">
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Type</label>
                  <select bind:value={buffetType} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="">Select type</option>
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="deluxe">Deluxe</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Quantity</label>
                  <input
                    type="text"
                    bind:value={buffetQuantity}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Category</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Menu</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Notes</th>
                    <th class="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {#each buffetItems as item, index}
                    <tr>
                      <td class="pr-2 py-2">
                        <input
                          type="text"
                          bind:value={item.category}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td class="pr-2 py-2">
                        <input
                          type="text"
                          bind:value={item.menu}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td class="pr-2 py-2">
                        <input
                          type="text"
                          bind:value={item.notes}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td class="py-2">
                        {#if buffetItems.length > 1}
                          <button
                            on:click={() => removeBuffetRow(index)}
                            class="text-red-500 hover:text-red-700"
                          >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        {/if}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
              <button
                on:click={addBuffetRow}
                class="mt-2 text-amber-700 hover:text-amber-800 font-medium text-sm"
              >
                Add row
              </button>
            </div>
          </section>
          
          <section>
            <h2 class="text-lg font-bold text-gray-800 mb-4">Gubukan</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Category</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Menu</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Notes</th>
                    <th class="w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {#each gubukanItems as item, index}
                    <tr>
                      <td class="pr-2 py-2">
                        <input
                          type="text"
                          bind:value={item.category}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td class="pr-2 py-2">
                        <input
                          type="text"
                          bind:value={item.menu}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td class="pr-2 py-2">
                        <input
                          type="text"
                          bind:value={item.notes}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td class="py-2">
                        {#if gubukanItems.length > 1}
                          <button
                            on:click={() => removeGubukanRow(index)}
                            class="text-red-500 hover:text-red-700"
                          >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        {/if}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
              <button
                on:click={addGubukanRow}
                class="mt-2 text-amber-700 hover:text-amber-800 font-medium text-sm"
              >
                Add row
              </button>
            </div>
          </section>
          
          <section>
            <div class="mb-4">
              <h2 class="text-lg font-bold text-gray-800 mb-2">Dekorasi</h2>
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">Vendor</label>
                <select bind:value={dekorasiVendor} class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Select vendor</option>
                  <option value="vendor1">Vendor 1</option>
                  <option value="vendor2">Vendor 2</option>
                  <option value="vendor3">Vendor 3</option>
                </select>
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
                    <tr>
                      <td class="pr-2 py-2">
                        <input
                          type="text"
                          bind:value={item.item}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td class="pr-2 py-2">
                        <input
                          type="text"
                          bind:value={item.quantity}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td class="pr-2 py-2">
                        <input
                          type="text"
                          bind:value={item.notes}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td class="py-2">
                        {#if dekorasiItems.length > 1}
                          <button
                            on:click={() => removeDekorasiRow(index)}
                            class="text-red-500 hover:text-red-700"
                          >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        {/if}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
              <button
                on:click={addDekorasiRow}
                class="mt-2 text-amber-700 hover:text-amber-800 font-medium text-sm"
              >
                Add row
              </button>
            </div>
          </section>
          
          <section>
            <div class="mb-4">
              <h2 class="text-lg font-bold text-gray-800 mb-2">Rias dan Busana</h2>
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">Vendor</label>
                <select bind:value={riasBusanaVendor} class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Select vendor</option>
                  <option value="vendor1">Vendor 1</option>
                  <option value="vendor2">Vendor 2</option>
                  <option value="vendor3">Vendor 3</option>
                </select>
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
                    <tr>
                      <td class="pr-2 py-2">
                        <input
                          type="text"
                          bind:value={item.item}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td class="pr-2 py-2">
                        <input
                          type="text"
                          bind:value={item.quantity}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td class="pr-2 py-2">
                        <input
                          type="text"
                          bind:value={item.notes}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td class="py-2">
                        {#if riasBusanaItems.length > 1}
                          <button
                            on:click={() => removeRiasBusanaRow(index)}
                            class="text-red-500 hover:text-red-700"
                          >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        {/if}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
              <button
                on:click={addRiasBusanaRow}
                class="mt-2 text-amber-700 hover:text-amber-800 font-medium text-sm"
              >
                Add row
              </button>
            </div>
          </section>
          
          <section>
            <div class="mb-4">
              <h2 class="text-lg font-bold text-gray-800 mb-2">Photo dan Video</h2>
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">Vendor</label>
                <select bind:value={photoVideoVendor} class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Select vendor</option>
                  <option value="vendor1">Vendor 1</option>
                  <option value="vendor2">Vendor 2</option>
                  <option value="vendor3">Vendor 3</option>
                </select>
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
                    <tr>
                      <td class="pr-2 py-2">
                        <input
                          type="text"
                          bind:value={item.item}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td class="pr-2 py-2">
                        <input
                          type="text"
                          bind:value={item.quantity}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td class="pr-2 py-2">
                        <input
                          type="text"
                          bind:value={item.notes}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td class="py-2">
                        {#if photoVideoItems.length > 1}
                          <button
                            on:click={() => removePhotoVideoRow(index)}
                            class="text-red-500 hover:text-red-700"
                          >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        {/if}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
              <button
                on:click={addPhotoVideoRow}
                class="mt-2 text-amber-700 hover:text-amber-800 font-medium text-sm"
              >
                Add row
              </button>
            </div>
          </section>
          
          <section>
            <h2 class="text-lg font-bold text-gray-800 mb-4">Entertainment & Wedding Organizer</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Entertainment</label>
                <select bind:value={entertainmentVendor} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Select vendor</option>
                  <option value="vendor1">Vendor 1</option>
                  <option value="vendor2">Vendor 2</option>
                  <option value="vendor3">Vendor 3</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Wedding Organizer</label>
                <select bind:value={weddingOrganizerVendor} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Select vendor</option>
                  <option value="vendor1">Vendor 1</option>
                  <option value="vendor2">Vendor 2</option>
                  <option value="vendor3">Vendor 3</option>
                </select>
              </div>
            </div>
          </section>
          
          <section>
            <h2 class="text-lg font-bold text-gray-800 mb-4">Pendukung</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">MC</label>
                <input
                  type="text"
                  bind:value={pendukungMc}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Upacara Adat</label>
                <input
                  type="text"
                  bind:value={pendukungUpacaraAdat}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Integiri</label>
                <input
                  type="text"
                  bind:value={pendukungIntegiri}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Tarian</label>
                <input
                  type="text"
                  bind:value={pendukungTarian}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </section>
        </div>
        {/if}
      </div>
    </div>
  </main>
</div>