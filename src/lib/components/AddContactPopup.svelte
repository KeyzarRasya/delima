<script>
  import { createEventDispatcher } from 'svelte';
  import { salespersonData } from '$lib/data/salespersonData.js';
  
  const dispatch = createEventDispatcher();
  
  let formData = {
    name: '',
    company: '',
    phone: '',
    salespersonId: 1
  };
  
  function handleClose() {
    dispatch('close');
  }
  
  function handleSave() {
    if (formData.name && formData.company && formData.phone) {
      dispatch('save', formData);
      handleClose();
    }
  }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">Add New Contact</h2>
      <button
        on:click={handleClose}
        class="text-gray-400 hover:text-gray-600"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Opportunity Name</label>
        <input
          type="text"
          bind:value={formData.name}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Enter name"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          type="tel"
          bind:value={formData.phone}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Enter phone number"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Salesperson</label>
        <select
          bind:value={formData.salespersonId}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {#each salespersonData as salesperson}
            <option value={salesperson.id}>{salesperson.name}</option>
          {/each}
        </select>
      </div>
    </div>
    
    <div class="flex gap-3 mt-6">
      <button
        on:click={handleClose}
        class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
      <button
        on:click={handleSave}
        class="flex-1 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
      >
        Save
      </button>
    </div>
  </div>
</div>