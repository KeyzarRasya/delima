// src/lib/data/paxDetails.js
export const paxDetails = [
	{
		paxId: 1,
		pax: 200,
		category: 'Small',
		description: 'Intimate gathering perfect for close family and friends',
		recommendedVenues: ['Studio Kencana', 'Paradise Garden'],
		buffetRecommendation: {
			minQuantity: 200,
			maxQuantity: 220,
			notes: 'Add 10% buffer for extra servings'
		},
		gubukanRecommendation: {
			minQuantity: 200,
			maxQuantity: 220,
			notes: 'Standard portion per guest'
		},
		vendorRecommendations: {
			dekorasi: 'Basic to Medium package',
			riasBusana: '1-2 sets',
			photoVideo: 'Standard package',
			entertainment: 'Solo or Duo',
			mc: '1 MC'
		},
		estimatedBudgetRange: {
			min: 45000000,
			max: 60000000
		},
		defaultData: {
			buffetItems: [
				{ category: 'Appetizer', menu: 'Salad Bar, Soup Station', notes: '' },
				{ category: 'Main Course', menu: 'Nasi Putih, Ayam Goreng, Ikan Bakar', notes: '' }
			],
			gubukanItems: [
				{ category: 'Main Course', menu: 'Ayam Penyet', quantity: '200', notes: '' }
			],
			dekorasiItems: [
				{ item: 'Dekorasi Pelaminan Simple', quantity: '1', notes: '' }
			],
			riasBusanaItems: [
				{ item: 'Paket Rias Pengantin', quantity: '1', notes: '' }
			],
			photoVideoItems: [
				{ item: 'Paket Foto Standard', quantity: '1', notes: '' }
			]
		}
	},
	{
		paxId: 2,
		pax: 400,
		category: 'Medium',
		description: 'Popular choice for standard wedding receptions',
		recommendedVenues: ['Studio Kencana', 'Royal Hall'],
		buffetRecommendation: {
			minQuantity: 400,
			maxQuantity: 440,
			notes: 'Add 10% buffer for extra servings'
		},
		gubukanRecommendation: {
			minQuantity: 400,
			maxQuantity: 440,
			notes: 'Standard portion per guest'
		},
		vendorRecommendations: {
			dekorasi: 'Medium to Premium package',
			riasBusana: '2-3 sets',
			photoVideo: 'Premium package',
			entertainment: 'Duo or Band',
			mc: '1-2 MC'
		},
		estimatedBudgetRange: {
			min: 75000000,
			max: 100000000
		},
		defaultData: {
			buffetItems: [
				{ category: 'Appetizer', menu: 'International Salad, Soup', notes: '' },
				{ category: 'Main Course', menu: 'Nasi Kebuli, Beef Rendang', notes: '' },
				{ category: 'Dessert', menu: 'Fruit Platter, Pudding', notes: '' }
			],
			gubukanItems: [
				{ category: 'Main Course', menu: 'Ayam Bakar Taliwang', quantity: '400', notes: '' },
				{ category: 'Side Dish', menu: 'Pepes Ikan', quantity: '200', notes: '' }
			],
			dekorasiItems: [
				{ item: 'Dekorasi Pelaminan Modern', quantity: '1', notes: '' },
				{ item: 'Dekorasi Jalan Masuk', quantity: '1', notes: '' }
			],
			riasBusanaItems: [
				{ item: 'Paket Rias Pengantin Complete', quantity: '1', notes: '' },
				{ item: 'Busana Pengantin Adat', quantity: '1', notes: '' }
			],
			photoVideoItems: [
				{ item: 'Paket Foto Premium', quantity: '1', notes: '' },
				{ item: 'Paket Video Standard', quantity: '1', notes: '' }
			]
		}
	},
	{
		paxId: 3,
		pax: 500,
		category: 'Medium-Large',
		description: 'Grand celebration with extended family and colleagues',
		recommendedVenues: ['Grand Ballroom', 'Royal Hall', 'Paradise Garden'],
		buffetRecommendation: {
			minQuantity: 500,
			maxQuantity: 550,
			notes: 'Add 10% buffer for extra servings'
		},
		gubukanRecommendation: {
			minQuantity: 500,
			maxQuantity: 550,
			notes: 'Standard portion per guest'
		},
		vendorRecommendations: {
			dekorasi: 'Premium package',
			riasBusana: '3-4 sets',
			photoVideo: 'Premium to Luxury package',
			entertainment: 'Band or Orchestra',
			mc: '2 MC'
		},
		estimatedBudgetRange: {
			min: 90000000,
			max: 130000000
		},
		defaultData: {
			buffetItems: [
				{ category: 'Appetizer', menu: 'International Salad, Cream Soup', notes: '' },
				{ category: 'Main Course', menu: 'Nasi Kebuli, Beef Tenderloin, Grilled Fish', notes: '' },
				{ category: 'Dessert', menu: 'Cake Selection, Ice Cream', notes: '' }
			],
			gubukanItems: [
				{ category: 'Main Course', menu: 'Ikan Bakar Jimbaran', quantity: '500', notes: '' },
				{ category: 'Side Dish', menu: 'Sambal Matah', quantity: '500', notes: '' }
			],
			dekorasiItems: [
				{ item: 'Dekorasi Pelaminan Luxury', quantity: '1', notes: '' },
				{ item: 'Dekorasi Entrance Grand', quantity: '1', notes: '' },
				{ item: 'Dekorasi Meja Tamu', quantity: '25', notes: '' }
			],
			riasBusanaItems: [
				{ item: 'Paket Rias Pengantin Luxury', quantity: '1', notes: '' },
				{ item: 'Busana Pengantin Modern', quantity: '1', notes: '' },
				{ item: 'Busana Pengantin Adat', quantity: '1', notes: '' }
			],
			photoVideoItems: [
				{ item: 'Paket Foto Luxury', quantity: '1', notes: '' },
				{ item: 'Paket Video Premium', quantity: '1', notes: '' },
				{ item: 'Album Premium', quantity: '2', notes: '' }
			]
		}
	},
	{
		paxId: 4,
		pax: 600,
		category: 'Large',
		description: 'Large celebration for extended family, friends, and business associates',
		recommendedVenues: ['Studio Kencana', 'Grand Ballroom'],
		buffetRecommendation: {
			minQuantity: 600,
			maxQuantity: 660,
			notes: 'Add 10% buffer for extra servings'
		},
		gubukanRecommendation: {
			minQuantity: 600,
			maxQuantity: 660,
			notes: 'Standard portion per guest'
		},
		vendorRecommendations: {
			dekorasi: 'Premium to Luxury package',
			riasBusana: '4-5 sets',
			photoVideo: 'Luxury package',
			entertainment: 'Band or Orchestra',
			mc: '2 MC'
		},
		estimatedBudgetRange: {
			min: 95000000,
			max: 150000000
		},
		defaultData: {
			buffetItems: [
				{ category: 'Appetizer', menu: 'Caviar Station, Sushi Bar', notes: '' },
				{ category: 'Main Course', menu: 'Wagyu Beef, Lobster Thermidor', notes: '' },
				{ category: 'Dessert', menu: 'French Pastries, Chocolate Fountain', notes: '' }
			],
			gubukanItems: [
				{ category: 'Premium Course', menu: 'Lobster Grilled', quantity: '600', notes: '' },
				{ category: 'Side Dish', menu: 'Butter Garlic Sauce', quantity: '600', notes: '' }
			],
			dekorasiItems: [
				{ item: 'Dekorasi Pelaminan Ultra Luxury', quantity: '1', notes: '' },
				{ item: 'Dekorasi Entrance Premium', quantity: '1', notes: '' },
				{ item: 'Dekorasi Meja Tamu Premium', quantity: '30', notes: '' }
			],
			riasBusanaItems: [
				{ item: 'Paket Rias Pengantin Complete Luxury', quantity: '1', notes: '' },
				{ item: 'Busana Pengantin Designer', quantity: '2', notes: '' },
				{ item: 'Busana Orang Tua', quantity: '4', notes: '' }
			],
			photoVideoItems: [
				{ item: 'Paket Foto Complete', quantity: '1', notes: '' },
				{ item: 'Paket Video Cinematic', quantity: '1', notes: '' },
				{ item: 'Drone Coverage', quantity: '1', notes: '' },
				{ item: 'Album Premium Deluxe', quantity: '3', notes: '' }
			]
		}
	},
	{
		paxId: 5,
		pax: 800,
		category: 'Very Large',
		description: 'Grand scale event with extensive guest list',
		recommendedVenues: ['Grand Ballroom', 'Paradise Garden'],
		buffetRecommendation: {
			minQuantity: 800,
			maxQuantity: 880,
			notes: 'Add 10% buffer for extra servings'
		},
		gubukanRecommendation: {
			minQuantity: 800,
			maxQuantity: 880,
			notes: 'Standard portion per guest'
		},
		vendorRecommendations: {
			dekorasi: 'Luxury package',
			riasBusana: '5-6 sets',
			photoVideo: 'Luxury package with drone',
			entertainment: 'Orchestra or Multiple Bands',
			mc: '2-3 MC'
		},
		estimatedBudgetRange: {
			min: 140000000,
			max: 200000000
		},
		defaultData: {
			buffetItems: [
				{ category: 'Appetizer', menu: 'Premium Seafood Bar, International Salad', notes: '' },
				{ category: 'Main Course', menu: 'Prime Beef, Fresh Lobster, Roasted Lamb', notes: '' },
				{ category: 'Dessert', menu: 'Premium Cake Selection, Gelato Bar', notes: '' }
			],
			gubukanItems: [
				{ category: 'Premium Course', menu: 'King Crab Grilled', quantity: '800', notes: '' },
				{ category: 'Premium Course', menu: 'Wagyu Steak', quantity: '400', notes: '' }
			],
			dekorasiItems: [
				{ item: 'Dekorasi Grand Ballroom Complete', quantity: '1', notes: '' },
				{ item: 'Dekorasi LED Wall', quantity: '2', notes: '' },
				{ item: 'Dekorasi Lighting Premium', quantity: '1', notes: '' }
			],
			riasBusanaItems: [
				{ item: 'Paket Rias Pengantin Celebrity', quantity: '1', notes: '' },
				{ item: 'Busana Pengantin International Designer', quantity: '3', notes: '' },
				{ item: 'Busana Keluarga Complete', quantity: '8', notes: '' }
			],
			photoVideoItems: [
				{ item: 'Paket Foto Complete Pro', quantity: '1', notes: '' },
				{ item: 'Paket Video Cinematic Complete', quantity: '1', notes: '' },
				{ item: 'Multi-Drone Coverage', quantity: '2', notes: '' },
				{ item: 'Same Day Edit', quantity: '1', notes: '' }
			]
		}
	},
	{
		paxId: 6,
		pax: 1000,
		category: 'Premium Large',
		description: 'Premium large-scale celebration for maximum capacity',
		recommendedVenues: ['Royal Hall'],
		buffetRecommendation: {
			minQuantity: 1000,
			maxQuantity: 1100,
			notes: 'Add 10% buffer for extra servings'
		},
		gubukanRecommendation: {
			minQuantity: 1000,
			maxQuantity: 1100,
			notes: 'Standard portion per guest'
		},
		vendorRecommendations: {
			dekorasi: 'Ultra Luxury package',
			riasBusana: '6-8 sets',
			photoVideo: 'Ultra Luxury package with drone and cinematic',
			entertainment: 'Multiple Bands and Orchestra',
			mc: '3-4 MC'
		},
		estimatedBudgetRange: {
			min: 200000000,
			max: 300000000
		},
		defaultData: {
			buffetItems: [
				{ category: 'Appetizer', menu: 'Ultra Premium Seafood, Caviar Station', notes: '' },
				{ category: 'Main Course', menu: 'Premium Wagyu, King Lobster, Lamb Chops', notes: '' },
				{ category: 'Dessert', menu: 'Luxury Dessert Bar, Premium Ice Cream', notes: '' }
			],
			gubukanItems: [
				{ category: 'Ultra Premium', menu: 'Kobe Beef Grilled', quantity: '1000', notes: '' },
				{ category: 'Ultra Premium', menu: 'Live Seafood Station', quantity: '1000', notes: '' }
			],
			dekorasiItems: [
				{ item: 'Dekorasi Ultra Luxury Complete', quantity: '1', notes: '' },
				{ item: 'Dekorasi LED Wall Interactive', quantity: '4', notes: '' },
				{ item: 'Dekorasi Lighting System Pro', quantity: '1', notes: '' },
				{ item: 'Special Effects', quantity: '1', notes: '' }
			],
			riasBusanaItems: [
				{ item: 'Paket Rias Celebrity Stylist', quantity: '1', notes: '' },
				{ item: 'Busana Designer Collection Complete', quantity: '5', notes: '' },
				{ item: 'Busana Extended Family', quantity: '12', notes: '' }
			],
			photoVideoItems: [
				{ item: 'Paket Foto Complete Ultimate', quantity: '1', notes: '' },
				{ item: 'Paket Video Production Complete', quantity: '1', notes: '' },
				{ item: 'Professional Drone Team', quantity: '3', notes: '' },
				{ item: 'Live Streaming', quantity: '1', notes: '' },
				{ item: 'Same Day Edit Premium', quantity: '1', notes: '' }
			]
		}
	}
];

