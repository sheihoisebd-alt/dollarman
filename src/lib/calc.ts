/** Pure trading calculations used by the free tools. Account currency is USD throughout. */

export const UNITS_PER_LOT = 100_000;

export type Pair = {
	symbol: string;
	/** 0.0001 for most pairs, 0.01 for JPY pairs */
	pipSize: number;
	/** How the quote currency converts to USD */
	quote: 'usd' | 'usd-base' | 'cross';
	/** Rough default price, only used to prefill the form */
	samplePrice: number;
};

export const PAIRS: Pair[] = [
	{ symbol: 'EUR/USD', pipSize: 0.0001, quote: 'usd', samplePrice: 1.08 },
	{ symbol: 'GBP/USD', pipSize: 0.0001, quote: 'usd', samplePrice: 1.27 },
	{ symbol: 'AUD/USD', pipSize: 0.0001, quote: 'usd', samplePrice: 0.66 },
	{ symbol: 'NZD/USD', pipSize: 0.0001, quote: 'usd', samplePrice: 0.6 },
	{ symbol: 'XAU/USD (gold, pip = 0.01)', pipSize: 0.01, quote: 'usd', samplePrice: 2400 },
	{ symbol: 'USD/JPY', pipSize: 0.01, quote: 'usd-base', samplePrice: 150 },
	{ symbol: 'USD/CHF', pipSize: 0.0001, quote: 'usd-base', samplePrice: 0.88 },
	{ symbol: 'USD/CAD', pipSize: 0.0001, quote: 'usd-base', samplePrice: 1.36 },
	{ symbol: 'EUR/GBP', pipSize: 0.0001, quote: 'cross', samplePrice: 0.85 },
	{ symbol: 'EUR/JPY', pipSize: 0.01, quote: 'cross', samplePrice: 162 },
	{ symbol: 'GBP/JPY', pipSize: 0.01, quote: 'cross', samplePrice: 190 }
];

const valid = (...values: (number | null | undefined)[]) =>
	values.every((v) => typeof v === 'number' && Number.isFinite(v));

/**
 * Value of one pip in USD.
 * - quote is USD (EUR/USD):      pipSize × units
 * - base is USD (USD/JPY):       pipSize × units ÷ price
 * - cross (EUR/GBP):             pipSize × units × (quote currency → USD rate)
 * For gold, "units" means ounces and one lot is 100 oz, so pass 100 units per lot.
 */
export function pipValueUsd(
	pair: Pair,
	lots: number,
	price: number,
	quoteToUsd: number,
	unitsPerLot = pair.symbol.startsWith('XAU') ? 100 : UNITS_PER_LOT
): number | null {
	if (!valid(lots, price, quoteToUsd) || lots <= 0) return null;
	const inQuote = pair.pipSize * lots * unitsPerLot;
	if (pair.quote === 'usd') return inQuote;
	if (pair.quote === 'usd-base') return price > 0 ? inQuote / price : null;
	return quoteToUsd > 0 ? inQuote * quoteToUsd : null;
}

export type PositionSize = {
	riskAmount: number;
	lots: number;
	units: number;
};

/** Lots = (balance × risk%) ÷ (stop distance in pips × pip value per standard lot). */
export function positionSize(
	balance: number,
	riskPercent: number,
	stopPips: number,
	pipValuePerLot: number
): PositionSize | null {
	if (!valid(balance, riskPercent, stopPips, pipValuePerLot)) return null;
	if (balance <= 0 || riskPercent <= 0 || stopPips <= 0 || pipValuePerLot <= 0) return null;
	const riskAmount = (balance * riskPercent) / 100;
	const lots = riskAmount / (stopPips * pipValuePerLot);
	return { riskAmount, lots, units: lots * UNITS_PER_LOT };
}

export type RiskReward = {
	direction: 'long' | 'short';
	risk: number;
	reward: number;
	ratio: number;
	breakEvenWinRate: number;
};

/** Why a risk/reward input cannot be calculated; the page shows the message in its language. */
export type RiskRewardError = 'missing' | 'same-as-entry' | 'buy-target' | 'sell-target';

/** Direction is inferred: a stop below entry means a long (buy) trade. */
export function riskReward(
	entry: number,
	stop: number,
	target: number
): RiskReward | RiskRewardError {
	if (!valid(entry, stop, target)) return 'missing';
	if (stop === entry) return 'same-as-entry';
	const direction = stop < entry ? 'long' : 'short';
	if (direction === 'long' && target <= entry) return 'buy-target';
	if (direction === 'short' && target >= entry) return 'sell-target';
	const risk = Math.abs(entry - stop);
	const reward = Math.abs(target - entry);
	const ratio = reward / risk;
	return { direction, risk, reward, ratio, breakEvenWinRate: 1 / (1 + ratio) };
}

export const formatUsd = (value: number) =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: value < 1 ? 4 : 2
	}).format(value);

export const formatNumber = (value: number, digits = 2) =>
	new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(value);
