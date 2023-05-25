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
			{ text: 'Key Takeaways', link: 'architecture/takeaway' },
			{ text: 'Disclamier', link: 'architecture/disclaimer' },
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
			{ text: 'Page Speed Insights', link: 'website-analysis/pagespeedinsights' },
			{ text: 'Mobile vs Desktop Analysis', link: 'website-analysis/mobilevsdesktop' },
			{ text: 'Network Requests and Latency', link: 'website-analysis/networkrequests' },
			{ text: 'Page Size and Resource Analysis', link: 'website-analysis/pagesize' },
			{ text: 'Search Engine Optimization', link: 'website-analysis/seo' },
			{ text: 'Keywords', link: 'website-analysis/keywords' },
		],

		'Chatbot Analysis': [
			{ text: 'Introduction', link: 'chatbot/introduction' },
			{ text: 'Current Chatbot', link: 'chatbot/currentbot' },
			{ text: 'New FamBot', link: 'chatbot/fambot' },
		],

		'Social Media Analysis': [
			{ text: 'Introduction', link: 'social-media/introduction' },
			{ text: 'Instagram Data Collection', link: 'social-media/instagram' },
			{ text: 'Instagram Data Analysis', link: 'social-media/instapostanalysis' },
			{ text: 'YouTube', link: 'social-media/youtube' },
			{ text: 'LinkedIn', link: 'social-media/linkedin' },
		],

		'Fampay Competitor Analysis': [
			{ text: 'Introduction', link: 'competitor/introduction' },
			{ text: 'Direct Competition', link: 'competitor/directcomp' },
			{ text: 'Mainstream Competition', link: 'competitor/mainstreamcomp' },
			{ text: 'Potential Competition', link: 'competitor/potentialcomp' },
		],

		'Fampay Online Presence': [
			{ text: 'Introduction', link: 'information/introduction' },
			{ text: 'PDFs', link: 'information/pdfs' },
			{ text: 'Government Findings', link: 'information/governmentfindings' },
			{ text: 'APKs', link: 'information/apks' },
			{ text: 'Team', link: 'information/team' },
		],

	},
};
