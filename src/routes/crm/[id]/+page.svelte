<script>
// @ts-nocheck

  import Sidebar from '$lib/components/Sidebar.svelte';
  import AttachmentUploadPopup from '$lib/components/AttachmentUploadPopup.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { crmContacts, getContactLogsByContactId } from '$lib/data/crmData.js';
  import { salespersonData, getSalespersonById } from '$lib/data/salespersonData.js';
  
  let showUploadPopup = false;
  
  $: contactId = parseInt($page.params.id);
  $: contactData = crmContacts.find(c => c.id === contactId);
  
  $: opportunity = {
    opportunityName: contactData?.opportunityName || '',
    salespersonId: contactData?.salespersonId || 1
  };
  
  $: contacts = contactData?.contacts || [
    { name: '', phone: '', keterangan: '' }
  ];
  
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
                bind:value={opportunity.salespersonId}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {#each salespersonData as salesperson}
                  <option value={salesperson.id}>{salesperson.name}</option>
                {/each}
              </select>
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
                          placeholder="Enter notes"
                        />
                      </td>
                      <td class="px-6 py-4">
                        <button
                          on:click={() => removeContactRow(index)}
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
            </div>
            
            <button
              on:click={addContactRow}
              class="mt-4 px-4 py-2 border border-amber-600 text-amber-600 rounded-md hover:bg-amber-50 transition-colors"
            >
              Add Row
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
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Pax</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  <th class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each events as event, index}
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4">
                      <input
                        type="text"
                        bind:value={event.name}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <input
                        type="date"
                        bind:value={event.date}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <input
                        type="text"
                        bind:value={event.venue}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <input
                        type="text"
                        bind:value={event.numberOfPax}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <input
                        type="text"
                        bind:value={event.status}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </td>
                    <td class="px-6 py-4">
                      <button
                        on:click={() => viewDetails(event.id)}
                        class="w-full px-4 py-2 text-sm text-amber-700 border border-amber-700 rounded-md hover:bg-amber-50 transition-colors"
                      >
                        Details
                      </button>
                    </td>
                    <td class="px-6 py-4">
                      <button
                        on:click={() => removeEvent(index)}
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
          </div>
        {:else}
          <p class="text-gray-500 text-center py-8">No events found. Click "Add Event" to create one.</p>
        {/if}
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-8">
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