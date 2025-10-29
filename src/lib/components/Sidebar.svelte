<script>
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let activeMenu = 'photo-video';

	const dispatch = createEventDispatcher();

	let isPricelistOpen = true;
	let isMasterDataOpen = false;

	const menuItems = [
		{ id: 'photo-video', label: 'Photo & Video' },
		{ id: 'rias-busana', label: 'Rias & Busana' },
		{ id: 'dekorasi', label: 'Dekorasi' },
		{ id: 'entertainment', label: 'Entertainment' },
		{ id: 'pendukung', label: 'Pendukung' },
		{ id: 'catering', label: 'Catering' }
	];

	const masterDataItems = [
		{ id: 'venue', label: 'Venue' },
		{ id: 'pax', label: 'Pax' }
	];

	function selectMenu(menuId) {
		dispatch('menuChange', menuId);
		goto('/');
	}

	function togglePricelist() {
		isPricelistOpen = !isPricelistOpen;
		if (isPricelistOpen && !$page.url.pathname.startsWith('/crm')) {
			// Already on pricelist page, just toggle
		} else if (isPricelistOpen) {
			// Navigate to pricelist from CRM
			goto('/');
		}
	}

	function toggleMasterData() {
		isMasterDataOpen = !isMasterDataOpen;
	}

	function selectMasterDataMenu(menuId) {
		dispatch('menuChange', menuId);
		goto('/');
	}

	$: currentPath = $page.url.pathname;
	$: isCrmPage = currentPath.startsWith('/crm');
	$: isMasterDataPage = activeMenu === 'venue' || activeMenu === 'pax';
</script>

<aside class="w-64 bg-white shadow-lg h-screen overflow-y-auto">
	<div class="p-6 border-b border-gray-200">
		<h2 class="text-xl font-bold text-amber-700">Delima</h2>
		<p class="text-sm text-gray-600">Catering Services</p>
	</div>

	<nav class="p-4">
		<ul class="space-y-2">
			<li>
				<button
					class="w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-between {!isCrmPage &&
					!isMasterDataPage
						? 'bg-amber-100 text-amber-800'
						: 'text-gray-700 hover:bg-gray-100'}"
					on:click={togglePricelist}
				>
					<span>Pricelist</span>
					<svg
						class="w-5 h-5 transition-transform duration-200 {isPricelistOpen ? 'rotate-180' : ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>

				{#if isPricelistOpen}
					<ul class="mt-2 ml-4 space-y-1">
						{#each menuItems as item}
							<li>
								<button
									class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 text-sm {activeMenu ===
										item.id && !isCrmPage
										? 'bg-amber-100 text-amber-800 font-semibold'
										: 'text-gray-600 hover:bg-gray-100'}"
									on:click={() => selectMenu(item.id)}
								>
									{item.label}
								</button>
							</li>
						{/each}
					</ul>
				{/if}
			</li>

			<li>
				<button
					class="w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-between {isMasterDataPage &&
					!isCrmPage
						? 'bg-amber-100 text-amber-800'
						: 'text-gray-700 hover:bg-gray-100'}"
					on:click={toggleMasterData}
				>
					<span>Master Data</span>
					<svg
						class="w-5 h-5 transition-transform duration-200 {isMasterDataOpen
							? 'rotate-180'
							: ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>

				{#if isMasterDataOpen}
					<ul class="mt-2 ml-4 space-y-1">
						{#each masterDataItems as item}
							<li>
								<button
									class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 text-sm {activeMenu ===
										item.id && !isCrmPage
										? 'bg-amber-100 text-amber-800 font-semibold'
										: 'text-gray-600 hover:bg-gray-100'}"
									on:click={() => selectMasterDataMenu(item.id)}
								>
									{item.label}
								</button>
							</li>
						{/each}
					</ul>
				{/if}
			</li>

			<li>
				<a
					href="/crm"
					class="block w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 font-semibold {isCrmPage
						? 'bg-amber-100 text-amber-800'
						: 'text-gray-700 hover:bg-gray-100'}"
				>
					CRM
				</a>
			</li>
		</ul>
	</nav>
</aside>