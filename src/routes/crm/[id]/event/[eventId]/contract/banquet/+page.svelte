<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  $: contactId = $page.params.id;
  $: eventId = $page.params.eventId;
  
  // Banquet Order data
  let banquetData = {
    nama: '',
    tempat: '',
    hariTanggal: '',
    pukul: '',
    jumlah: ''
  };
  
  // Buffet data
  let buffetQuantity = '';
  let buffetUnitPrice = '';
  let buffetTotalAmount = '';
  let buffetItems = [
    { category: 'Studio Kencana', menu: '' }
  ];
  
  // Gubukan data
  let gubukanItems = [
    { category: 'Studio Kencana', menu: '', quantity: '', unitPrice: '', amount: '' }
  ];
  let gubukanSubtotal = 0;
  let gubukanTotal = 0;
  let chargeCatering = 0;
  
  // Tambahan data
  let tambahanItems = [
    { item: 'Studio Kencana', amount: '' }
  ];
  let tambahanSubtotal = 0;
  let tambahanTotal = 0;
  
  // Reactive calculations for Gubukan
  $: {
    gubukanSubtotal = gubukanItems.reduce((sum, item) => {
      const amount = parseFloat(item.amount) || 0;
      return sum + amount;
    }, 0);
    
    chargeCatering = gubukanSubtotal;
    gubukanTotal = gubukanSubtotal + chargeCatering;
  }
  
  // Reactive calculations for Tambahan
  $: {
    tambahanSubtotal = tambahanItems.reduce((sum, item) => {
      const amount = parseFloat(item.amount) || 0;
      return sum + amount;
    }, 0);
    
    tambahanTotal = tambahanSubtotal;
  }
  
  function goBack() {
    goto(`/crm/${contactId}/event/${eventId}/contract`);
  }
  
  function addBuffetLine() {
    buffetItems = [...buffetItems, { category: '', menu: '' }];
  }
  
  function removeBuffetLine(index) {
    buffetItems = buffetItems.filter((_, i) => i !== index);
  }
  
  function addGubukanLine() {
    gubukanItems = [...gubukanItems, { category: '', menu: '', quantity: '', unitPrice: '', amount: '' }];
  }
  
  function removeGubukanLine(index) {
    gubukanItems = gubukanItems.filter((_, i) => i !== index);
  }
  
  function calculateGubukanAmount(index) {
    const item = gubukanItems[index];
    const quantity = parseFloat(item.quantity) || 0;
    const unitPrice = parseFloat(item.unitPrice) || 0;
    gubukanItems[index].amount = (quantity * unitPrice).toFixed(2);
  }
  
  function addTambahanLine() {
    tambahanItems = [...tambahanItems, { item: '', amount: '' }];
  }
  
  function removeTambahanLine(index) {
    tambahanItems = tambahanItems.filter((_, i) => i !== index);
  }
  
  function handlePrint() {
    window.print();
  }
  
  function handleSave() {
    console.log('Saving banquet order...', banquetData);
    alert('Banquet order saved!');
  }
  
  function formatCurrency(value) {
    if (!value) return 'Rp 0.00';
    return `Rp ${parseFloat(value).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
          Back to Contract
        </button>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex justify-between items-start mb-8">
          <h1 class="text-2xl font-bold text-gray-800">Banquet Order</h1>
          <button
            on:click={handlePrint}
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
          >
            Print
          </button>
        </div>
        
        <div class="space-y-4 mb-8">
          <div class="flex items-center">
            <label class="w-32 text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              bind:value={banquetData.nama}
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div class="flex items-center">
            <label class="w-32 text-sm font-medium text-gray-700">Tempat</label>
            <input
              type="text"
              bind:value={banquetData.tempat}
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div class="flex items-center">
            <label class="w-32 text-sm font-medium text-gray-700">Hari/Tanggal</label>
            <input
              type="date"
              bind:value={banquetData.hariTanggal}
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div class="flex items-center">
            <label class="w-32 text-sm font-medium text-gray-700">Pukul</label>
            <input
              type="time"
              bind:value={banquetData.pukul}
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div class="flex items-center">
            <label class="w-32 text-sm font-medium text-gray-700">Jumlah</label>
            <input
              type="text"
              bind:value={banquetData.jumlah}
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
        
        <section class="mb-8">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Buffet</h2>
          
          <div class="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label class="block text-sm text-gray-600 mb-1">Quantity</label>
              <input
                type="text"
                bind:value={buffetQuantity}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Unit Price</label>
              <input
                type="text"
                bind:value={buffetUnitPrice}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Total Amount</label>
              <input
                type="text"
                bind:value={buffetTotalAmount}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          
          <div class="mb-2">
            <h3 class="text-sm font-semibold text-gray-700 mb-2">Details</h3>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left text-sm font-medium text-gray-600 pb-2 w-8"></th>
                  <th class="text-left text-sm font-medium text-gray-600 pb-2">Category</th>
                  <th class="text-left text-sm font-medium text-gray-600 pb-2">Menu</th>
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
        
        <section class="mb-8">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Gubukan</h2>
          
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left text-sm font-medium text-gray-600 pb-2 w-8"></th>
                  <th class="text-left text-sm font-medium text-gray-600 pb-2">Category</th>
                  <th class="text-left text-sm font-medium text-gray-600 pb-2">Menu</th>
                  <th class="text-left text-sm font-medium text-gray-600 pb-2">Quantity</th>
                  <th class="text-left text-sm font-medium text-gray-600 pb-2">Unit Price</th>
                  <th class="text-left text-sm font-medium text-gray-600 pb-2">Amount</th>
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
                      <input
                        type="number"
                        bind:value={item.quantity}
                        on:input={() => calculateGubukanAmount(index)}
                        class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td class="py-2 pr-2">
                      <input
                        type="number"
                        bind:value={item.unitPrice}
                        on:input={() => calculateGubukanAmount(index)}
                        class="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td class="py-2 pr-2">
                      <input
                        type="text"
                        bind:value={item.amount}
                        readonly
                        class="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-gray-50"
                      />
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
          
          <div class="mt-6 space-y-2">
            <div class="flex justify-end items-center">
              <span class="text-sm text-gray-600 mr-4">Jumlah Gubuk:</span>
              <span class="text-sm font-semibold text-gray-800 w-40 text-right">{formatCurrency(gubukanSubtotal)}</span>
            </div>
            <div class="flex justify-end items-center">
              <span class="text-sm text-gray-600 mr-4">Total:</span>
              <span class="text-sm font-semibold text-gray-800 w-40 text-right">{formatCurrency(gubukanTotal)}</span>
            </div>
            <div class="flex justify-end items-center border-t pt-2">
              <span class="text-sm text-gray-600 mr-4">Charge Catering</span>
              <span class="text-sm font-semibold text-gray-800 w-40 text-right">{formatCurrency(chargeCatering)}</span>
            </div>
          </div>
        </section>
        
        <section class="mb-8">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Tambahan</h2>
          
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left text-sm font-medium text-gray-600 pb-2 w-8"></th>
                  <th class="text-left text-sm font-medium text-gray-600 pb-2">Item</th>
                  <th class="text-left text-sm font-medium text-gray-600 pb-2">Amount</th>
                  <th class="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {#each tambahanItems as item, index}
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
                      <input type="number" bind:value={item.amount} class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                    </td>
                    <td class="py-2">
                      <button on:click={() => removeTambahanLine(index)} class="text-red-500 hover:text-red-700">
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
          <button on:click={addTambahanLine} class="mt-2 text-amber-700 hover:text-amber-800 font-medium text-sm">Add a line</button>
          
          <div class="mt-6 space-y-2">
            <div class="flex justify-end items-center">
              <span class="text-sm text-gray-600 mr-4">Total Tambahan:</span>
              <span class="text-sm font-semibold text-gray-800 w-40 text-right">{formatCurrency(tambahanSubtotal)}</span>
            </div>
            <div class="flex justify-end items-center border-t pt-2">
              <span class="text-sm text-gray-600 mr-4">Total:</span>
              <span class="text-sm font-semibold text-gray-800 w-40 text-right">{formatCurrency(tambahanTotal)}</span>
            </div>
          </div>
        </section>
        
        <div class="flex justify-end pt-6 border-t">
          <button
            on:click={handleSave}
            class="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </main>
</div>