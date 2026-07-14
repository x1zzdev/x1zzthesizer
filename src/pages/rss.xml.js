import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	// Chronological (oldest → newest) order defines the numeric index used in URLs.
	const posts = (await getCollection('blog')).sort(
		(a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf(),
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post, index) => ({
			...post.data,
			link: `/blog/${index + 1}/`,
		})),
	});
}