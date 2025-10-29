// Master Venue Data
// Each venue has associated pax numbers and prices
// The pax numbers here reference the masterPax data
export const masterVenues = [
	{
		id: 1,
		venue: 'Studio Kencana',
		paxPrices: [
			{ paxId: 1, pax: 200, price: 50000000 },
			{ paxId: 2, pax: 400, price: 75000000 },
			{ paxId: 4, pax: 600, price: 95000000 }
		]
	},
	{
		id: 2,
		venue: 'Grand Ballroom',
		paxPrices: [
			{ paxId: 3, pax: 500, price: 90000000 },
			{ paxId: 4, pax: 600, price: 110000000 },
			{ paxId: 5, pax: 800, price: 150000000 }
		]
	},
	{
		id: 3,
		venue: 'Royal Hall',
		paxPrices: [
			{ paxId: 2, pax: 400, price: 80000000 },
			{ paxId: 3, pax: 500, price: 100000000 },
			{ paxId: 6, pax: 1000, price: 200000000 }
		]
	},
	{
		id: 4,
		venue: 'Paradise Garden',
		paxPrices: [
			{ paxId: 1, pax: 200, price: 45000000 },
			{ paxId: 3, pax: 500, price: 95000000 },
			{ paxId: 5, pax: 800, price: 140000000 }
		]
	}
];

// Helper function to get venue by name
export function getVenueByName(venueName) {
	return masterVenues.find((v) => v.venue === venueName);
}

// Helper function to get available pax for a venue
export function getAvailablePaxForVenue(venueName) {
	const venue = getVenueByName(venueName);
	return venue ? venue.paxPrices.map((pp) => pp.pax) : [];
}

// Helper function to check if venue has specific pax
export function venueHasPax(venueName, paxNumber) {
	const venue = getVenueByName(venueName);
	if (!venue) return false;
	return venue.paxPrices.some((pp) => pp.pax === paxNumber);
}

// Helper function to get price for venue and pax combination
export function getPriceForVenuePax(venueName, paxNumber) {
	const venue = getVenueByName(venueName);
	if (!venue) return null;
	const paxPrice = venue.paxPrices.find((pp) => pp.pax === paxNumber);
	return paxPrice ? paxPrice.price : null;
}