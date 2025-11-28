<script>
// @ts-nocheck

  import Sidebar from '$lib/components/Sidebar.svelte';
  import AttachmentUploadPopup from '$lib/components/AttachmentUploadPopup.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { crmContacts, getContactLogsByContactId } from '$lib/data/crmData.js';
  import { salespersonData, getSalespersonById } from '$lib/data/salespersonData.js';
  
  let showUploadPopup = false;
  let showPrintContractModal = false;
  let showUploadContractModal = false;
  let uploadedContractFile = null;
  
  $: contactId = parseInt($page.params.id);
  $: contactData = crmContacts.find(c => c.id === contactId);
  
  $: opportunity = {
    opportunityName: contactData?.opportunityName || '',
    salespersonIds: contactData?.salespersonIds || []
  };
  
  let selectedSalespersons = [];
  $: {
    if (contactData) {
      selectedSalespersons = (contactData.salespersonIds || [contactData.salespersonId].filter(Boolean))
        .map(id => getSalespersonById(id))
        .filter(Boolean);
    }
  }
  
  $: contracts = contactData?.contracts || [];
  
  $: contacts = contactData?.contacts || [
    { name: '', phone: '', keterangan: '' }
  ];

  let contractForms = {
    name: '',
    nik: '',
    tanggalLahir: '',
    alamat: '',
    nomorHP: ''
  }
  
  $: events = contactData?.events?.map(e => ({
    id: e.id,
    name: e.name,
    date: e.date || '',
    venue: e.selectedVenues[0]?.venueName || '',
    numberOfPax: e.selectedVenues[0]?.selectedPax[0]?.paxNumber || '',
    status: e.status || ''
  })) || [];
  
  $: contactLogs = contactData?.contactLogs || [];
  
  function goBack() {
    goto('/crm');
  }
  
  function handleSalespersonSelect(event) {
    const salespersonId = parseInt(event.target.value);
    if (!salespersonId) return;
    
    const alreadySelected = selectedSalespersons.some(sp => sp.id === salespersonId);
    if (alreadySelected) {
      event.target.value = '';
      return;
    }
    
    const salesperson = getSalespersonById(salespersonId);
    if (salesperson) {
      selectedSalespersons = [...selectedSalespersons, salesperson];
      
      const contactIndex = crmContacts.findIndex(c => c.id === contactId);
      if (contactIndex !== -1) {
        if (!crmContacts[contactIndex].salespersonIds) {
          crmContacts[contactIndex].salespersonIds = [];
        }
        crmContacts[contactIndex].salespersonIds = [...crmContacts[contactIndex].salespersonIds, salespersonId];
      }
    }
    
    event.target.value = '';
  }
  
  function removeSalesperson(salespersonId) {
    selectedSalespersons = selectedSalespersons.filter(sp => sp.id !== salespersonId);
    
    const contactIndex = crmContacts.findIndex(c => c.id === contactId);
    if (contactIndex !== -1) {
      crmContacts[contactIndex].salespersonIds = (crmContacts[contactIndex].salespersonIds || []).filter(id => id !== salespersonId);
    }
  }
  
  function addContactRow() {
    contacts = [...contacts, { name: '', phone: '', keterangan: '' }];
  }
  
  function removeContactRow(index) {
    contacts = contacts.filter((_, i) => i !== index);
  }
  
  function addEvent() {
    events = [...events, {
      id: `evt-${Date.now()}`,
      name: '',
      date: '',
      venue: '',
      numberOfPax: '',
      status: ''
    }];
  }
  
  function removeEvent(index) {
    events = events.filter((_, i) => i !== index);
  }
  
  function openUploadPopup() {
    showUploadPopup = true;
  }
  
  function closeUploadPopup() {
    showUploadPopup = false;
  }
  
  function handleUploadSave(data) {
    const newLog = {
      id: Date.now(),
      eventId: events[0]?.id || '',
      eventName: events[0]?.name || 'New Event',
      createdDate: data.createdDate,
      attachment: data.file.name,
      status: data.status
    };
   
    contactLogs = [...contactLogs, newLog];
    
    const contactIndex = crmContacts.findIndex(c => c.id === contactId);
    if (contactIndex !== -1) {
      crmContacts[contactIndex].contactLogs = [...contactLogs];
    }
  }
  
  function openPrintContractModal() {
    showPrintContractModal = true;
  }
  
  function closePrintContractModal() {
    showPrintContractModal = false;
  }
  
  function handlePrintContract() {
    console.log('Print contract');
    closePrintContractModal();
  }
  
  function openUploadContractModal() {
    showUploadContractModal = true;
  }
  
  function closeUploadContractModal() {
    showUploadContractModal = false;
    uploadedContractFile = null;
  }
  
  function handleContractFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      uploadedContractFile = file;
    }
  }
  
  function handleUploadContract() {
    if (uploadedContractFile) {
      const newContract = {
        id: Date.now(),
        fileName: uploadedContractFile.name,
        uploadedDate: new Date().toISOString(),
        type: 'signed'
      };
      
      contracts = [...contracts, newContract];
      
      const contactIndex = crmContacts.findIndex(c => c.id === contactId);
      if (contactIndex !== -1) {
        if (!crmContacts[contactIndex].contracts) {
          crmContacts[contactIndex].contracts = [];
        }
        crmContacts[contactIndex].contracts = [...crmContacts[contactIndex].contracts, newContract];
      }
      
      closeUploadContractModal();
    }
  }

  function onContractNameChange(event) {
    let val = event.target.value;
    for (let i = 0; i < contacts.length; i++) {
      if (val == contacts[i].name) {
        contractForms.nomorHP = contacts[i].phone
      }
    }
  }
  
  function viewDetails(eventId) {
    goto(`/crm/${contactId}/event/${eventId}`);
  }
  
  function getStatusColor(status) {
    switch(status) {
      case 'Belum Ada Respon':
        return 'bg-red-100 text-red-800';
      case 'Sudah Direspon':
        return 'bg-blue-100 text-blue-800';
      case 'Prospek':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
</script>

<div class="flex min-h-screen bg-gray-50">
  <Sidebar />
  
  <main class="flex-1 p-8">
    <div class="max-w-7xl mx-auto">
      <div class="mb-6">
        <button
          on:click={goBack}
          class="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to CRM
        </button>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Contact Information</h1>
        
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Opportunity Name</label>
              <input
                type="text"
                bind:value={opportunity.opportunityName}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Salesperson</label>
              <select
                on:change={handleSalespersonSelect}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Select salesperson</option>
                {#each salespersonData as salesperson}
                  <option value={salesperson.id}>{salesperson.name}</option>
                {/each}
              </select>
              
              {#if selectedSalespersons.length > 0}
                <div class="flex flex-wrap gap-2 mt-2">
                  {#each selectedSalespersons as salesperson}
                    <div class="flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-md">
                      <span class="text-sm">{salesperson.name}</span>
                      <button
                        on:click={() => removeSalesperson(salesperson.id)}
                        class="text-amber-600 hover:text-amber-800 ml-1"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
          
          <div>
            <div class="overflow-x-auto">
              <table class="min-w-full border border-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Nama</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Phone Number</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Keterangan</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Action</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {#each contacts as contact, index}
                    <tr>
                      <td class="px-6 py-4">
                        <input
                          type="text"
                          bind:value={contact.name}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Enter name"
                        />
                      </td>
                      <td class="px-6 py-4">
                        <input
                          type="tel"
                          bind:value={contact.phone}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Enter phone"
                        />
                      </td>
                      <td class="px-6 py-4">
                        <input
                          type="text"
                          bind:value={contact.keterangan}
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Enter description"
                        />
                      </td>
                      <td class="px-6 py-4">
                        <button
                          on:click={() => removeContactRow(index)}
                          class="text-red-500 hover:text-red-700 transition-colors"
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
            </div>
            
            <button
              on:click={addContactRow}
              class="mt-4 text-amber-600 hover:text-amber-700 font-medium"
            >
              Add Contact
            </button>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">Events</h2>
          <button
            on:click={addEvent}
            class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Add Event
          </button>
        </div>
        
        {#if events.length > 0}
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b">
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Pax</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each events as event}
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm text-gray-900">{event.name}</td>
                    <td class="px-6 py-4 text-sm text-gray-900">
                      {event.date ? new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900">{event.venue || '-'}</td>
                    <td class="px-6 py-4 text-sm text-gray-900">{event.numberOfPax || '-'}</td>
                    <td class="px-6 py-4 text-sm text-gray-900">{event.status || '-'}</td>
                    <td class="px-6 py-4">
                      <button
                        on:click={() => viewDetails(event.id)}
                        class="text-amber-600 hover:text-amber-800 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {:else}
          <p class="text-gray-500 text-center py-8">No events found. Click "Add Event" to create one.</p>
        {/if}
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">Contact Log</h2>
          <button
            on:click={openUploadPopup}
            class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Upload Attachment
          </button>
        </div>
        
        {#if contactLogs.length > 0}
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b">
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attachment</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each contactLogs as log}
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm text-gray-900">{log.eventName}</td>
                    <td class="px-6 py-4 text-sm text-gray-900">
                      {new Date(log.createdDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900">
                      {log.attachment || '-'}
                    </td>
                    <td class="px-6 py-4">
                      <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full {getStatusColor(log.status)}">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {:else}
          <p class="text-gray-500 text-center py-8">No contact logs found. Click "Upload Attachment" to add one.</p>
        {/if}
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">Contracts</h2>
          <div class="flex gap-3">
            <button
              on:click={openPrintContractModal}
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Print Contract
            </button>
            <button
              on:click={openUploadContractModal}
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Upload Contract
            </button>
          </div>
        </div>
        
        {#if contracts.length > 0}
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b">
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each contracts as contract}
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm text-gray-900">{contract.fileName}</td>
                    <td class="px-6 py-4 text-sm text-gray-900">
                      {new Date(contract.uploadedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td class="px-6 py-4">
                      <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        {contract.type}
                      </span>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {:else}
          <p class="text-gray-500 text-center py-8">No contracts found.</p>
        {/if}
      </div>
    </div>
  </main>
</div>

{#if showUploadPopup}
  <AttachmentUploadPopup
    isOpen={showUploadPopup}
    onClose={closeUploadPopup}
    onSave={handleUploadSave}
  />
{/if}

{#if showPrintContractModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-gray-800">Print Contract</h2>
        <button
          on:click={closePrintContractModal}
          class="text-gray-400 hover:text-gray-600"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nama <span class="text-red-500">*</span></label>
          <select bind:value={contractForms.name} on:change={onContractNameChange} name="nama" id="nama" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">
            {#each contacts as c}
              <option value={c.name}>{c.name}</option>
            {/each}
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">NIK <span class="text-red-500">*</span></label>
          <input
            bind:value={contractForms.nik}
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter NIK"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir <span class="text-red-500">*</span></label>
          <input
            bind:value={contractForms.tanggalLahir}
            type="date"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Alamat <span class="text-red-500">*</span></label>
          <textarea
            bind:value={contractForms.alamat}
            required
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter address"
          ></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nomor HP <span class="text-red-500">*</span></label>
          <input
            bind:value={contractForms.nomorHP}
            type="tel"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter phone number"
          />
        </div>
      </div>
      
      <div class="flex gap-3 mt-6">
        <button
          on:click={closePrintContractModal}
          class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          on:click={handlePrintContract}
          class="flex-1 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
        >
          Print
        </button>
      </div>
    </div>
  </div>
{/if}

{#if showUploadContractModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-gray-800">Upload Contract</h2>
        <button
          on:click={closeUploadContractModal}
          class="text-gray-400 hover:text-gray-600"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Upload Signed Contract</label>
          <input
            type="file"
            on:change={handleContractFileChange}
            accept=".pdf,.doc,.docx"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {#if uploadedContractFile}
            <p class="text-sm text-gray-600 mt-2">Selected: {uploadedContractFile.name}</p>
          {/if}
        </div>
      </div>
      
      <div class="flex gap-3 mt-6">
        <button
          on:click={closeUploadContractModal}
          class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          on:click={handleUploadContract}
          disabled={!uploadedContractFile}
          class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Upload
        </button>
      </div>
    </div>
  </div>
{/if}