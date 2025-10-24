<script>
  export let isOpen = false;
  export let menuDetails = [];
  export let onClose;
  
  let localDetails = [...menuDetails];
  
  const columns = ['Kategori', 'Menu'];
  
  function addRow() {
    localDetails = [...localDetails, { kategori: '', menu: '' }];
  }
  
  function removeRow(index) {
    localDetails = localDetails.filter((_, i) => i !== index);
  }
  
  function handleSave() {
    menuDetails = [...localDetails];
    onClose();
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-xl font-bold text-gray-800">Popup - Details</h3>
        <button
          on:click={onClose}
          class="text-gray-400 hover:text-gray-600"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-6 overflow-y-auto max-h-[60vh]">
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                {#each columns as column}
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {column}
                  </th>
                {/each}
                <th class="px-6 py-3 w-16"></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each localDetails as detail, index}
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4">
                    <input
                      type="text"
                      bind:value={detail.kategori}
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter kategori"
                    />
                  </td>
                  <td class="px-6 py-4">
                    <input
                      type="text"
                      bind:value={detail.menu}
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter menu"
                    />
                  </td>
                  <td class="px-6 py-4">
                    <button
                      on:click={() => removeRow(index)}
                      class="text-red-500 hover:text-red-700"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
          
          <div class="px-6 py-4 border-t border-gray-200">
            <button
              on:click={addRow}
              class="text-amber-700 hover:text-amber-800 font-medium"
            >
              Add a Product
            </button>
          </div>
        </div>
      </div>
      
      <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
        <button
          on:click={onClose}
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          on:click={handleSave}
          class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
{/if}