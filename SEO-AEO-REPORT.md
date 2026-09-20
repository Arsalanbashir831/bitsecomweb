# B.I.T.S Pakistan SEO and AEO report

Updated: 21 September 2026

## Implemented locally

- Global title templates, descriptions, canonical URLs, Open Graph, Twitter cards, and crawler directives.
- A generated `robots.txt` that permits public discovery by Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, and Claude-User while excluding private and transactional routes.
- A generated XML sitemap containing canonical public pages and live product URLs with database-backed `lastmod` dates and product images.
- Organization and WebSite JSON-LD on the home page.
- Product, Offer, Brand, BreadcrumbList, and genuine-review-only AggregateRating JSON-LD on product pages.
- A visible HDD and SSD buying guide with 15 concise questions and matching FAQPage JSON-LD.
- Crawlable navigation to the shop, storage guide, products, and external data recovery service.
- `noindex` metadata for admin, dashboards, cart, orders, loading, and store-creation pages.
- Removal of unsupported marketing claims and empty rating displays.
- A permanent redirect from the old `/pricing` page to the external data recovery website.
- Removal of the non-functional newsletter form so the public site does not promise a subscription it cannot store.

## Recommendations by search and answer platform

These are based on each platform's published crawler and search guidance, not simulated responses attributed to separate models.

### Google Search and AI Overviews

- Keep product details accurate, visible, and consistent with Product structured data.
- Add the final domain to Google Search Console, submit `/sitemap.xml`, and inspect several product URLs.
- Create a Google Merchant Center feed when real inventory, shipping, and return policies are finalized.
- Create or verify the Lahore Google Business Profile and keep its name, address, and phone consistent with the website.
- Publish original buying and compatibility guidance based on real B.I.T.S expertise instead of generic AI-written articles.

### Bing and Microsoft Copilot

- Add the final domain to Bing Webmaster Tools and submit `/sitemap.xml`.
- Configure IndexNow after the final domain is chosen so product additions, changes, and removals are reported quickly.
- Keep sitemap `lastmod` values tied to actual database updates, as implemented.

### ChatGPT search

- Keep OAI-SearchBot and ChatGPT-User allowed for public pages, as implemented.
- Track referrals containing `utm_source=chatgpt.com` after analytics is installed.
- Keep product facts in visible HTML and use descriptive headings so answers can be cited precisely.

### Claude search

- Keep Claude-SearchBot and Claude-User allowed for public pages, as implemented.
- Preserve concise factual answers, stable URLs, visible update dates, and citations to primary evidence when technical claims are added.

## Required before public deployment

1. Set `NEXT_PUBLIC_SITE_URL` to the final custom domain. Do not launch with the temporary Vercel hostname as the canonical domain.
2. Confirm the official business name formatting, Lahore address, phone number, and Facebook URL.
3. Add real shipping coverage, delivery timing, payment methods, warranty terms, and return policy pages. These facts were not invented.
4. Add Search Console and Bing verification values to deployment environment variables once the accounts provide them.
5. Validate the deployed product pages with Google Rich Results Test and Schema.org Validator.
6. Add privacy, terms, shipping, warranty, and returns pages before accepting live orders.

## Content opportunities

- Surveillance HDD sizing calculator based on camera count, bitrate, and retention period.
- Compatibility guides for DVR/NVR brands actually supported by the store.
- Individual brand pages for Seagate, WD, and HGST when enough real inventory exists.
- Real case studies, warranty guidance, and storage-maintenance articles written or reviewed by B.I.T.S staff.

Avoid publishing thin location pages, invented reviews, unsupported superlatives, or large volumes of generic AI content. Those tactics weaken user trust and do not create durable search visibility.
