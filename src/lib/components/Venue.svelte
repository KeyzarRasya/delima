<script>
	import { masterVenues } from '$lib/data/masterVenues.js';
	import { masterPax } from '$lib/data/masterPax.js';

	let venueList = [...masterVenues];
	let availablePax = [...masterPax];

	let showAddModal = false;
	let showEditModal = false;
	let editingVenue = null;
	let newVenue = {
		venue: '',
		paxPrices: []
	};

	function formatCurrency(amount) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(amount);
	}

	function openAddModal() {
		showAddModal = true;
		newVenue = {
			venue: '',
			paxPrices: []
		};
	}

	function closeAddModal() {
		showAddModal = false;
		newVenue = {
			venue: '',
			paxPrices: []
		};
	}

	function addPaxPrice() {
		newVenue.paxPrices = [
			...newVenue.paxPrices,
			{ paxId: null, pax: null, price: 0, tempPaxSelect: '' }
		];
	}

	function removePaxPrice(index) {
		newVenue.paxPrices = newVenue.paxPrices.filter((_, i) => i !== index);
	}

	function updatePaxSelection(index, paxId) {
		const selectedPax = availablePax.find((p) => p.id === parseInt(paxId));
		if (selectedPax) {
			newVenue.paxPrices[index].paxId = selectedPax.id;
			newVenue.paxPrices[index].pax = selectedPax.pax;
		}
	}

	function addVenue() {
		if (newVenue.venue && newVenue.paxPrices.length > 0) {
			const newId = Math.max(...venueList.map((v) => v.id), 0) + 1;
			venueList = [
				...venueList,
				{
					id: newId,
					venue: newVenue.venue,
					paxPrices: newVenue.paxPrices.map((pp) => ({
						paxId: pp.paxId,
						pax: pp.pax,
						price: pp.price
					}))
				}
			];
			closeAddModal();
		}
	}

	function deleteVenue(id) {
		if (confirm('Are you sure you want to delete this venue?')) {
			venueList = venueList.filter((v) => v.id !== id);
		}
	}

	function openEditModal(venue) {
		editingVenue = JSON.parse(JSON.stringify(venue));
		showEditModal = true;
	}

	function closeEditModal() {
		showEditModal = false;
		editingVenue = null;
	}

	function addPaxPriceToEdit() {
		editingVenue.paxPrices = [
			...editingVenue.paxPrices,
			{ paxId: null, pax: null, price: 0, tempPaxSelect: '' }
		];
	}

	function removePaxPriceFromEdit(index) {
		editingVenue.paxPrices = editingVenue.paxPrices.filter((_, i) => i !== index);
	}

	function updatePaxSelectionInEdit(index, paxId) {
		const selectedPax = availablePax.find((p) => p.id === parseInt(paxId));
		if (selectedPax) {
			editingVenue.paxPrices[index].paxId = selectedPax.id;
			editingVenue.paxPrices[index].pax = selectedPax.pax;
		}
	}

	function saveEditVenue() {
		if (editingVenue) {
			venueList = venueList.map((v) =>
				v.id === editingVenue.id
					? {
							...editingVenue,
							paxPrices: editingVenue.paxPrices.map((pp) => ({
								paxId: pp.paxId,
								pax: pp.pax,
								price: pp.price
							}))
						}
					: v
			);
			closeEditModal();
		}
	}
</script>

