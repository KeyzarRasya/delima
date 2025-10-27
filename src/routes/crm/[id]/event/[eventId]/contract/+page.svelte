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
  
  // Update History data (readonly)
  let updateHistory = [
    {
      date: '2024-01-15',
      documents: [
        { name: 'Update Banquet', url: '#' }
      ]
    },
    {
      date: '2024-01-10',
      documents: [
        { name: 'Change Vendor', url: '#' }
      ]
    }
  ];
  
  // Rincian Biaya data
  let rincianBiayaSections = [
    {
      name: 'Item',
      items: []
    }
  ];
  
  let unassignedProducts = [];
  
  let historyPembayaran = [
    { date: '', method: '', amount: '', status: 'In Payment' }
  ];
  
  let rincianBiayaTotal = 0;
  let totalPembayaran = 0;
  let sisaTagihan = 0;
  
  let draggedItem = null;
  let draggedFromSection = null;
  let draggedItemIndex = null;
  let draggedFromUnassigned = false;
  
  // Reactive calculation for Rincian Biaya total
  $: {
    const sectionsTotal = rincianBiayaSections.reduce((sectionSum, section) => {
      const itemsTotal = section.items.reduce((itemSum, item) => {
        const total = parseFloat(item.total) || 0;
        return itemSum + total;
      }, 0);
      return sectionSum + itemsTotal;
    }, 0);
    
    const unassignedTotal = unassignedProducts.reduce((sum, product) => {
      const total = parseFloat(product.total) || 0;
      return sum + total;
    }, 0);
    
    rincianBiayaTotal = sectionsTotal + unassignedTotal;
  }
  
  // Reactive calculation for Total Pembayaran
  $: {
    totalPembayaran = historyPembayaran.reduce((sum, payment) => {
      const amount = parseFloat(payment.amount) || 0;
      return sum + amount;
    }, 0);
  }
  
  // Reactive calculation for Sisa Tagihan
  $: {
    sisaTagihan = rincianBiayaTotal - totalPembayaran;
  }
  
  function calculateItemTotal(sectionIndex, itemIndex) {
    const item = rincianBiayaSections[sectionIndex].items[itemIndex];
    const quantity = parseFloat(item.quantity) || 0;
    const price = parseFloat(item.price) || 0;
    rincianBiayaSections[sectionIndex].items[itemIndex].total = quantity * price;
  }
  
  function calculateUnassignedTotal(index) {
    const product = unassignedProducts[index];
    const quantity = parseFloat(product.quantity) || 0;
    const price = parseFloat(product.price) || 0;
    unassignedProducts[index].total = quantity * price;
  }
  
  function toggleItemVisibility(sectionIndex, itemIndex) {
    rincianBiayaSections[sectionIndex].items[itemIndex].visible = !rincianBiayaSections[sectionIndex].items[itemIndex].visible;
  }
  
  function handleDragStart(e, sectionIndex, itemIndex) {
    draggedItem = rincianBiayaSections[sectionIndex].items[itemIndex];
    draggedFromSection = sectionIndex;
    draggedItemIndex = itemIndex;
    draggedFromUnassigned = false;
  }
  
  function handleDragStartUnassigned(e, index) {
    draggedItem = unassignedProducts[index];
    draggedItemIndex = index;
    draggedFromUnassigned = true;
    draggedFromSection = null;
  }
  
  function handleDragOver(e) {
    e.preventDefault();
  }
  
  function handleDrop(e, targetSectionIndex) {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    // Remove from original location
    if (draggedFromUnassigned) {
      unassignedProducts = unassignedProducts.filter((_, i) => i !== draggedItemIndex);
    } else if (draggedFromSection !== null) {
      rincianBiayaSections[draggedFromSection].items = rincianBiayaSections[draggedFromSection].items.filter((_, i) => i !== draggedItemIndex);
    }
    
    // Add to target section
    rincianBiayaSections[targetSectionIndex].items = [...rincianBiayaSections[targetSectionIndex].items, draggedItem];
    
    // Reset drag state
    draggedItem = null;
    draggedFromSection = null;
    draggedItemIndex = null;
    draggedFromUnassigned = false;
  }
  
  function addProduct() {
    unassignedProducts = [...unassignedProducts, { name: '', quantity: 1, price: 0, total: 0, visible: true }];
  }
  
  function addSection() {
    const newSectionNumber = rincianBiayaSections.length + 1;
    rincianBiayaSections = [...rincianBiayaSections, {
      name: `Section ${newSectionNumber}`,
      items: []
    }];
  }
  
  function removeSection(sectionIndex) {
    rincianBiayaSections = rincianBiayaSections.filter((_, i) => i !== sectionIndex);
  }
  
  function removeItem(sectionIndex, itemIndex) {
    rincianBiayaSections[sectionIndex].items = rincianBiayaSections[sectionIndex].items.filter((_, i) => i !== itemIndex);
  }
  
  function removeUnassignedProduct(index) {
    unassignedProducts = unassignedProducts.filter((_, i) => i !== index);
  }
  
  function addPaymentLine() {
    historyPembayaran = [...historyPembayaran, { date: '', method: '', amount: '', status: 'In Payment' }];
  }
  
  function removePaymentLine(index) {
    historyPembayaran = historyPembayaran.filter((_, i) => i !== index);
  }
  
  function formatCurrency(value) {
    if (!value) return 'Rp 0.00';
    return `Rp ${parseFloat(value).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  
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
  
  function handleCreateBanquet() {
    goto(`/crm/${contactId}/event/${eventId}/contract/banquet`);
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
                        <button on:click={handleCreateBanquet} class="px-3 py-1.5 bg-amber-600 text-white rounded-md text-sm font-medium hover:bg-amber-700">
                          Create Banquet Delima
                        </button>
                        <button class="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                          Process Book
                        </button>
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
                      <button class="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                        Process Book
                      </button>
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
                      <button class="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                        Process Book
                      </button>
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
                      <button class="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                        Process Book
                      </button>
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
                        <button class="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                          Process Book
                        </button>
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
                        <button class="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                          Process Book
                        </button>
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
                    <button class="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                      Process Book
                    </button>
                  </div>
                  
                  <div class="flex items-center gap-4">
                    <span class="text-gray-800 text-sm w-32">Upacara Adat</span>
                    <select bind:value={pendukungUpacaraAdat} class="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                      <option value="">Type 1</option>
                      <option value="type2">Type 2</option>
                      <option value="type3">Type 3</option>
                    </select>
                    <button class="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                      Process Book
                    </button>
                  </div>
                  
                  <div class="flex items-center gap-4">
                    <span class="text-gray-800 text-sm w-32">Intagiri</span>
                    <select bind:value={pendukungIntagiri} class="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                      <option value="">Type 1</option>
                      <option value="type2">Type 2</option>
                      <option value="type3">Type 3</option>
                    </select>
                    <button class="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                      Process Book
                    </button>
                  </div>
                  
                  <div class="flex items-center gap-4">
                    <span class="text-gray-800 text-sm w-32">Tarian</span>
                    <select bind:value={pendukungTarian} class="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                      <option value="">Type 1</option>
                      <option value="type2">Type 2</option>
                      <option value="type3">Type 3</option>
                    </select>
                    <button class="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                      Process Book
                    </button>
                  </div>
                </div>
              </section>
            </div>
            
            <div class="flex justify-end mt-8 pt-6 border-t">
              <button
                on:click={handleSave}
                class="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium"
              >
                Save
              </button>
            </div>
          {:else if activeTab === 'rincian-biaya'}
            <div class="space-y-8">
              <section>
                <div class="overflow-x-auto">
                  <table class="min-w-full">
                    <thead>
                      <tr>
                        <th class="text-left text-sm font-medium text-gray-600 pb-3 px-2">No</th>
                        <th class="text-left text-sm font-medium text-gray-600 pb-3 px-2">Item</th>
                        <th class="text-left text-sm font-medium text-gray-600 pb-3 px-2">Qty</th>
                        <th class="text-left text-sm font-medium text-gray-600 pb-3 px-2">Harga</th>
                        <th class="text-left text-sm font-medium text-gray-600 pb-3 px-2">Total Harga Items</th>
                        <th class="text-left text-sm font-medium text-gray-600 pb-3 px-2">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {#each rincianBiayaSections as section, sectionIndex}
                        <tr class="bg-gray-100">
                          <td class="py-3 px-2 font-semibold text-gray-800">{sectionIndex + 1}</td>
                          <td class="py-3 px-2" colspan="4">
                            <input
                              type="text"
                              bind:value={section.name}
                              placeholder="Section name..."
                              class="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                            />
                          </td>
                          <td class="py-3 px-2">
                            <button on:click={() => removeSection(sectionIndex)} class="text-red-500 hover:text-red-700 transition-colors">
                              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                        
                        {#if section.items.length === 0}
                          <tr 
                            class="hover:bg-amber-50 transition-colors"
                            on:dragover={(e) => handleDragOver(e)}
                            on:drop={(e) => handleDrop(e, sectionIndex)}
                          >
                            <td colspan="6" class="py-8 text-center text-gray-400 text-sm italic">
                              No items in this section. Drag products here.
                            </td>
                          </tr>
                        {:else}
                          {#each section.items as item, itemIndex}
                            <tr 
                              class="hover:bg-gray-50 transition-colors cursor-move"
                              draggable="true"
                              on:dragstart={(e) => handleDragStart(e, sectionIndex, itemIndex)}
                              on:dragover={(e) => handleDragOver(e)}
                              on:drop={(e) => handleDrop(e, sectionIndex)}
                            >
                              <td class="py-3 px-2">
                                <button class="text-gray-400 hover:text-gray-600 cursor-move">
                                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                                  </svg>
                                </button>
                              </td>
                              <td class="py-3 px-2">
                                <input
                                  type="text"
                                  bind:value={item.name}
                                  placeholder="Nama item..."
                                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                              </td>
                              <td class="py-3 px-2">
                                <input
                                  type="number"
                                  bind:value={item.quantity}
                                  on:input={() => calculateItemTotal(sectionIndex, itemIndex)}
                                  class="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                              </td>
                              <td class="py-3 px-2">
                                <input
                                  type="number"
                                  bind:value={item.price}
                                  on:input={() => calculateItemTotal(sectionIndex, itemIndex)}
                                  class="w-32 px-3 py-2 border border-gray-300 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                              </td>
                              <td class="py-3 px-2 text-right font-medium text-gray-800">
                                {formatCurrency(item.total)}
                              </td>
                              <td class="py-3 px-2">
                                <div class="flex gap-2">
                                  <button
                                    on:click={() => toggleItemVisibility(sectionIndex, itemIndex)}
                                    class="text-gray-500 hover:text-amber-600 transition-colors"
                                    title={item.visible ? 'Hide from print' : 'Show in print'}
                                  >
                                    {#if item.visible}
                                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                      </svg>
                                    {:else}
                                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                      </svg>
                                    {/if}
                                  </button>
                                  <button on:click={() => removeItem(sectionIndex, itemIndex)} class="text-red-500 hover:text-red-700 transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          {/each}
                        {/if}
                      {/each}
                      
                      {#each unassignedProducts as product, index}
                        <tr 
                          class="bg-amber-50 hover:bg-amber-100 transition-colors cursor-move"
                          draggable="true"
                          on:dragstart={(e) => handleDragStartUnassigned(e, index)}
                        >
                          <td class="py-3 px-2">
                            <button class="text-amber-500 hover:text-amber-700 cursor-move">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                              </svg>
                            </button>
                          </td>
                          <td class="py-3 px-2">
                            <input
                              type="text"
                              bind:value={product.name}
                              placeholder="Nama item..."
                              class="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                            />
                          </td>
                          <td class="py-3 px-2">
                            <input
                              type="number"
                              bind:value={product.quantity}
                              on:input={() => calculateUnassignedTotal(index)}
                              class="w-20 px-3 py-2 border border-amber-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                            />
                          </td>
                          <td class="py-3 px-2">
                            <input
                              type="number"
                              bind:value={product.price}
                              on:input={() => calculateUnassignedTotal(index)}
                              class="w-32 px-3 py-2 border border-amber-300 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                            />
                          </td>
                          <td class="py-3 px-2 text-right font-medium text-gray-800">
                            {formatCurrency(product.total)}
                          </td>
                          <td class="py-3 px-2">
                            <button on:click={() => removeUnassignedProduct(index)} class="text-red-500 hover:text-red-700 transition-colors">
                              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      {/each}
                      
                      <tr class="bg-amber-100">
                        <td colspan="4" class="py-4 px-2 text-right font-bold text-gray-800">Total Biaya</td>
                        <td class="py-4 px-2 text-right font-bold text-gray-900 text-lg">{formatCurrency(rincianBiayaTotal)}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div class="flex gap-4 mt-4">
                  <button on:click={addProduct} class="text-amber-700 hover:text-amber-800 font-medium text-sm flex items-center gap-1 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Product
                  </button>
                  <button on:click={addSection} class="text-amber-700 hover:text-amber-800 font-medium text-sm flex items-center gap-1 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Section
                  </button>
                </div>
              </section>
              
              <section>
                <h2 class="text-lg font-bold text-gray-800 mb-4">History Pembayaran</h2>
                <div class="overflow-x-auto">
                  <table class="min-w-full">
                    <thead>
                      <tr>
                        <th class="text-left text-sm font-medium text-gray-600 pb-3 w-8"></th>
                        <th class="text-left text-sm font-medium text-gray-600 pb-3">Date</th>
                        <th class="text-left text-sm font-medium text-gray-600 pb-3">Method</th>
                        <th class="text-left text-sm font-medium text-gray-600 pb-3">Amount</th>
                        <th class="text-left text-sm font-medium text-gray-600 pb-3">Status</th>
                        <th class="w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {#each historyPembayaran as payment, index}
                        <tr class="hover:bg-gray-50">
                          <td class="py-3 pr-2">
                            <button class="text-gray-400 hover:text-gray-600 cursor-move">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                              </svg>
                            </button>
                          </td>
                          <td class="py-3 pr-2">
                            <input type="date" bind:value={payment.date} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
                          </td>
                          <td class="py-3 pr-2">
                            <input type="text" bind:value={payment.method} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
                          </td>
                          <td class="py-3 pr-2">
                            <input type="number" bind:value={payment.amount} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
                          </td>
                          <td class="py-3 pr-2">
                            <span class="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              In Payment
                            </span>
                          </td>
                          <td class="py-3">
                            <button on:click={() => removePaymentLine(index)} class="text-red-500 hover:text-red-700 transition-colors">
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
                <button on:click={addPaymentLine} class="mt-2 text-amber-700 hover:text-amber-800 font-medium text-sm transition-colors">Add a line</button>
              </section>
              
              <div class="grid grid-cols-3 gap-6 mt-8 p-6 bg-amber-50 rounded-lg">
                <div class="text-center">
                  <h3 class="text-sm font-medium text-gray-600 mb-2">Tagihan</h3>
                  <p class="text-2xl font-bold text-gray-800">{formatCurrency(rincianBiayaTotal)}</p>
                </div>
                <div class="text-center">
                  <h3 class="text-sm font-medium text-gray-600 mb-2">Pembayaran</h3>
                  <p class="text-2xl font-bold text-gray-800">{formatCurrency(totalPembayaran)}</p>
                </div>
                <div class="text-center">
                  <h3 class="text-sm font-medium text-gray-600 mb-2">Sisa Tagihan</h3>
                  <p class="text-2xl font-bold text-gray-800">{formatCurrency(sisaTagihan)}</p>
                </div>
              </div>
            </div>
          {:else if activeTab === 'update-history'}
            <div class="space-y-6">
              <section>
                <h2 class="text-lg font-bold text-gray-800 mb-4">Update History</h2>
                <div class="overflow-x-auto">
                  <table class="min-w-full">
                    <thead>
                      <tr>
                        <th class="text-left text-sm font-medium text-gray-600 pb-3 w-8"></th>
                        <th class="text-left text-sm font-medium text-gray-600 pb-3">Date</th>
                        <th class="text-left text-sm font-medium text-gray-600 pb-3">Document</th>
                      </tr>
                    </thead>
                    <tbody>
                      {#each updateHistory as history, index}
                        <tr class="hover:bg-gray-50">
                          <td class="py-3 pr-2">
                            <button class="text-gray-400 cursor-move">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                              </svg>
                            </button>
                          </td>
                          <td class="py-3 pr-2 text-gray-800">
                            {history.date}
                          </td>
                          <td class="py-3 pr-2">
                            {#if history.documents && history.documents.length > 0}
                              <div class="flex flex-wrap gap-2">
                                {#each history.documents as doc}
                                  <a href={doc.url} target="_blank" class="text-amber-600 hover:text-amber-800 underline text-sm">
                                    {doc.name}
                                  </a>
                                {/each}
                              </div>
                            {:else}
                              <span class="text-gray-400 text-sm">No documents</span>
                            {/if}
                          </td>
                        </tr>
                      {/each}
                      
                      {#if updateHistory.length === 0}
                        <tr>
                          <td colspan="3" class="py-12 text-center text-gray-400 text-sm italic">
                            No update history available
                          </td>
                        </tr>
                      {/if}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </main>
</div>  