// Master Pax Data
// This is the source of truth for all pax numbers in the system
export const masterPax = [
	{ id: 1, pax: 200 },
	{ id: 2, pax: 400 },
	{ id: 3, pax: 500 },
	{ id: 4, pax: 600 },
	{ id: 5, pax: 800 },
	{ id: 6, pax: 1000 }
];

// Helper function to get pax by id
export function getPaxById(id) {
	return masterPax.find((p) => p.id === id);
}

// Helper function to get pax by number
export function getPaxByNumber(paxNumber) {
	return masterPax.find((p) => p.pax === paxNumber);
}