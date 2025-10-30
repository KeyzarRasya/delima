<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { getAvailablePaxForVenue } from '$lib/data/masterVenues.js';
  import { masterVenues } from '$lib/data/masterVenues.js';
  import { masterPax } from '$lib/data/masterPax.js';
  import { crmContacts } from '$lib/data/crmData.js';
  import { getDefaultDataForPax } from '$lib/data/paxDetails.js';
  import { 
    dekorasiVendors, 
    riasBusanaVendors, 
    photoVideoVendors, 
    entertainmentVendors,
    weddingOrganizerVendors 
  } from '$lib/data/vendorData.js';
  import { 
    mcData,
    upacaraAdatData,
    intagiriData,
    tarianData
  } from '$lib/data/pendukungData.js';
  import { buffetData } from '$lib/data/cateringData.js';
  
  $: contactId = parseInt($page.params.id);
  $: eventId = $page.params.eventId;
  
  $: contactData = crmContacts.find(c => c.id === contactId);
  $: eventFromData = contactData?.events?.find(e => e.id === eventId);
  
  let activeTab = '';
  
  let eventData = {
    name: eventFromData?.name || 'Akad - Juni & Hermansyah',
    eventDate: eventFromData?.date || '',
    selectedVenues: eventFromData?.selectedVenues?.map(v => v.venueName) || [],
    selectedPax: eventFromData?.selectedVenues?.[0]?.selectedPax?.map(p => p.paxNumber) || []
  };
  
  let tempVenue = '';
  let tempPax = '';

  
  let selectedVenuesForPax = [];
  
  $: availablePaxForSelectedVenue = tempVenue ? getAvailablePaxForVenue(tempVenue) : [];
  
  $: availableVenuesForActivePax = activeTab ? 
    masterVenues.filter(venue => 
      venue.paxPrices.some(pp => pp.pax === parseInt(activeTab))
    ) : [];
  
  $: if (eventData.selectedPax.length > 0 && !activeTab) {
    activeTab = eventData.selectedPax[0].toString();
  }
  
  $: if (tempVenue && !eventData.selectedVenues.includes(tempVenue)) {
    eventData.selectedVenues = [...eventData.selectedVenues, tempVenue];
    tempVenue = '';
  }

  console.log(eventData.selectedVenues)
  
  $: if (tempPax && !eventData.selectedPax.includes(parseInt(tempPax))) {
    const paxNum = parseInt(tempPax);
    eventData.selectedPax = [...eventData.selectedPax, paxNum];
    tempPax = '';
    
    if (!paxData[paxNum]) {
      const defaultData = getDefaultDataForPax(paxNum);
      paxData[paxNum] = {
        selectedVenues: [],
        buffetType: '',
        buffetQuantity: paxNum,
        buffetItems: defaultData ? JSON.parse(JSON.stringify(defaultData.buffetItems)) : [],
        gubukanItems: defaultData ? JSON.parse(JSON.stringify(defaultData.gubukanItems)) : [],
        dekorasiVendor: '',
        dekorasiItems: [{ item: '', quantity: '', notes: '' }],
        riasBusanaVendor: '',
        riasBusanaItems: [{ item: '', quantity: '', notes: '' }],
        photoVideoVendor: '',
        photoVideoItems: [{ item: '', quantity: '', notes: '' }],
        entertainmentVendor: '',
        weddingOrganizerVendor: '',
        pendukungMc: '',
        pendukungUpacaraAdat: '',
        pendukungIntagiri: '',
        pendukungTarian: ''
      };
    }
  }
  
  let paxData = {};
  
  function removeVenue(venue) {
    eventData.selectedVenues = eventData.selectedVenues.filter(v => v !== venue);
  }
  
  function removePax(pax) {
    eventData.selectedPax = eventData.selectedPax.filter(p => p !== pax);
    if (activeTab === pax) {
      activeTab = eventData.selectedPax[0] || '';
    }
    delete paxData[pax];
  }
  
  function addVenueRow() {
    if (!paxData[activeTab]) {
      paxData[activeTab] = {
        selectedVenues: [],
        buffetType: '',
        buffetQuantity: activeTab,
        buffetItems: [],
        gubukanItems: []
      };
    }
    
    if (!paxData[activeTab].selectedVenues) {
      paxData[activeTab].selectedVenues = [];
    }
    
    paxData[activeTab].selectedVenues = [...paxData[activeTab].selectedVenues, { venueName: '', price: 0 }];
  }
  
  function removeVenueRow(index) {
    paxData[activeTab].selectedVenues = paxData[activeTab].selectedVenues.filter((_, i) => i !== index);
  }
  
  function handleVenueSelection(index, venueName) {
    const venue = masterVenues.find(v => v.venue === venueName);
    if (venue) {
      const paxPrice = venue.paxPrices.find(pp => pp.pax === parseInt(activeTab));
      if (paxPrice) {
        paxData[activeTab].selectedVenues[index] = {
          venueName: venueName,
          price: paxPrice.price
        };
      }
    }
  }
  
  function addBuffetRow() {
    if (!paxData[activeTab]) return;
    paxData[activeTab].buffetItems = [...paxData[activeTab].buffetItems, { category: '', menu: '' }];
  }
  
  function removeBuffetRow(index) {
    paxData[activeTab].buffetItems = paxData[activeTab].buffetItems.filter((_, i) => i !== index);
  }
  
  function addGubukanRow() {
    if (!paxData[activeTab]) return;
    paxData[activeTab].gubukanItems = [...paxData[activeTab].gubukanItems, { category: '', menu: '', quantity: 0, notes: '' }];
  }
  
  function removeGubukanRow(index) {
    paxData[activeTab].gubukanItems = paxData[activeTab].gubukanItems.filter((_, i) => i !== index);
  }
  
  function addDekorasiRow() {
    if (!paxData[activeTab]) return;
    paxData[activeTab].dekorasiItems = [...paxData[activeTab].dekorasiItems, { item: '', quantity: '', notes: '' }];
  }
  
  function removeDekorasiRow(index) {
    paxData[activeTab].dekorasiItems = paxData[activeTab].dekorasiItems.filter((_, i) => i !== index);
  }
  
  function addRiasBusanaRow() {
    if (!paxData[activeTab]) return;
    paxData[activeTab].riasBusanaItems = [...paxData[activeTab].riasBusanaItems, { item: '', quantity: '', notes: '' }];
  }
  
  function removeRiasBusanaRow(index) {
    paxData[activeTab].riasBusanaItems = paxData[activeTab].riasBusanaItems.filter((_, i) => i !== index);
  }
  
  function addPhotoVideoRow() {
    if (!paxData[activeTab]) return;
    paxData[activeTab].photoVideoItems = [...paxData[activeTab].photoVideoItems, { item: '', quantity: '', notes: '' }];
  }
  
  function removePhotoVideoRow(index) {
    paxData[activeTab].photoVideoItems = paxData[activeTab].photoVideoItems.filter((_, i) => i !== index);
  }
  
  function goBack() {
    goto(`/crm/${contactId}`);
  }