<div>
	<h2 class="text-2xl font-bold text-gray-800 mb-6">Venue Management</h2>

	<div class="bg-white rounded-lg shadow-lg overflow-hidden">
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Venue
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Number of Pax
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Price
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							Actions
						</th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each venueList as venue}
						{#each venue.paxPrices as paxPrice, paxIndex}
							<tr>
								{#if paxIndex === 0}
									<td
										class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
										rowspan={venue.paxPrices.length}
									>
										{venue.venue}
									</td>
								{/if}
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{paxPrice.pax} Orang
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{formatCurrency(paxPrice.price)}
								</td>
								{#if paxIndex === 0}
									<td
										class="px-6 py-4 whitespace-nowrap text-sm"
										rowspan={venue.paxPrices.length}
									>
										<div class="flex gap-2">
											<button
												on:click={() => openEditModal(venue)}
												class="px-4 py-2 text-sm text-amber-700 border border-amber-700 rounded-md hover:bg-amber-50 transition-colors"
											>
												Edit
											</button>
											<button
												on:click={() => deleteVenue(venue.id)}
												class="text-red-500 hover:text-red-700 transition-colors"
											>
												<svg
													class="w-5 h-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													/>
												</svg>
											</button>
										</div>
									</td>
								{/if}
							</tr>
						{/each}
					{/each}
				</tbody>
			</table>
		</div>

		<div class="mt-4">
			<button
				on:click={openAddModal}
				class="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
			>
				Add New Venue
			</button>
		</div>
	</div>
</div>

{#if showAddModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
		<div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
			<div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
				<h3 class="text-xl font-bold text-gray-800">Add New Venue</h3>
				<button on:click={closeAddModal} class="text-gray-400 hover:text-gray-600">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div class="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">Venue Name</label>
					<input
						type="text"
						bind:value={newVenue.venue}
						placeholder="Enter venue name"
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
					/>
				</div>

				<div>
					<div class="flex justify-between items-center mb-3">
						<label class="block text-sm font-medium text-gray-700">Pax and Prices</label>
						<button on:click={addPaxPrice} class="text-sm text-amber-600 hover:text-amber-700">
							+ Add Pax
						</button>
					</div>

					{#if newVenue.paxPrices.length === 0}
						<p class="text-sm text-gray-500 italic">No pax added yet. Click "Add Pax" to start.</p>
					{:else}
						<div class="space-y-3">
							{#each newVenue.paxPrices as paxPrice, index}
								<div class="flex gap-3 items-end p-4 bg-gray-50 rounded-lg">
									<div class="flex-1">
										<label class="block text-xs font-medium text-gray-700 mb-1">Pax</label>
										<select
											bind:value={paxPrice.tempPaxSelect}
											on:change={(e) => updatePaxSelection(index, e.target.value)}
											class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
										>
											<option value="">Select Pax</option>
											{#each availablePax as pax}
												<option value={pax.id}>{pax.pax} Orang</option>
											{/each}
										</select>
									</div>
									<div class="flex-1">
										<label class="block text-xs font-medium text-gray-700 mb-1">Price</label>
										<input
											type="number"
											bind:value={paxPrice.price}
											placeholder="Enter price"
											class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
										/>
									</div>
									<button
										on:click={() => removePaxPrice(index)}
										class="text-red-500 hover:text-red-700 pb-2"
									>
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
				<button
					on:click={closeAddModal}
					class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
				>
					Cancel
				</button>
				<button
					on:click={addVenue}
					class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
				>
					Add Venue
				</button>
			</div>
		</div>
	</div>
{/if}

{#if showEditModal && editingVenue}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
		<div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
			<div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
				<h3 class="text-xl font-bold text-gray-800">Edit Venue</h3>
				<button on:click={closeEditModal} class="text-gray-400 hover:text-gray-600">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div class="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">Venue Name</label>
					<input
						type="text"
						bind:value={editingVenue.venue}
						placeholder="Enter venue name"
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
					/>
				</div>

				<div>
					<div class="flex justify-between items-center mb-3">
						<label class="block text-sm font-medium text-gray-700">Pax and Prices</label>
						<button
							on:click={addPaxPriceToEdit}
							class="text-sm text-amber-600 hover:text-amber-700"
						>
							+ Add Pax
						</button>
					</div>

					{#if editingVenue.paxPrices.length === 0}
						<p class="text-sm text-gray-500 italic">No pax added yet.</p>
					{:else}
						<div class="space-y-3">
							{#each editingVenue.paxPrices as paxPrice, index}
								<div class="flex gap-3 items-end p-4 bg-gray-50 rounded-lg">
									<div class="flex-1">
										<label class="block text-xs font-medium text-gray-700 mb-1">Pax</label>
										<select
											bind:value={paxPrice.tempPaxSelect}
											on:change={(e) => updatePaxSelectionInEdit(index, e.target.value)}
											class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
										>
											<option value="">Select Pax</option>
											{#each availablePax as pax}
												<option value={pax.id} selected={pax.pax === paxPrice.pax}
													>{pax.pax} Orang</option
												>
											{/each}
										</select>
									</div>
									<div class="flex-1">
										<label class="block text-xs font-medium text-gray-700 mb-1">Price</label>
										<input
											type="number"
											bind:value={paxPrice.price}
											placeholder="Enter price"
											class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
										/>
									</div>
									<button
										on:click={() => removePaxPriceFromEdit(index)}
										class="text-red-500 hover:text-red-700 pb-2"
									>
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
				<button
					on:click={closeEditModal}
					class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
				>
					Cancel
				</button>
				<button
					on:click={saveEditVenue}
					class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
				>
					Save Changes
				</button>
			</div>
		</div>
	</div>
{/if}