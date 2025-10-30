<script>
	import { contacts } from '$lib/data/contactsData.js';

	let contactsList = contacts;
	let searchQuery = '';
	let filterType = '';

	let showAddModal = false;
	let newContact = {
		nama: '',
		email: '',
		noHp: '',
		alamat: '',
		type: '',
		packages: [{ paket: '', harga: '' }]
	};

	const typeOptions = [
		'Photo & Video',
		'Rias & Busana',
		'Dekorasi',
		'Entertainment',
		'Wedding Organizer'
	];

	const typeColors = {
		'Photo & Video': 'bg-blue-100 text-blue-800',
		'Rias & Busana': 'bg-pink-100 text-pink-800',
		'Dekorasi': 'bg-purple-100 text-purple-800',
		'Entertainment': 'bg-green-100 text-green-800',
		'Wedding Organizer': 'bg-amber-100 text-amber-800'
	};

	$: filteredContacts = contactsList.filter((contact) => {
		const matchesSearch =
			contact.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
			contact.type.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesType = filterType === '' || contact.type === filterType;
		return matchesSearch && matchesType;
	});

	function openAddModal() {
		showAddModal = true;
		newContact = {
			nama: '',
			email: '',
			noHp: '',
			alamat: '',
			type: '',
			packages: [{ paket: '', harga: '' }]
		};
	}

	function closeAddModal() {
		showAddModal = false;
	}

	function addPackageRow() {
		newContact.packages = [...newContact.packages, { paket: '', harga: '' }];
	}

	function removePackageRow(index) {
		newContact.packages = newContact.packages.filter((_, i) => i !== index);
	}

	function saveContact() {
		const contact = {
			id: contactsList.length > 0 ? Math.max(...contactsList.map((c) => c.id)) + 1 : 1,
			...newContact,
			packages: newContact.packages.filter((p) => p.paket && p.harga)
		};
		contactsList = [...contactsList, contact];
		closeAddModal();
	}

	function deleteContact(id) {
		if (confirm('Are you sure you want to delete this contact?')) {
			contactsList = contactsList.filter((c) => c.id !== id);
		}
	}

	function formatPrice(price) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(price);
	}
</script>

<div class="space-y-6">
	<div class="bg-white rounded-lg shadow-lg p-6">
		<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
			<div>
				<h2 class="text-2xl font-bold text-gray-800">Contact Management</h2>
				<p class="text-gray-600 mt-1">Manage your vendor contacts and packages</p>
			</div>
			<button
				on:click={openAddModal}
				class="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2 shadow-md"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					/>
				</svg>
				Add Contact
			</button>
		</div>

		<div class="flex flex-col md:flex-row gap-4">
			<div class="flex-1">
				<div class="relative">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search by name or type..."
						class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
					/>
					<svg
						class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
			</div>
			<div class="md:w-64">
				<select
					bind:value={filterType}
					class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
				>
					<option value="">All Types</option>
					{#each typeOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each filteredContacts as contact}
			<div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
				<div class="p-6">
					<div class="flex items-start justify-between mb-4">
						<div class="flex-1">
							<h3 class="text-xl font-bold text-gray-800 mb-2">{contact.nama}</h3>
							<span
								class="inline-block px-3 py-1 rounded-full text-xs font-semibold {typeColors[
									contact.type
								] || 'bg-gray-100 text-gray-800'}"
							>
								{contact.type}
							</span>
						</div>
						<button
							on:click={() => deleteContact(contact.id)}
							class="text-red-500 hover:text-red-700 transition-colors p-2"
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

					<div class="space-y-3 mb-4">
						<div class="flex items-start gap-3">
							<svg
								class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
							<span class="text-sm text-gray-600 break-all">{contact.email}</span>
						</div>
						<div class="flex items-start gap-3">
							<svg
								class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
							<span class="text-sm text-gray-600">{contact.noHp}</span>
						</div>
						<div class="flex items-start gap-3">
							<svg
								class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							<span class="text-sm text-gray-600">{contact.alamat}</span>
						</div>
					</div>

					<div class="border-t border-gray-200 pt-4">
						<h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
								/>
							</svg>
							Packages
						</h4>
						<div class="space-y-2">
							{#each contact.packages as pkg}
								<div class="bg-gray-50 rounded-lg p-3">
									<div class="flex justify-between items-start">
										<span class="text-sm font-medium text-gray-700">{pkg.paket}</span>
										<span class="text-sm font-bold text-amber-600"
											>{formatPrice(pkg.harga)}</span
										>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	{#if filteredContacts.length === 0}
		<div class="bg-white rounded-lg shadow-lg p-12 text-center">
			<svg
				class="w-16 h-16 text-gray-300 mx-auto mb-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
			<h3 class="text-xl font-semibold text-gray-700 mb-2">No contacts found</h3>
			<p class="text-gray-500">Try adjusting your search or filter criteria</p>
		</div>
	{/if}
</div>

{#if showAddModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
		<div class="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
			<div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
				<h3 class="text-xl font-bold text-gray-800">Add New Contact</h3>
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
					<label for="nama" class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
					<input
						type="text"
						id="nama"
						bind:value={newContact.nama}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
						placeholder="Enter name"
					/>
				</div>

				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
					<input
						type="email"
						id="email"
						bind:value={newContact.email}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
						placeholder="Enter email"
					/>
				</div>

				<div>
					<label for="noHp" class="block text-sm font-medium text-gray-700 mb-1">No HP</label>
					<input
						type="text"
						id="noHp"
						bind:value={newContact.noHp}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
						placeholder="Enter phone number"
					/>
				</div>

				<div>
					<label for="alamat" class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
					<textarea
						id="alamat"
						bind:value={newContact.alamat}
						rows="3"
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
						placeholder="Enter address"
					/>
				</div>

				<div>
					<label for="type" class="block text-sm font-medium text-gray-700 mb-1">Type</label>
					<select
						id="type"
						bind:value={newContact.type}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
					>
						<option value="">Select type</option>
						{#each typeOptions as option}
							<option value={option}>{option}</option>
						{/each}
					</select>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">List of Package</label>
					<div class="border border-gray-300 rounded-md overflow-hidden">
						<table class="min-w-full">
							<thead>
								<tr class="bg-gray-50">
									<th
										class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
									>
										No
									</th>
									<th
										class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
									>
										Paket
									</th>
									<th
										class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
									>
										Harga
									</th>
									<th
										class="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
									>
										Aksi
									</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								{#each newContact.packages as pkg, index}
									<tr>
										<td class="px-4 py-2 text-sm text-gray-900">{index + 1}</td>
										<td class="px-4 py-2">
											<input
												type="text"
												bind:value={pkg.paket}
												class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
												placeholder="Package name"
											/>
										</td>
										<td class="px-4 py-2">
											<input
												type="text"
												bind:value={pkg.harga}
												class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
												placeholder="Price"
											/>
										</td>
										<td class="px-4 py-2 text-center">
											<button
												on:click={() => removePackageRow(index)}
												class="text-red-600 hover:text-red-800"
											>
												<svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													/>
												</svg>
											</button>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
					<button
						on:click={addPackageRow}
						class="mt-2 px-4 py-2 text-amber-700 border border-amber-700 rounded-md hover:bg-amber-50 transition-colors"
					>
						Add Row
					</button>
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
					on:click={saveContact}
					class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
				>
					Save Contact
				</button>
			</div>
		</div>
	</div>
{/if}