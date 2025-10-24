<script>
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { goto } from '$app/navigation';
  
  let searchQuery = '';
  
  const stages = [
    { id: 'assigned', label: 'Assigned' },
    { id: 'contacted', label: 'Contacted' },
    { id: 'finalization', label: 'Finalization' },
    { id: 'technical-meeting', label: 'Technical Meeting' }
  ];
  
  // Contacts data
  let contacts = {
    assigned: [
      { id: 1, name: 'Juni & Hermansyah', company: 'My Company', phone: '08999415758', salesperson: 'Administrator' },
      { id: 2, name: 'Ahmad Zaki', company: 'Tech Corp', phone: '08123456789', salesperson: 'Administrator' },
      { id: 3, name: 'Siti Nurhaliza', company: 'Event Plus', phone: '08567891234', salesperson: 'John Doe' },
      { id: 8, name: 'Agung & Ikhsan', company: 'Ferbos', phone: '08567891234', salesperson: 'John Doe' }
    ],
    contacted: [
      { id: 4, name: 'Budi Santoso', company: 'Wedding Organizer', phone: '08345678912', salesperson: 'Administrator' },
      { id: 5, name: 'Dewi Lestari', company: 'Celebration Co', phone: '08198765432', salesperson: 'Jane Smith' }
    ],
    finalization: [
      { id: 6, name: 'Rina Wijaya', company: 'Grand Events', phone: '08234567890', salesperson: 'Administrator' }
    ],
    'technical-meeting': [
      { id: 7, name: 'Agus Pratama', company: 'Royal Wedding', phone: '08156789012', salesperson: 'John Doe' }
    ]
  };
  
  let draggedContactId = null;
  let draggedFromStage = null;
  
  function handleDragStart(event, contactId, stageId) {
    draggedContactId = contactId;
    draggedFromStage = stageId;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', contactId);
  }
  
  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }
  
  function handleDragEnter(event) {
    event.preventDefault();
  }
  
  function handleDrop(event, targetStageId) {
    event.preventDefault();
    event.stopPropagation();
    
    if (draggedContactId && draggedFromStage && draggedFromStage !== targetStageId) {
      // Find the contact in the source stage
      const contactIndex = contacts[draggedFromStage].findIndex(c => c.id === draggedContactId);
      
      if (contactIndex !== -1) {
        // Get the contact
        const contact = contacts[draggedFromStage][contactIndex];
        
        // Create new arrays to trigger reactivity
        const newContacts = { ...contacts };
        newContacts[draggedFromStage] = [...contacts[draggedFromStage]];
        newContacts[targetStageId] = [...contacts[targetStageId]];
        
        // Remove from old stage
        newContacts[draggedFromStage].splice(contactIndex, 1);
        
        // Add to new stage
        newContacts[targetStageId].push(contact);
        
        // Update contacts - this triggers Svelte reactivity
        contacts = newContacts;
        
        console.log(`Moved contact ${draggedContactId} from ${draggedFromStage} to ${targetStageId}`);
      }
    }
    
    // Reset drag state
    draggedContactId = null;
    draggedFromStage = null;
  }
  
  function viewContactDetails(event, contactId) {
    // Don't navigate if currently dragging
    if (draggedContactId) {
      event.preventDefault();
      return;
    }
    goto(`/crm/${contactId}`);
  }
  
  function getFilteredContacts(stageId) {
    if (!contacts[stageId]) return [];
    if (searchQuery === '') {
      return contacts[stageId];
    }
    return contacts[stageId].filter(contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
    );
  }
  
  function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }
  
  const avatarColors = ['bg-pink-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-amber-500', 'bg-red-500', 'bg-indigo-500'];
  
  function getAvatarColor(id) {
    return avatarColors[id % avatarColors.length];
  }
</script>

<div class="flex min-h-screen bg-gray-50">
  <Sidebar />
  
  <main class="flex-1 p-8 overflow-x-auto">
    <div class="min-w-max">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">CRM</h1>
        <p class="text-gray-600 mt-2">Customer Relationship Management - Drag contacts between stages</p>
      </div>
      
      <div class="mb-6 max-w-md">
        <div class="relative">
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search contacts..."
            class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <svg
            class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div class="flex space-x-4 pb-4">
        {#each stages as stage}
          <div 
            class="flex-shrink-0 w-80 bg-gray-100 rounded-lg p-4 min-h-[500px]"
            on:dragover={handleDragOver}
            on:dragenter={handleDragEnter}
            on:drop={(e) => handleDrop(e, stage.id)}
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-bold text-gray-800">{stage.label}</h2>
              <span class="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">
                {getFilteredContacts(stage.id).length}
              </span>
            </div>
            
            <div class="space-y-3">
              {#each getFilteredContacts(stage.id) as contact (contact.id)}
                <div
                  draggable="true"
                  on:dragstart={(e) => handleDragStart(e, contact.id, stage.id)}
                  on:click={(e) => viewContactDetails(e, contact.id)}
                  class="bg-white rounded-lg p-4 shadow hover:shadow-md transition-all cursor-grab active:cursor-grabbing select-none"
                >
                  <div class="flex items-start space-x-3">
                    <div class="w-10 h-10 rounded-full {getAvatarColor(contact.id)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {getInitials(contact.name)}
                    </div>
                    
                    <div class="flex-1 min-w-0">
                      <h3 class="font-semibold text-gray-800 truncate">{contact.name}</h3>
                      <p class="text-sm text-gray-600 truncate">{contact.company}</p>
                      <p class="text-sm text-gray-500 mt-1">{contact.phone}</p>
                      
                      <div class="mt-2">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          {contact.salesperson}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              {/each}
              
              {#if getFilteredContacts(stage.id).length === 0}
                <div class="text-center py-8 text-gray-400 text-sm">
                  No contacts in this stage
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </main>
</div>

<style>
  [draggable="true"] {
    -webkit-user-drag: element;
  }
</style>