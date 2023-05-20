export const SITE = {
	title: 'Documentation',
	description: 'Your website description.',
	defaultLanguage: 'en-us',
} as const;

export const OPEN_GRAPH = {
	image: {
		src: 'https://github.com/withastro/astro/blob/main/.github/assets/banner.png?raw=true',
		alt:
			'astro logo on a starry expanse of space,' +
			' with a purple saturn-like planet floating in the right foreground',
	},
	twitter: 'astrodotbuild',
};

export const KNOWN_LANGUAGES = {
	English: 'en',
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/withastro/astro/tree/main/examples/docs`;

export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
	indexName: 'XXXXXXXXXX',
	appId: 'XXXXXXXXXX',
	apiKey: 'XXXXXXXXXX',
};

export type Sidebar = Record<
	(typeof KNOWN_LANGUAGE_CODES)[number],
	Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
	en: {

		'Architecture': [
			{ text: 'Introduction', link: 'architecture/introduction' },
			{ text: 'About Me', link: 'architecture/aboutme' },
		],

		'App Review Analytics': [
			{ text: 'Introduction', link: 'app-review/introduction' },
			{ text: 'Data Collection', link: 'app-review/collection' },
			{ text: 'Sentiment Analysis', link: 'app-review/sentiment' },
			{ text: 'Clustering', link: 'app-review/clustering' },
			{ text: 'Topic Modeling', link: 'app-review/topicmodeling' },
			{ text: 'Time Series Analysis', link: 'app-review/timeseries'},
			{ text: 'Fampay Response', link: 'app-review/fampayresponse' },
			{ text: 'Ngram Analysis', link: 'app-review/ngram'},
			{ text: 'Regression Analysis*', link: 'app-review/regression' },
			{ text: 'Social Network Analysis', link: 'app-review/networkanalysis' },
			{ text: 'User Behaviour Analysis', link: 'app-review/userbehaviour' },
			{ text: 'Version Impact', link: 'app-review/versionimpact'}
		],

		'Website Analysis': [
			{ text: 'Introduction', link: 'website-analysis/introduction' },
			{ text: 'URL Collection', link: 'website-analysis/collection' },
			{ text: 'Cache Control', link: 'website-analysis/cachecontrolandcontent' },
		],
	},
};