</script>

<div class="flex h-screen bg-gray-50">
  <Sidebar />
  
  <div class="flex-1 overflow-auto">
    <div class="max-w-7xl mx-auto px-8 py-6">
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
                {#each masterVenues as venue}
                  <option value={venue.venue}>{venue.venue}</option>
                {/each}
              </select>
            </div>
            <div class="flex flex-wrap gap-2">
              {#each eventData.selectedVenues as venue}
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800">
                  {venue}
                  <button on:click={() => removeVenue(venue)} class="ml-2 hover:text-amber-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              {/each}
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Pax</label>
            <div class="mb-2">
              <select
                bind:value={tempPax}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                
              >
                <option value="">Select pax</option>
                {#each masterPax as pax}
                  <option value={pax.pax}>{pax.pax}</option>
                {/each}
              </select>
            </div>
            <div class="flex flex-wrap gap-2">
              {#each eventData.selectedPax as pax}
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  {pax} Pax
                  <button on:click={() => removePax(pax)} class="ml-2 hover:text-blue-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              {/each}
            </div>
          </div>
        </div>
        
        {#if eventData.selectedPax.length > 0}
          <div class="mb-6">
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex space-x-8">
                {#each eventData.selectedPax as pax}
                  <button
                    on:click={() => activeTab = pax.toString()}
                    class="border-b-2 py-4 px-1 text-sm font-medium {activeTab === pax.toString() ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
                  >
                    {pax} Pax
                  </button>
                {/each}
              </nav>
            </div>
          </div>
          
          {#if activeTab && paxData[activeTab]}
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Venue Selection for {activeTab} Pax</h3>
                
                <div class="mb-4">
                  <button
                    on:click={addVenueRow}
                    class="text-amber-600 hover:text-amber-700 font-medium text-sm"
                  >
                    + Add Venue Row
                  </button>
                </div>
                
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      {#if paxData[activeTab].selectedVenues && paxData[activeTab].selectedVenues.length > 0}
                        {#each paxData[activeTab].selectedVenues as venueRow, index}
                          <tr>
                            <td class="px-4 py-3">
                              <select
                                bind:value={venueRow.venueName}
                                on:change={(e) => handleVenueSelection(index, e.target.value)}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              >
                                <option value="">Select venue</option>
                                {#each availableVenuesForActivePax as venue}
                                  <option value={venue.venue}>{venue.venue}</option>
                                {/each}
                              </select>
                            </td>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                value={venueRow.price ? `Rp ${venueRow.price.toLocaleString('id-ID')}` : ''}
                                disabled
                                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <button
                                on:click={() => removeVenueRow(index)}
                                class="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        {/each}
                      {:else}
                        <tr>
                          <td colspan="3" class="px-4 py-3 text-center text-gray-500">
                            No venues added. Click "Add Venue Row" to add venues.
                          </td>
                        </tr>
                      {/if}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Buffet</h3>
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      bind:value={paxData[activeTab].buffetType}
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select type</option>
                      {#each buffetData as buffet}
                        <option value={buffet.type}>{buffet.type}</option>
                      {/each}
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <input
                      type="number"
                      bind:value={paxData[activeTab].buffetQuantity}
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
                
                <div class="overflow-x-auto">
                  <table class="w-full mb-2">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Menu</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      {#if paxData[activeTab].buffetItems && paxData[activeTab].buffetItems.length > 0}
                        {#each paxData[activeTab].buffetItems as item, index}
                          <tr>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.category}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.menu}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <button
                                on:click={() => removeBuffetRow(index)}
                                class="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        {/each}
                      {:else}
                        <tr>
                          <td colspan="3" class="px-4 py-3 text-center text-gray-500">
                            Click "Add Row" to add items.
                          </td>
                        </tr>
                      {/if}
                    </tbody>
                  </table>
                </div>
                
                <button
                  on:click={addBuffetRow}
                  class="text-amber-600 hover:text-amber-700 font-medium text-sm"
                >
                  Add row
                </button>
              </div>
              
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Gubukan</h3>
                <div class="overflow-x-auto">
                  <table class="w-full mb-2">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Menu</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      {#if paxData[activeTab].gubukanItems && paxData[activeTab].gubukanItems.length > 0}
                        {#each paxData[activeTab].gubukanItems as item, index}
                          <tr>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.category}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.menu}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <input
                                type="number"
                                bind:value={item.quantity}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.notes}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <button
                                on:click={() => removeGubukanRow(index)}
                                class="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        {/each}
                      {:else}
                        <tr>
                          <td colspan="5" class="px-4 py-3 text-center text-gray-500">
                            Click "Add Row" to add items.
                          </td>
                        </tr>
                      {/if}
                    </tbody>
                  </table>
                </div>
                
                <button
                  on:click={addGubukanRow}
                  class="text-amber-600 hover:text-amber-700 font-medium text-sm"
                >
                  Add row
                </button>
              </div>
              
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Dekorasi</h3>
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                  <select
                    bind:value={paxData[activeTab].dekorasiVendor}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select vendor</option>
                    {#each dekorasiVendors as vendor}
                      <option value={vendor.name}>{vendor.name}</option>
                    {/each}
                  </select>
                </div>
                
                <div class="overflow-x-auto">
                  <table class="w-full mb-2">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      {#if paxData[activeTab].dekorasiItems && paxData[activeTab].dekorasiItems.length > 0}
                        {#each paxData[activeTab].dekorasiItems as item, index}
                          <tr>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.item}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.quantity}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.notes}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <button
                                on:click={() => removeDekorasiRow(index)}
                                class="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        {/each}
                      {:else}
                        <tr>
                          <td colspan="4" class="px-4 py-3 text-center text-gray-500">
                            Click "Add row" to add items.
                          </td>
                        </tr>
                      {/if}
                    </tbody>
                  </table>
                </div>
                
                <button
                  on:click={addDekorasiRow}
                  class="text-amber-600 hover:text-amber-700 font-medium text-sm"
                >
                  Add row
                </button>
              </div>
              
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Rias Busana</h3>
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                  <select
                    bind:value={paxData[activeTab].riasBusanaVendor}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select vendor</option>
                    {#each riasBusanaVendors as vendor}
                      <option value={vendor.name}>{vendor.name}</option>
                    {/each}
                  </select>
                </div>
                
                <div class="overflow-x-auto">
                  <table class="w-full mb-2">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      {#if paxData[activeTab].riasBusanaItems && paxData[activeTab].riasBusanaItems.length > 0}
                        {#each paxData[activeTab].riasBusanaItems as item, index}
                          <tr>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.item}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.quantity}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.notes}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <button
                                on:click={() => removeRiasBusanaRow(index)}
                                class="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        {/each}
                      {:else}
                        <tr>
                          <td colspan="4" class="px-4 py-3 text-center text-gray-500">
                            Click "Add row" to add items.
                          </td>
                        </tr>
                      {/if}
                    </tbody>
                  </table>
                </div>
                
                <button
                  on:click={addRiasBusanaRow}
                  class="text-amber-600 hover:text-amber-700 font-medium text-sm"
                >
                  Add row
                </button>
              </div>
              
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Photo & Video</h3>
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                  <select
                    bind:value={paxData[activeTab].photoVideoVendor}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select vendor</option>
                    {#each photoVideoVendors as vendor}
                      <option value={vendor.name}>{vendor.name}</option>
                    {/each}
                  </select>
                </div>
                
                <div class="overflow-x-auto">
                  <table class="w-full mb-2">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      {#if paxData[activeTab].photoVideoItems && paxData[activeTab].photoVideoItems.length > 0}
                        {#each paxData[activeTab].photoVideoItems as item, index}
                          <tr>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.item}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.quantity}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.notes}
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <button
                                on:click={() => removePhotoVideoRow(index)}
                                class="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        {/each}
                      {:else}
                        <tr>
                          <td colspan="4" class="px-4 py-3 text-center text-gray-500">
                            Click "Add row" to add items.
                          </td>
                        </tr>
                      {/if}
                    </tbody>
                  </table>
                </div>
                
                <button
                  on:click={addPhotoVideoRow}
                  class="text-amber-600 hover:text-amber-700 font-medium text-sm"
                >
                  Add row
                </button>
              </div>
              
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-4">Entertainment</h3>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                    <select
                      bind:value={paxData[activeTab].entertainmentVendor}
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select vendor</option>
                      {#each entertainmentVendors as vendor}
                        <option value={vendor.name}>{vendor.name}</option>
                      {/each}
                    </select>
                  </div>
                </div>
                
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-4">Wedding Organizer</h3>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                    <select
                      bind:value={paxData[activeTab].weddingOrganizerVendor}
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select vendor</option>
                      {#each weddingOrganizerVendors as vendor}
                        <option value={vendor.name}>{vendor.name}</option>
                      {/each}
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Pendukung</h3>
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">MC</label>
                    <select
                      bind:value={paxData[activeTab].pendukungMc}
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select MC</option>
                      {#each mcData as mc}
                        <option value={mc.name}>{mc.name}</option>
                      {/each}
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Upacara Adat</label>
                    <select
                      bind:value={paxData[activeTab].pendukungUpacaraAdat}
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select Upacara Adat</option>
                      {#each upacaraAdatData as upacara}
                        <option value={upacara.name}>{upacara.name}</option>
                      {/each}
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Iringan</label>
                    <select
                      bind:value={paxData[activeTab].pendukungIntagiri}
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select Iringan</option>
                      {#each intagiriData as intagiri}
                        <option value={intagiri.name}>{intagiri.name}</option>
                      {/each}
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tarian</label>
                    <select
                      bind:value={paxData[activeTab].pendukungTarian}
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select Tarian</option>
                      {#each tarianData as tarian}
                        <option value={tarian.name}>{tarian.name}</option>
                      {/each}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          {/if}
        {:else}
          <div class="text-center py-12 text-gray-500">
            Please select at least one pax number to continue
          </div>
        {/if}
        
        {#if eventData.selectedPax.length > 0}
          <div class="mt-8 flex justify-end">
            <button
              on:click={() => goto(`/crm/${contactId}/event/${eventId}/contract`)}
              class="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors font-medium"
            >
              Proceed to Contract
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>