export function getPaxDetailsByNumber(paxNumber) {
	return paxDetails.find((p) => p.pax === paxNumber);
}

export function getPaxDetailsById(paxId) {
	return paxDetails.find((p) => p.paxId === paxId);
}

export function getPaxByCategory(category) {
	return paxDetails.filter((p) => p.category === category);
}

export function getRecommendedVenuesForPax(paxNumber) {
	const detail = getPaxDetailsByNumber(paxNumber);
	return detail ? detail.recommendedVenues : [];
}

export function isPaxSuitableForVenue(paxNumber, venueName) {
	const detail = getPaxDetailsByNumber(paxNumber);
	if (!detail) return false;
	return detail.recommendedVenues.includes(venueName);
}

export function getBuffetQuantityRange(paxNumber) {
	const detail = getPaxDetailsByNumber(paxNumber);
	if (!detail) return null;
	return {
		min: detail.buffetRecommendation.minQuantity,
		max: detail.buffetRecommendation.maxQuantity,
		notes: detail.buffetRecommendation.notes
	};
}

export function getGubukanQuantityRange(paxNumber) {
	const detail = getPaxDetailsByNumber(paxNumber);
	if (!detail) return null;
	return {
		min: detail.gubukanRecommendation.minQuantity,
		max: detail.gubukanRecommendation.maxQuantity,
		notes: detail.gubukanRecommendation.notes
	};
}

export function getVendorRecommendations(paxNumber) {
	const detail = getPaxDetailsByNumber(paxNumber);
	return detail ? detail.vendorRecommendations : null;
}

export function getBudgetRange(paxNumber) {
	const detail = getPaxDetailsByNumber(paxNumber);
	if (!detail) return null;
	return {
		min: detail.estimatedBudgetRange.min,
		max: detail.estimatedBudgetRange.max
	};
}

export function getDefaultDataForPax(paxNumber) {
	const detail = getPaxDetailsByNumber(paxNumber);
	return detail ? detail.defaultData : null;
}