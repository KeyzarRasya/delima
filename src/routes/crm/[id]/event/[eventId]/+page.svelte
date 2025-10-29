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
  
  $: availablePaxForSelectedVenue = tempVenue ? getAvailablePaxForVenue(tempVenue) : [];
  
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
    delete paxData[pax];
    if (activeTab === pax) {
      activeTab = eventData.selectedPax[0] || '';
    }
  }
  
  function addBuffetRow(pax) {
    paxData[pax].buffetItems = [...paxData[pax].buffetItems, { category: '', menu: '', notes: '' }];
  }
  
  function removeBuffetRow(pax, index) {
    paxData[pax].buffetItems = paxData[pax].buffetItems.filter((_, i) => i !== index);
  }
  
  function addGubukanRow(pax) {
    paxData[pax].gubukanItems = [...paxData[pax].gubukanItems, { category: '', menu: '', quantity: '', notes: '' }];
  }
  
  function removeGubukanRow(pax, index) {
    paxData[pax].gubukanItems = paxData[pax].gubukanItems.filter((_, i) => i !== index);
  }
  
  function addDekorasiRow(pax) {
    paxData[pax].dekorasiItems = [...paxData[pax].dekorasiItems, { item: '', quantity: '', notes: '' }];
  }
  
  function removeDekorasiRow(pax, index) {
    paxData[pax].dekorasiItems = paxData[pax].dekorasiItems.filter((_, i) => i !== index);
  }
  
  function addRiasBusanaRow(pax) {
    paxData[pax].riasBusanaItems = [...paxData[pax].riasBusanaItems, { item: '', quantity: '', notes: '' }];
  }
  
  function removeRiasBusanaRow(pax, index) {
    paxData[pax].riasBusanaItems = paxData[pax].riasBusanaItems.filter((_, i) => i !== index);
  }
  
  function addPhotoVideoRow(pax) {
    paxData[pax].photoVideoItems = [...paxData[pax].photoVideoItems, { item: '', quantity: '', notes: '' }];
  }
  
  function removePhotoVideoRow(pax, index) {
    paxData[pax].photoVideoItems = paxData[pax].photoVideoItems.filter((_, i) => i !== index);
  }
  
  function goBack() {
    goto(`/crm/${contactId}`);
  }
  
  function proceedToContract() {
    goto(`/crm/${contactId}/event/${eventId}/contract`);
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
                {#each masterVenues as venue}
                  <option value={venue.venue}>{venue.venue}</option>
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
                {#each masterPax as pax}
                  <option value={pax.pax}>{pax.pax} Pax</option>
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
          {/if}
        </div>
        
        {#if activeTab && paxData[activeTab]}
          <div class="space-y-8">
            <div class="border-b pb-8">
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
              
              <div class="space-y-2">
                <div class="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700 mb-2">
                  <div>Category</div>
                  <div>Menu</div>
                  <div>Notes</div>
                </div>
                
                {#each paxData[activeTab].buffetItems as item, index}
                  <div class="grid grid-cols-3 gap-4 items-center">
                    <input
                      type="text"
                      bind:value={item.category}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      type="text"
                      bind:value={item.menu}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <div class="flex gap-2">
                      <input
                        type="text"
                        bind:value={item.notes}
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      {#if paxData[activeTab].buffetItems.length > 1}
                        <button
                          on:click={() => removeBuffetRow(activeTab, index)}
                          class="text-red-500 hover:text-red-700"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
              
              <button
                on:click={() => addBuffetRow(activeTab)}
                class="mt-3 text-amber-600 hover:text-amber-700 font-medium text-sm"
              >
                Add row
              </button>
            </div>
            
            <div class="border-b pb-8">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Gubukan</h3>
              
              <div class="space-y-2">
                <div class="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700 mb-2">
                  <div>Category</div>
                  <div>Menu</div>
                  <div>Quantity</div>
                  <div>Notes</div>
                </div>
                
                {#each paxData[activeTab].gubukanItems as item, index}
                  <div class="grid grid-cols-4 gap-4 items-center">
                    <input
                      type="text"
                      bind:value={item.category}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      type="text"
                      bind:value={item.menu}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      type="text"
                      bind:value={item.quantity}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <div class="flex gap-2">
                      <input
                        type="text"
                        bind:value={item.notes}
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      {#if paxData[activeTab].gubukanItems.length > 1}
                        <button
                          on:click={() => removeGubukanRow(activeTab, index)}
                          class="text-red-500 hover:text-red-700"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
              
              <button
                on:click={() => addGubukanRow(activeTab)}
                class="mt-3 text-amber-600 hover:text-amber-700 font-medium text-sm"
              >
                Add row
              </button>
            </div>
            
            <div class="border-b pb-8">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Dekorasi</h3>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                <select
                  bind:value={paxData[activeTab].dekorasiVendor}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select vendor</option>
                  {#each dekorasiVendors as vendor}
                    <option value={vendor.vendor}>{vendor.vendor}</option>
                  {/each}
                </select>
              </div>
              
              <div class="space-y-2">
                <div class="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700 mb-2">
                  <div>Item</div>
                  <div>Quantity</div>
                  <div>Notes</div>
                </div>
                
                {#each paxData[activeTab].dekorasiItems as item, index}
                  <div class="grid grid-cols-3 gap-4 items-center">
                    <input
                      type="text"
                      bind:value={item.item}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      type="text"
                      bind:value={item.quantity}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <div class="flex gap-2">
                      <input
                        type="text"
                        bind:value={item.notes}
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      {#if paxData[activeTab].dekorasiItems.length > 1}
                        <button
                          on:click={() => removeDekorasiRow(activeTab, index)}
                          class="text-red-500 hover:text-red-700"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
              
              <button
                on:click={() => addDekorasiRow(activeTab)}
                class="mt-3 text-amber-600 hover:text-amber-700 font-medium text-sm"
              >
                Add row
              </button>
            </div>
            
            <div class="border-b pb-8">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Rias dan Busana</h3>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                <select
                  bind:value={paxData[activeTab].riasBusanaVendor}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select vendor</option>
                  {#each riasBusanaVendors as vendor}
                    <option value={vendor.vendor}>{vendor.vendor}</option>
                  {/each}
                </select>
              </div>
              
              <div class="space-y-2">
                <div class="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700 mb-2">
                  <div>Item</div>
                  <div>Quantity</div>
                  <div>Notes</div>
                </div>
                
                {#each paxData[activeTab].riasBusanaItems as item, index}
                  <div class="grid grid-cols-3 gap-4 items-center">
                    <input
                      type="text"
                      bind:value={item.item}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      type="text"
                      bind:value={item.quantity}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <div class="flex gap-2">
                      <input
                        type="text"
                        bind:value={item.notes}
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      {#if paxData[activeTab].riasBusanaItems.length > 1}
                        <button
                          on:click={() => removeRiasBusanaRow(activeTab, index)}
                          class="text-red-500 hover:text-red-700"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
              
              <button
                on:click={() => addRiasBusanaRow(activeTab)}
                class="mt-3 text-amber-600 hover:text-amber-700 font-medium text-sm"
              >
                Add row
              </button>
            </div>
            
            <div class="border-b pb-8">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Photo dan Video</h3>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                <select
                  bind:value={paxData[activeTab].photoVideoVendor}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select vendor</option>
                  {#each photoVideoVendors as vendor}
                    <option value={vendor.vendor}>{vendor.vendor}</option>
                  {/each}
                </select>
              </div>
              
              <div class="space-y-2">
                <div class="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700 mb-2">
                  <div>Item</div>
                  <div>Quantity</div>
                  <div>Notes</div>
                </div>
                
                {#each paxData[activeTab].photoVideoItems as item, index}
                  <div class="grid grid-cols-3 gap-4 items-center">
                    <input
                      type="text"
                      bind:value={item.item}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      type="text"
                      bind:value={item.quantity}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <div class="flex gap-2">
                      <input
                        type="text"
                        bind:value={item.notes}
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      {#if paxData[activeTab].photoVideoItems.length > 1}
                        <button
                          on:click={() => removePhotoVideoRow(activeTab, index)}
                          class="text-red-500 hover:text-red-700"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
              
              <button
                on:click={() => addPhotoVideoRow(activeTab)}
                class="mt-3 text-amber-600 hover:text-amber-700 font-medium text-sm"
              >
                Add row
              </button>
            </div>
            
            <div class="border-b pb-8">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Entertainment & Wedding Organizer</h3>
              
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Entertainment</label>
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
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Wedding Organizer</label>
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
                  <input
                    type="text"
                    bind:value={paxData[activeTab].pendukungMc}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Upacara Adat</label>
                  <input
                    type="text"
                    bind:value={paxData[activeTab].pendukungUpacaraAdat}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Integri</label>
                  <input
                    type="text"
                    bind:value={paxData[activeTab].pendukungIntagiri}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tarian</label>
                  <input
                    type="text"
                    bind:value={paxData[activeTab].pendukungTarian}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        {/if}
        
        <div class="mt-8 flex justify-end">
          <button
            on:click={proceedToContract}
            class="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Proceed to Contract
          </button>
        </div>
      </div>
    </div>
  </main>
</div>