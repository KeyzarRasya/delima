// Pendukung (Supporting Services) Master Data

// MC (Master of Ceremony) Options
export const mcData = [
	{ id: 1, name: 'MC Budi Santoso', specialty: 'Traditional Wedding', price: 3000000 },
	{ id: 2, name: 'MC Sarah Wijaya', specialty: 'Modern Wedding', price: 4000000 },
	{ id: 3, name: 'MC Dedi Prasetyo', specialty: 'Bilingual (ID-EN)', price: 5000000 },
	{ id: 4, name: 'MC Rina Kusuma', specialty: 'Casual & Fun', price: 3500000 },
	{ id: 5, name: 'MC Andre Taulany', specialty: 'Celebrity MC', price: 15000000 }
];

// Upacara Adat (Traditional Ceremony) Options
export const upacaraAdatData = [
	{ id: 1, name: 'Upacara Adat Jawa', description: 'Complete Javanese Wedding Ceremony', price: 8000000 },
	{ id: 2, name: 'Upacara Adat Sunda', description: 'Complete Sundanese Wedding Ceremony', price: 7500000 },
	{ id: 3, name: 'Upacara Adat Minang', description: 'Complete Minangkabau Wedding Ceremony', price: 9000000 },
	{ id: 4, name: 'Upacara Adat Betawi', description: 'Complete Betawi Wedding Ceremony', price: 7000000 },
	{ id: 5, name: 'Upacara Adat Batak', description: 'Complete Batak Wedding Ceremony', price: 8500000 }
];

// Intagiri (Traditional Performers/Cultural Representatives)
export const intagiriData = [
	{ id: 1, name: 'Intagiri Traditional - Basic', description: '2 Performers', price: 3000000 },
	{ id: 2, name: 'Intagiri Traditional - Standard', description: '4 Performers', price: 5000000 },
	{ id: 3, name: 'Intagiri Traditional - Premium', description: '6 Performers', price: 7500000 },
	{ id: 4, name: 'Intagiri Royal - Complete', description: '8 Performers with Full Costume', price: 12000000 }
];

// Tarian (Traditional Dance) Options
export const tarianData = [
	{ id: 1, name: 'Tari Saman', description: 'Traditional Aceh Dance', numberOfDancers: 8, price: 6000000 },
	{ id: 2, name: 'Tari Jaipong', description: 'Traditional West Java Dance', numberOfDancers: 4, price: 4000000 },
	{ id: 3, name: 'Tari Kecak', description: 'Traditional Bali Dance', numberOfDancers: 10, price: 8000000 },
	{ id: 4, name: 'Tari Piring', description: 'Traditional Minang Dance', numberOfDancers: 6, price: 5000000 },
	{ id: 5, name: 'Tari Pendet', description: 'Traditional Bali Welcome Dance', numberOfDancers: 4, price: 3500000 },
	{ id: 6, name: 'Tari Serimpi', description: 'Traditional Yogyakarta Court Dance', numberOfDancers: 4, price: 5500000 },
	{ id: 7, name: 'Tari Tor-Tor', description: 'Traditional Batak Dance', numberOfDancers: 6, price: 4500000 }
];

// Helper functions
export function getMcById(id) {
	return mcData.find((mc) => mc.id === id);
}

export function getMcByName(name) {
	return mcData.find((mc) => mc.name === name);
}

export function getUpacaraAdatById(id) {
	return upacaraAdatData.find((upacara) => upacara.id === id);
}

export function getUpacaraAdatByName(name) {
	return upacaraAdatData.find((upacara) => upacara.name === name);
}

export function getIntagiriById(id) {
	return intagiriData.find((intagiri) => intagiri.id === id);
}

export function getIntagiriByName(name) {
	return intagiriData.find((intagiri) => intagiri.name === name);
}

export function getTarianById(id) {
	return tarianData.find((tarian) => tarian.id === id);
}

export function getTarianByName(name) {
	return tarianData.find((tarian) => tarian.name === name);
}