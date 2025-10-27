<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  $: contactId = $page.params.id;
  $: eventId = $page.params.eventId;
  
  let activeTab = 'detail';
  
  const tabs = [
    { id: 'detail', label: 'Detail' },
    { id: 'rincian-biaya', label: 'Rincian Biaya' },
    { id: 'update-history', label: 'Update History' }
  ];
  
  // Contract data
  let contractData = {
    name: 'Akad - Juni & Hermansyah',
    eventDate: '',
    referenceNumber: ''
  };
  
  // Venue data
  let venueItems = [
    { name: 'Studio Kencana', type: '', vendor: '', bookingStatus: '' }
  ];
  
  // Buffet data
  let buffetType = '';
  let buffetQuantity = '';
  let buffetItems = [
    { category: 'Studio Kencana', menu: '', notes: '' }
  ];
  
  // Gubukan data
  let gubukanItems = [
    { category: 'Studio Kencana', menu: '', quantity: '', notes: '' }
  ];
  
  // Dekorasi data
  let dekorasiVendor = '';
  let dekorasiType = '';
  let dekorasiItems = [
    { item: 'Studio Kencana', quantity: '', notes: '' }
  ];
  
  // Rias dan Busana data
  let riasBusanaVendor = '';
  let riasBusanaType = '';
  let riasBusanaItems = [
    { item: 'Studio Kencana', quantity: '', notes: '' }
  ];
  
  // Photo dan Video data
  let photoVideoVendor = '';
  let photoVideoType = '';
  let photoVideoItems = [
    { item: 'Studio Kencana', quantity: '', notes: '' }
  ];
  
  // Entertainment data
  let entertainmentVendor = '';
  let entertainmentType = '';
  
  // Wedding Organizer data
  let weddingOrganizerVendor = '';
  let weddingOrganizerType = '';
  
  // Pendukung data
  let pendukungMc = '';
  let pendukungMcType = '';
  let pendukungIntagiri = '';
  let pendukungIntagiriType = '';
  let pendukungUpacaraAdat = '';
  let pendukungUpacaraAdatType = '';
  let pendukungTarian = '';
  let pendukungTarianType = '';
  
  function goBack() {
    goto(`/crm/${contactId}/event/${eventId}`);
  }
  
  function addVenueLine() {
    venueItems = [...venueItems, { name: '', type: '', vendor: '', bookingStatus: '' }];
  }
  
  function removeVenueLine(index) {
    venueItems = venueItems.filter((_, i) => i !== index);
  }
  
  function addBuffetLine() {
    buffetItems = [...buffetItems, { category: '', menu: '', notes: '' }];
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
    console.log('Saving contract details...', contractData);
    alert('Contract details saved!');
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
          Back to Event
        </button>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg">
        <div class="p-8 border-b border-gray-200">
          <div class="flex justify-between items-start mb-6">
            <h1 class="text-2xl font-bold text-gray-800">{contractData.name}</h1>
            <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300">
              Print
            </button>
          </div>
          
          <div class="grid grid-cols-4 gap-4 text-sm">
            <div>
              <label class="block text-gray-600 mb-1">Event Date</label>
              <input
                type="date"
                bind:value={contractData.eventDate}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label class="block text-gray-600 mb-1">Venue</label>
              <div class="text-gray-800">-</div>
            </div>
            <div>
              <label class="block text-gray-600 mb-1">Number of Pax</label>
              <div class="text-gray-800">-</div>
            </div>
            <div>
              <label class="block text-gray-600 mb-1">Reference Number</label>
              <input
                type="text"
                bind:value={contractData.referenceNumber}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>
        
        <div class="border-b border-gray-200">
          <nav class="flex px-8">
            {#each tabs as tab}
              <button
                class="px-6 py-4 font-medium border-b-2 transition-colors {activeTab === tab.id ?
                  'border-amber-600 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}"
                on:click={() => activeTab = tab.id}
              >
                {tab.label}
              </button>
            {/each}
          </nav>
        </div>
        
        <div class="p-8">
          {#if activeTab === 'detail'}
            <div class="space-y-8">
              <section>
                <h2 class="text-lg font-bold text-gray-800 mb-4">Venue</h2>
                <div class="space-y-2">
                  {#each venueItems as item, index}
                    <div class="flex items-center gap-2">
                      <div class="flex items-center gap-2 flex-1">
                        <span class="text-gray-800 text-sm">Venue</span>
                        <select bind:value={item.type} class="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                          <option value="">Type 1</option>
                          <option value="type2">Type 2</option>
                          <option value="type3">Type 3</option>
                        </select>
                        <select bind:value={item.vendor} class="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                          <option value="">Create Banquet Delima</option>
                          <option value="vendor2">Vendor 2</option>
                          <option value="vendor3">Vendor 3</option>
                        </select>
                        <select bind:value={item.bookingStatus} class="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                          <option value="">Process Book</option>
                          <option value="booked">Booked</option>
                          <option value="confirmed">Confirmed</option>
                        </select>
                        <span class="text-gray-600 text-sm">Booking Status: In Process</span>
                      </div>
                    </div>
                  {/each}
                </div>
              </section>
              
              <section>
                <div class="mb-4">
                  <h2 class="text-lg font-bold text-gray-800 mb-3">Buffet</h2>
                  <div class="flex items-center gap-4 mb-4">
                    <div class="flex items-center gap-2">
                      <span class="text-gray-800 text-sm">Type</span>
                      <select bind:value={buffetType} class="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        <option value="">Type 1</option>
                        <option value="type2">Type 2</option>
                        <option value="type3">Type 3</option>
                      </select>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-gray-800 text-sm">Quantity</span>
                      <input
                        type="text"
                        bind:value={buffetQuantity}
                        class="w-24 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="min-w-full">
                    <thead>
                      <tr class="border-b">
                        <th class="text-left text-sm font-medium text-gray-600 pb-2 w-8"></th>
                        <th class="text-left text-sm font-medium text-gray-600 pb-2">Category</th>
                        <th class="text-left text-sm font-medium text-gray-600 pb-2">Menu</th>
                        <th class="text-left text-sm font-medium text-gray-600 pb-2">Notes</th>
                        <th class="w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {#each buffetItems as item, index}
                        <tr class="border-b">
                          <td class="py-2 pr-2">
                            <button class="text-gray-400 hover:text-gray-600 cursor-move">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                              </svg>
                            </button>
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.category} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.menu} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.notes} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
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
                        <th class="text-left text-sm font-medium text-gray-600 pb-2 w-8"></th>
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
                            <button class="text-gray-400 hover:text-gray-600 cursor-move">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                              </svg>
                            </button>
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.category} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.menu} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.quantity} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.notes} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
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
                  <h2 class="text-lg font-bold text-gray-800 mb-3">Dekorasi Pelaminan dan Ruangan</h2>
                  <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                      <span class="text-gray-800 text-sm">Vendor</span>
                      <select bind:value={dekorasiVendor} class="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        <option value="">Type 1</option>
                        <option value="vendor2">Vendor 2</option>
                        <option value="vendor3">Vendor 3</option>
                      </select>
                    </div>
                    <div class="flex items-center gap-2">
                      <select bind:value={dekorasiType} class="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        <option value="">Process Book</option>
                        <option value="booked">Booked</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="min-w-full">
                    <thead>
                      <tr class="border-b">
                        <th class="text-left text-sm font-medium text-gray-600 pb-2 w-8"></th>
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
                            <button class="text-gray-400 hover:text-gray-600 cursor-move">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                              </svg>
                            </button>
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.item} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.quantity} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.notes} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
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
                  <h2 class="text-lg font-bold text-gray-800 mb-3">Rias dan Busana</h2>
                  <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                      <span class="text-gray-800 text-sm">Vendor</span>
                      <select bind:value={riasBusanaVendor} class="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        <option value="">Type 1</option>
                        <option value="vendor2">Vendor 2</option>
                        <option value="vendor3">Vendor 3</option>
                      </select>
                    </div>
                    <div class="flex items-center gap-2">
                      <select bind:value={riasBusanaType} class="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        <option value="">Process Book</option>
                        <option value="booked">Booked</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="min-w-full">
                    <thead>
                      <tr class="border-b">
                        <th class="text-left text-sm font-medium text-gray-600 pb-2 w-8"></th>
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
                            <button class="text-gray-400 hover:text-gray-600 cursor-move">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                              </svg>
                            </button>
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.item} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.quantity} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.notes} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
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
                  <h2 class="text-lg font-bold text-gray-800 mb-3">Photo dan Video</h2>
                  <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                      <span class="text-gray-800 text-sm">Vendor</span>
                      <select bind:value={photoVideoVendor} class="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        <option value="">Type 1</option>
                        <option value="vendor2">Vendor 2</option>
                        <option value="vendor3">Vendor 3</option>
                      </select>
                    </div>
                    <div class="flex items-center gap-2">
                      <select bind:value={photoVideoType} class="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                        <option value="">Process Book</option>
                        <option value="booked">Booked</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="min-w-full">
                    <thead>
                      <tr class="border-b">
                        <th class="text-left text-sm font-medium text-gray-600 pb-2 w-8"></th>
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
                            <button class="text-gray-400 hover:text-gray-600 cursor-move">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                              </svg>
                            </button>
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.item} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.quantity} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                          </td>
                          <td class="py-2 pr-2">
                            <input type="text" bind:value={item.notes} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
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
                    <h2 class="text-lg font-bold text-gray-800 mb-3">Entertainment</h2>
                    <div class="flex items-center gap-4">
                      <div class="flex items-center gap-2">
                        <span class="text-gray-800 text-sm">Vendor</span>
                        <select bind:value={entertainmentVendor} class="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                          <option value="">Type 1</option>
                          <option value="vendor2">Vendor 2</option>
                          <option value="vendor3">Vendor 3</option>
                        </select>
                      </div>
                      <div class="flex items-center gap-2">
                        <select bind:value={entertainmentType} class="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                          <option value="">Process Book</option>
                          <option value="booked">Booked</option>
                          <option value="confirmed">Confirmed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 class="text-lg font-bold text-gray-800 mb-3">Wedding Organizer</h2>
                    <div class="flex items-center gap-4">
                      <div class="flex items-center gap-2">
                        <span class="text-gray-800 text-sm">Vendor</span>
                        <select bind:value={weddingOrganizerVendor} class="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                          <option value="">Type 1</option>
                          <option value="vendor2">Vendor 2</option>
                          <option value="vendor3">Vendor 3</option>
                        </select>
                      </div>
                      <div class="flex items-center gap-2">
                        <select bind:value={weddingOrganizerType} class="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                          <option value="">Process Book</option>
                          <option value="booked">Booked</option>
                          <option value="confirmed">Confirmed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 class="text-lg font-bold text-gray-800 mb-4">Pendukung</h2>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex items-center gap-4">
                    <span class="text-gray-800 text-sm w-32">MC</span>
                    <select bind:value={pendukungMc} class="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                      <option value="">Type 1</option>
                      <option value="type2">Type 2</option>
                      <option value="type3">Type 3</option>
                    </select>
                    <select bind:value={pendukungMcType} class="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                      <option value="">Process Book</option>
                      <option value="booked">Booked</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  </div>
                  
                  <div class="flex items-center gap-4">
                    <span class="text-gray-800 text-sm w-32">Upacara Adat</span>
                    <select bind:value={pendukungUpacaraAdat} class="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                      <option value="">Type 1</option>
                      <option value="type2">Type 2</option>
                      <option value="type3">Type 3</option>
                    </select>
                    <select bind:value={pendukungUpacaraAdatType} class="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                      <option value="">Process Book</option>
                      <option value="booked">Booked</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  </div>
                  
                  <div class="flex items-center gap-4">
                    <span class="text-gray-800 text-sm w-32">Intagiri</span>
                    <select bind:value={pendukungIntagiri} class="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                      <option value="">Type 1</option>
                      <option value="type2">Type 2</option>
                      <option value="type3">Type 3</option>
                    </select>
                    <select bind:value={pendukungIntagiriType} class="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                      <option value="">Process Book</option>
                      <option value="booked">Booked</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  </div>
                  
                  <div class="flex items-center gap-4">
                    <span class="text-gray-800 text-sm w-32">Tarian</span>
                    <select bind:value={pendukungTarian} class="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                      <option value="">Type 1</option>
                      <option value="type2">Type 2</option>
                      <option value="type3">Type 3</option>
                    </select>
                    <select bind:value={pendukungTarianType} class="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                      <option value="">Process Book</option>
                      <option value="booked">Booked</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>
            
            <div class="flex justify-end mt-8 pt-6 border-t">
              <button
                on:click={handleSave}
                class="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Save
              </button>
            </div>
          {:else if activeTab === 'rincian-biaya'}
            <div class="py-12 text-center text-gray-400">
              <p>Rincian Biaya content will be added here</p>
            </div>
          {:else if activeTab === 'update-history'}
            <div class="py-12 text-center text-gray-400">
              <p>Update History content will be added here</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </main>
</div>