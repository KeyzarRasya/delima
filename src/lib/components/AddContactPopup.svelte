<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let contactData = {
    name: '',
    company: '',
    phone: '',
    salesperson: 'Administrator'
  };
  
  function handleClose() {
    dispatch('close');
  }
  
  function handleSave() {
    if (!contactData.name || !contactData.phone) {
      alert('Please fill Name and Phone Number');
      return;
    }
    
    dispatch('save', contactData);
    handleClose();
  }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <h3 class="text-xl font-bold text-gray-800">Add New Contact</h3>
      <button
        on:click={handleClose}
        class="text-gray-400 hover:text-gray-600"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div class="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Name <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          bind:value={contactData.name}
          placeholder="Enter contact name"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Company
        </label>
        <input
          type="text"
          bind:value={contactData.company}
          placeholder="Enter company name"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Phone Number <span class="text-red-500">*</span>
        </label>
        <input
          type="tel"
          bind:value={contactData.phone}
          placeholder="Enter phone number"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Salesperson
        </label>
        <input
          type="text"
          bind:value={contactData.salesperson}
          placeholder="Enter salesperson name"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>
    </div>
    
    <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
      <button
        on:click={handleClose}
        class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
      <button
        on:click={handleSave}
        class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
      >
        Save
      </button>
    </div>
  </div>
</div>