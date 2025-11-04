<script>
// @ts-nocheck

  import Sidebar from '$lib/components/Sidebar.svelte';
  import AttachmentUploadPopup from '$lib/components/AttachmentUploadPopup.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { crmContacts } from '$lib/data/crmData.js';
  
  let showUploadPopup = false;
  
  $: contactId = parseInt($page.params.id);
  $: contactData = crmContacts.find(c => c.id === contactId);
  
  let contact = {
    name: contactData?.name || 'Juni & Hermansyah',
    company: contactData?.company || 'My Company',
    phone: contactData?.phone || '08999415758',
    salesperson: contactData?.salesperson || 'Administrator'
  };
  
  let events = contactData?.events?.map(e => ({
    id: e.id,
    name: e.name,
    date: e.date || '',
    venue: e.selectedVenues[0]?.venueName || '',
    numberOfPax: e.selectedVenues[0]?.selectedPax[0]?.paxNumber || '',
    status: e.status || ''
  })) || [
    { id: 'evt-001', name: 'Studio Kencana', date: '', venue: '', numberOfPax: '', status: '' }
  ];
  
  let contactLogs = [
    { id: 1, event: 'Studio Kencana', createdDate: new Date().toISOString(), attachment: null, status: 'Belum Ada Respon' }
  ];
  
  function goBack() {
    goto('/crm');
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
    contactLogs = [...contactLogs, {
      id: Date.now(),
      event: events[0]?.name || 'New Event',
      createdDate: data.createdDate,
      attachment: data.file.name,
      status: data.status
    }];
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
        
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              bind:value={contact.name}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input
              type="text"
              bind:value={contact.company}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              bind:value={contact.phone}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Salesperson</label>
            <input
              type="text"
              bind:value={contact.salesperson}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
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
        
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="border-b">
                <th class="w-8 px-6 py-3"></th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Pax</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 w-32"></th>
                <th class="px-6 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each events as event, index}
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4">
                    <button class="text-gray-400 hover:text-gray-600 cursor-move">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                      </svg>
                    </button>
                  </td>
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
                  <td class="px-6 py-4 text-sm text-gray-900">{log.event}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">
                    {new Date(log.createdDate).toLocaleDateString()}
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
      </div>
    </div>
  </main>
</div>

{#if showUploadPopup}
  <AttachmentUploadPopup
    on:close={closeUploadPopup}
    on:save={(e) => handleUploadSave(e.detail)}
  />
{/if}