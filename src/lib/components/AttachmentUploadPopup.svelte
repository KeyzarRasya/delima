<script>
  export let isOpen = false;
  export let onClose;
  export let onSave;
  
  let selectedFile = null;
  let fileInput;
  let selectedStatus = '';
  let isDragging = false;
  
  const statusOptions = [
    'Belum Ada Respon',
    'Sudah Direspon',
    'Prospek'
  ];
  
  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
      selectedFile = file;
    }
  }
  
  function handleDragOver(event) {
    event.preventDefault();
    isDragging = true;
  }
  
  function handleDragLeave(event) {
    event.preventDefault();
    isDragging = false;
  }
  
  function handleDrop(event) {
    event.preventDefault();
    isDragging = false;
    const file = event.dataTransfer.files[0];
    if (file) {
      selectedFile = file;
    }
  }
  
  function browseFiles() {
    fileInput.click();
  }
  
  function handleSave() {
    if (selectedFile && selectedStatus) {
      onSave({
        file: selectedFile,
        status: selectedStatus,
        createdDate: new Date().toISOString()
      });
      resetForm();
      onClose();
    }
  }
  
  function resetForm() {
    selectedFile = null;
    selectedStatus = '';
    if (fileInput) fileInput.value = '';
  }
  
  function handleClose() {
    resetForm();
    onClose();
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-xl font-bold text-gray-800">Bukti Chat</h3>
        <button
          on:click={handleClose}
          class="text-gray-400 hover:text-gray-600"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-6 space-y-4">
        <div>
          <div
            class="border-2 border-dashed rounded-lg p-8 text-center transition-colors {isDragging ? 'border-amber-500 bg-amber-50' : 'border-gray-300'}"
            on:dragover={handleDragOver}
            on:dragleave={handleDragLeave}
            on:drop={handleDrop}
          >
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="mt-2 text-sm text-gray-600">Drag and drop file here</p>
            <p class="text-xs text-gray-500 mt-1">Limit 300MB per file • PNG, JPG, JPEG, WEBP</p>
            <input
              type="file"
              bind:this={fileInput}
              on:change={handleFileSelect}
              accept=".png,.jpg,.jpeg,.webp"
              class="hidden"
            />
            <button
              type="button"
              on:click={browseFiles}
              class="mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              Browse files
            </button>
          </div>
          
          {#if selectedFile}
            <div class="mt-2 flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {selectedFile.name}
            </div>
          {/if}
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            bind:value={selectedStatus}
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Select status</option>
            {#each statusOptions as status}
              <option value={status}>{status}</option>
            {/each}
          </select>
        </div>
        
        {#if selectedStatus}
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-gray-700">Status:</span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium {selectedStatus === 'Belum Ada Respon' ? 'bg-red-100 text-red-800' : selectedStatus === 'Sudah Direspon' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}">
              {selectedStatus}
            </span>
          </div>
        {/if}
      </div>
      
      <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
        <button
          on:click={handleClose}
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          on:click={handleSave}
          disabled={!selectedFile || !selectedStatus}
          class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Upload
        </button>
      </div>
    </div>
  </div>
{/if}