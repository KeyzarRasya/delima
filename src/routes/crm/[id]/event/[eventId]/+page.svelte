<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { masterVenues, getPaxForVenue, venueHasPax } from '$lib/data/masterVenues.js';
  import { masterPax } from '$lib/data/masterPax.js';
  import { crmContacts } from '$lib/data/crmData.js';
  import { 
    dekorasiVendors, 
    riasBusanaVendors, 
    photoVideoVendors, 
    entertainmentVendors,
    weddingOrganizerVendors 
  } from '$lib/data/vendorData.js';
  import { mcData, upacaraAdatData, intagiriData, tarianData } from '$lib/data/pendukungData.js';
  import { buffetData, gubukanBasicData } from '$lib/data/cateringData.js';
  
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
  
  $: availablePaxForSelectedVenue = tempVenue ? getPaxForVenue(tempVenue) : [];
  
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
      eventData.selectedPax = [...eventData.selectedPax, parseInt(tempPax)];
      tempPax = '';
    }
  }
  
  $: venuesForDisplay = masterVenues
    .filter(venue => 
      venue.paxPrices.some(pp => eventData.selectedPax.includes(pp.pax))
    )
    .map(venue => ({
      ...venue,
      paxPrices: venue.paxPrices.filter(pp => eventData.selectedPax.includes(pp.pax))
    }));
  
  let paxData = {};
  
  $: {
    eventData.selectedPax.forEach(pax => {
      if (!paxData[pax]) {
        paxData[pax] = {
          buffetType: '',
          buffetQuantity: pax,
          buffetItems: [{ category: '', menu: '', notes: '' }],
          gubukanItems: [{ category: '', menu: '', quantity: '', notes: '' }],
          dekorasiVendor: '',
          dekorasiItems: [{ item: '', quantity: '', notes: '' }],
          riasBusanaVendor: '',
          riasBusanaItems: [{ item: '', quantity: '', notes: '' }],
          photoVideoVendor: '',
          photoVideoItems: [{ item: '', quantity: '', notes: '' }],
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
    });
  }
  
  function removeVenue(venue) {
    eventData.selectedVenues = eventData.selectedVenues.filter(v => v !== venue);
  }
  
  function removePax(pax) {
    eventData.selectedPax = eventData.selectedPax.filter(p => p !== pax);
    delete paxData[pax];
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
  
  function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
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
            <section>
              <h2 class="text-lg font-bold text-gray-800 mb-4">Buffet</h2>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Type</label>
                  <select
                    bind:value={paxData[activeTab].buffetType}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select buffet type</option>
                    {#each buffetData as buffet}
                      <option value={buffet.tipe}>{buffet.tipe}</option>
                    {/each}
                  </select>
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Quantity</label>
                  <input
                    type="number"
                    bind:value={paxData[activeTab].buffetQuantity}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </section>
            
            <section>
              <h2 class="text-lg font-bold text-gray-800 mb-4">Buffet - Pendukung</h2>
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
                    {#each paxData[activeTab].buffetItems as item, index}
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
                          <button on:click={() => removeBuffetRow(activeTab, index)} class="text-red-500 hover:text-red-700">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
                <button on:click={() => addBuffetRow(activeTab)} class="mt-2 text-amber-700 hover:text-amber-800 font-medium text-sm">
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
                      <th class="text-left text-sm font-medium text-gray-600 pb-2">Quantity</th>
                      <th class="text-left text-sm font-medium text-gray-600 pb-2">Notes</th>
                      <th class="w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {#each paxData[activeTab].gubukanItems as item, index}
                      <tr>
                        <td class="pr-2 py-2">
                          <select
                            bind:value={item.category}
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          >
                            <option value="">Select category</option>
                            {#each [...new Set(gubukanBasicData.map(g => g.category))] as cat}
                              <option value={cat}>{cat}</option>
                            {/each}
                          </select>
                        </td>
                        <td class="pr-2 py-2">
                          <select
                            bind:value={item.menu}
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          >
                            <option value="">Select menu</option>
                            {#each gubukanBasicData.filter(g => g.category === item.category) as menuItem}
                              <option value={menuItem.item}>{menuItem.item}</option>
                            {/each}
                          </select>
                        </td>
                        <td class="pr-2 py-2">
                          <input
                            type="number"
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
                          <button on:click={() => removeGubukanRow(activeTab, index)} class="text-red-500 hover:text-red-700">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
                <button on:click={() => addGubukanRow(activeTab)} class="mt-2 text-amber-700 hover:text-amber-800 font-medium text-sm">
                  Add row
                </button>
              </div>
            </section>
            
            <section>
              <h2 class="text-lg font-bold text-gray-800 mb-4">Dekorasi</h2>
              <div class="mb-4">
                <label class="block text-sm text-gray-600 mb-1">Vendor</label>
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
            </section>
            
            <section>
              <h2 class="text-lg font-bold text-gray-800 mb-4">Rias dan Busana</h2>
              <div class="mb-4">
                <label class="block text-sm text-gray-600 mb-1">Vendor</label>
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
            </section>
            
            <section>
              <h2 class="text-lg font-bold text-gray-800 mb-4">Photo dan Video</h2>
              <div class="mb-4">
                <label class="block text-sm text-gray-600 mb-1">Vendor</label>
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
            </section>
            
            <section>
              <h2 class="text-lg font-bold text-gray-800 mb-4">Entertainment</h2>
              <div class="mb-4">
                <label class="block text-sm text-gray-600 mb-1">Vendor</label>
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
            </section>
            
            <section>
              <h2 class="text-lg font-bold text-gray-800 mb-4">Pendukung</h2>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-gray-600 mb-1">MC</label>
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
                  <label class="block text-sm text-gray-600 mb-1">Upacara Adat</label>
                  <select
                    bind:value={paxData[activeTab].pendukungUpacaraAdat}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select ceremony</option>
                    {#each upacaraAdatData as upacara}
                      <option value={upacara.name}>{upacara.name}</option>
                    {/each}
                  </select>
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Intagiri</label>
                  <select
                    bind:value={paxData[activeTab].pendukungIntagiri}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select intagiri</option>
                    {#each intagiriData as intagiri}
                      <option value={intagiri.name}>{intagiri.name}</option>
                    {/each}
                  </select>
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Tarian</label>
                  <select
                    bind:value={paxData[activeTab].pendukungTarian}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select dance</option>
                    {#each tarianData as tarian}
                      <option value={tarian.name}>{tarian.name}</option>
                    {/each}
                  </select>
                </div>
              </div>
            </section>
          </div>
        {/if}
        
        {#if eventData.selectedPax.length > 0}
          <div class="mt-8">
            <h2 class="text-lg font-bold text-gray-800 mb-4">Venue Prices</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b">
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Venue</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Pax</th>
                    <th class="text-left text-sm font-medium text-gray-600 pb-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {#each venuesForDisplay as venue}
                    {#each venue.paxPrices as paxPrice}
                      <tr>
                        <td class="pr-2 py-2 text-sm">{venue.venue}</td>
                        <td class="pr-2 py-2 text-sm">{paxPrice.pax} Pax</td>
                        <td class="pr-2 py-2 text-sm">{formatCurrency(paxPrice.price)}</td>
                      </tr>
                    {/each}
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        {/if}
        
        <div class="flex justify-end gap-4 mt-8">
          <button
            on:click={goBack}
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
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