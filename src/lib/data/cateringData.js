// Catering Master Data
// All catering options including Gubukan Basic, Gubukan Special, Buffet, Box, and Snack Box

// Gubukan Basic - organized by category and item
export const gubukanBasicData = [
	{ id: 1, category: 'Appetizer', item: 'Spring Roll', unitPrice: 15000 },
	{ id: 2, category: 'Appetizer', item: 'Lumpia Semarang', unitPrice: 18000 },
	{ id: 3, category: 'Main Course', item: 'Nasi Goreng Spesial', unitPrice: 35000 },
	{ id: 4, category: 'Main Course', item: 'Ayam Bakar Taliwang', unitPrice: 45000 },
	{ id: 5, category: 'Main Course', item: 'Ikan Bakar Jimbaran', unitPrice: 50000 },
	{ id: 6, category: 'Dessert', item: 'Es Campur', unitPrice: 20000 },
	{ id: 7, category: 'Dessert', item: 'Pudding Coklat', unitPrice: 15000 },
	{ id: 8, category: 'Beverage', item: 'Jus Buah Segar', unitPrice: 12000 },
	{ id: 9, category: 'Beverage', item: 'Es Teh Manis', unitPrice: 8000 }
];

// Gubukan Special - vendor-based premium catering
export const gubukanSpecialData = [
	{ id: 1, vendor: 'Catering Premium Jakarta', keterangan: 'International Fusion Menu', unitPrice: 150000 },
	{ id: 2, vendor: 'Royal Catering', keterangan: 'Traditional Indonesian Premium', unitPrice: 125000 },
	{ id: 3, vendor: 'Deluxe Kitchen', keterangan: 'Western Fine Dining', unitPrice: 200000 },
	{ id: 4, vendor: 'Asian Delights Catering', keterangan: 'Pan-Asian Cuisine', unitPrice: 175000 }
];

// Buffet Types with detailed menu categories
export const buffetData = [
	{
		id: 1,
		tipe: 'Buffet Standard',
		unitPrice: 85000,
		menuDetails: [
			{ kategori: 'Appetizer', menu: 'Salad Bar, Soup Station' },
			{ kategori: 'Main Course', menu: 'Nasi Putih, Ayam Goreng, Ikan Bakar, Sayur Asem' },
			{ kategori: 'Dessert', menu: 'Fresh Fruit, Pudding' }
		]
	},
	{
		id: 2,
		tipe: 'Buffet Premium',
		unitPrice: 150000,
		menuDetails: [
			{ kategori: 'Appetizer', menu: 'International Salad, Cream Soup, Bread Station' },
			{ kategori: 'Main Course', menu: 'Nasi Kebuli, Beef Tenderloin, Grilled Salmon, Pasta, Mixed Vegetables' },
			{ kategori: 'Dessert', menu: 'Cake Selection, Ice Cream Bar, Tropical Fruits' }
		]
	},
	{
		id: 3,
		tipe: 'Buffet Luxury',
		unitPrice: 250000,
		menuDetails: [
			{ kategori: 'Appetizer', menu: 'Caviar Station, Sushi Bar, Caesar Salad, French Onion Soup' },
			{ kategori: 'Main Course', menu: 'Wagyu Beef, Lobster Thermidor, Duck Confit, Truffle Risotto' },
			{ kategori: 'Dessert', menu: 'French Pastries, Chocolate Fountain, Premium Ice Cream' }
		]
	},
	{
		id: 4,
		tipe: 'Buffet Traditional',
		unitPrice: 95000,
		menuDetails: [
			{ kategori: 'Appetizer', menu: 'Gado-gado, Karedok, Lumpia' },
			{ kategori: 'Main Course', menu: 'Nasi Kuning, Rendang, Ayam Betutu, Pepes Ikan, Sayur Lodeh' },
			{ kategori: 'Dessert', menu: 'Es Campur, Klepon, Kolak' }
		]
	}
];

// Box Meals
export const boxData = [
	{ id: 1, item: 'Box Nasi Kotak Standard', unitPrice: 25000 },
	{ id: 2, item: 'Box Nasi Kotak Premium', unitPrice: 45000 },
	{ id: 3, item: 'Box Nasi Kotak Luxury', unitPrice: 75000 },
	{ id: 4, item: 'Box Nasi Liwet', unitPrice: 35000 },
	{ id: 5, item: 'Box Nasi Kebuli', unitPrice: 40000 }
];

// Snack Box
export const snackBoxData = [
	{ id: 1, item: 'Snack Box Mini', unitPrice: 15000 },
	{ id: 2, item: 'Snack Box Standard', unitPrice: 25000 },
	{ id: 3, item: 'Snack Box Premium', unitPrice: 40000 },
	{ id: 4, item: 'Snack Box Traditional', unitPrice: 20000 },
	{ id: 5, item: 'Snack Box International', unitPrice: 35000 }
];

// Helper functions
export function getGubukanBasicByCategory(category) {
	return gubukanBasicData.filter((item) => item.category === category);
}

export function getGubukanBasicCategories() {
	return [...new Set(gubukanBasicData.map((item) => item.category))];
}

export function getBuffetById(id) {
	return buffetData.find((buffet) => buffet.id === id);
}

export function getBuffetByType(type) {
	return buffetData.find((buffet) => buffet.tipe === type);
}