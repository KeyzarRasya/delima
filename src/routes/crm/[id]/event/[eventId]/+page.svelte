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
  
  $: {
    if (eventData.selectedPax.length > 0 && !eventData.selectedPax.includes(activeTab)) {
      activeTab = eventData.selectedPax[0];
    } else if (eventData.selectedPax.length === 0) {
      activeTab = '';
    }
  }
  
  $: {
    if (tempVenue && !eventData.selectedVenues.includes(tempVenue)) {
      eventData.selectedVenues = [...eventData.selectedVenues, tempVenue];
      tempVenue = '';
    }
  }
  
  $: {
    if (tempPax && !eventData.selectedPax.includes(parseInt(tempPax))) {
      const paxNumber = parseInt(tempPax);
      eventData.selectedPax = [...eventData.selectedPax, paxNumber];
      
      const defaultData = getDefaultDataForPax(paxNumber);
      if (defaultData && !paxData[paxNumber]) {
        paxData[paxNumber] = {
          selectedVenues: [],
          buffetType: '',
          buffetQuantity: paxNumber,
          buffetItems: JSON.parse(JSON.stringify(defaultData.buffetItems)),
          gubukanItems: JSON.parse(JSON.stringify(defaultData.gubukanItems)),
          dekorasiVendor: '',
          dekorasiItems: JSON.parse(JSON.stringify(defaultData.dekorasiItems)),
          riasBusanaVendor: '',
          riasBusanaItems: JSON.parse(JSON.stringify(defaultData.riasBusanaItems)),
          photoVideoVendor: '',
          photoVideoItems: JSON.parse(JSON.stringify(defaultData.photoVideoItems)),
          entertainmentVendor: '',
          entertainmentType: '',
          weddingOrganizerVendor: '',
          weddingOrganizerPackage: '',
          pendukungMc: '',
          pendukungUpacaraAdat: '',
          pendukungIntagiri: '',
          pendukungTarian: ''
        };
      }
      
      tempPax = '';
      if (!activeTab) {
        activeTab = paxNumber;
      }
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
  
  function goBack() {
    goto(`/crm/${contactId}`);
  }
  
  function handleDekorasiVendorChange() {
    if (!paxData[activeTab]) return;
    const vendor = dekorasiVendors.find(v => v.vendor === paxData[activeTab].dekorasiVendor);
    if (vendor) {
      paxData[activeTab].dekorasiItems = vendor.items.map(item => ({
        item: item.item,
        selected: false
      }));
    }
  }
  
  function handleRiasBusanaVendorChange() {
    if (!paxData[activeTab]) return;
    const vendor = riasBusanaVendors.find(v => v.vendor === paxData[activeTab].riasBusanaVendor);
    if (vendor) {
      paxData[activeTab].riasBusanaItems = vendor.items.map(item => ({
        item: item.item,
        selected: false
      }));
    }
  }
  
  function handlePhotoVideoVendorChange() {
    if (!paxData[activeTab]) return;
    const vendor = photoVideoVendors.find(v => v.vendor === paxData[activeTab].photoVideoVendor);
    if (vendor) {
      paxData[activeTab].photoVideoItems = vendor.items.map(item => ({
        item: item.item,
        selected: false
      }));
    }
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
            <label class="block text-sm font-medium text-gray-700 mb-2">Number of Pax</label>
            <div class="mb-2">
              <select
                bind:value={tempPax}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Select pax</option>
                {#each masterPax as paxOption}
                  <option value={paxOption.pax}>{paxOption.pax} Pax</option>
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
        
        {#if eventData.selectedPax.length > 0}
          <div class="border-b border-gray-200 mb-6">
            <nav class="-mb-px flex space-x-8">
              {#each eventData.selectedPax as pax}
                <button
                  on:click={() => activeTab = pax}
                  class="py-4 px-1 border-b-2 font-medium text-sm transition-colors {activeTab === pax ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
                >
                  {pax} Pax
                </button>
              {/each}
            </nav>
          </div>
          
          {#if activeTab}
            <div class="space-y-8">
              <div>
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-semibold text-gray-800">Venue</h3>
                  <button
                    on:click={addVenueRow}
                    class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors text-sm"
                  >
                    Add Row
                  </button>
                </div>
                
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-300">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Venue Name
                        </th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Price
                        </th>
                        <th class="px-4 py-3 w-20 border-b"></th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      {#if paxData[activeTab]?.selectedVenues && paxData[activeTab].selectedVenues.length > 0}
                        {#each paxData[activeTab].selectedVenues as venueRow, index}
                          <tr>
                            <td class="px-4 py-3">
                              <select
                                value={venueRow.venueName}
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
                                readonly
                                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <button
                                on:click={() => removeVenueRow(index)}
                                class="text-red-600 hover:text-red-800"
                              >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        {/each}
                      {:else}
                        <tr>
                          <td colspan="3" class="px-4 py-8 text-center text-gray-500">
                            No venues added. Click "Add Row" or select from dropdown to add venues.
                          </td>
                        </tr>
                      {/if}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-semibold text-gray-800">Buffet</h3>
                  <button
                    on:click={addBuffetRow}
                    class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors text-sm"
                  >
                    Add Row
                  </button>
                </div>
                
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
                  <table class="min-w-full border border-gray-300">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Category
                        </th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Menu
                        </th>
                        <th class="px-4 py-3 w-20 border-b"></th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      {#if paxData[activeTab]?.buffetItems && paxData[activeTab].buffetItems.length > 0}
                        {#each paxData[activeTab].buffetItems as item, index}
                          <tr>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.category}
                                placeholder="Category"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.menu}
                                placeholder="Menu"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <button
                                on:click={() => removeBuffetRow(index)}
                                class="text-red-600 hover:text-red-800"
                              >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        {/each}
                      {:else}
                        <tr>
                          <td colspan="3" class="px-4 py-8 text-center text-gray-500">
                            No buffet items added. Click "Add Row" to add items.
                          </td>
                        </tr>
                      {/if}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-semibold text-gray-800">Gubukan</h3>
                  <button
                    on:click={addGubukanRow}
                    class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors text-sm"
                  >
                    Add Row
                  </button>
                </div>
                
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-300">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Category
                        </th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Menu
                        </th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Quantity
                        </th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                          Notes
                        </th>
                        <th class="px-4 py-3 w-20 border-b"></th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      {#if paxData[activeTab]?.gubukanItems && paxData[activeTab].gubukanItems.length > 0}
                        {#each paxData[activeTab].gubukanItems as item, index}
                          <tr>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.category}
                                placeholder="Category"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.menu}
                                placeholder="Menu"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <input
                                type="number"
                                bind:value={item.quantity}
                                placeholder="Quantity"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <input
                                type="text"
                                bind:value={item.notes}
                                placeholder="Notes"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <button
                                on:click={() => removeGubukanRow(index)}
                                class="text-red-600 hover:text-red-800"
                              >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        {/each}
                      {:else}
                        <tr>
                          <td colspan="5" class="px-4 py-8 text-center text-gray-500">
                            No gubukan items added. Click "Add Row" to add items.
                          </td>
                        </tr>
                      {/if}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-4">Dekorasi</h3>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                    <select
                      bind:value={paxData[activeTab].dekorasiVendor}
                      on:change={handleDekorasiVendorChange}
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select vendor</option>
                      {#each dekorasiVendors as vendor}
                        <option value={vendor.vendor}>{vendor.vendor}</option>
                      {/each}
                    </select>
                  </div>
                  {#if paxData[activeTab]?.dekorasiItems && paxData[activeTab].dekorasiItems.length > 0}
                    <div class="space-y-2">
                      {#each paxData[activeTab].dekorasiItems as item}
                        <label class="flex items-center">
                          <input
                            type="checkbox"
                            bind:checked={item.selected}
                            class="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                          />
                          <span class="ml-2 text-sm text-gray-700">{item.item}</span>
                        </label>
                      {/each}
                    </div>
                  {/if}
                </div>
                
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-4">Rias Busana</h3>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                    <select
                      bind:value={paxData[activeTab].riasBusanaVendor}
                      on:change={handleRiasBusanaVendorChange}
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select vendor</option>
                      {#each riasBusanaVendors as vendor}
                        <option value={vendor.vendor}>{vendor.vendor}</option>
                      {/each}
                    </select>
                  </div>
                  {#if paxData[activeTab]?.riasBusanaItems && paxData[activeTab].riasBusanaItems.length > 0}
                    <div class="space-y-2">
                      {#each paxData[activeTab].riasBusanaItems as item}
                        <label class="flex items-center">
                          <input
                            type="checkbox"
                            bind:checked={item.selected}
                            class="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                          />
                          <span class="ml-2 text-sm text-gray-700">{item.item}</span>
                        </label>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>
              
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Photo Video</h3>
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                  <select
                    bind:value={paxData[activeTab].photoVideoVendor}
                    on:change={handlePhotoVideoVendorChange}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select vendor</option>
                    {#each photoVideoVendors as vendor}
                      <option value={vendor.vendor}>{vendor.vendor}</option>
                    {/each}
                  </select>
                </div>
                {#if paxData[activeTab]?.photoVideoItems && paxData[activeTab].photoVideoItems.length > 0}
                  <div class="space-y-2">
                    {#each paxData[activeTab].photoVideoItems as item}
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          bind:checked={item.selected}
                          class="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                        />
                        <span class="ml-2 text-sm text-gray-700">{item.item}</span>
                      </label>
                    {/each}
                  </div>
                {/if}
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