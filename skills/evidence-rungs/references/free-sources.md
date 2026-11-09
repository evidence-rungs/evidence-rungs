<!-- SPDX-License-Identifier: CC-BY-4.0 -->
<!-- SPDX-FileCopyrightText: 2026 The evidence-rungs authors -->
# Public keyless discovery sources

Access notes reviewed 2026-10-20, drawing on documentation observed 2026-10-18. Recheck official terms and response headers before use. No credentials, account setup, paid route, or scraping fallback is supplied. Examples use public generic query placeholders; percent-encode values. Metadata licenses do not automatically cover linked articles, comments, code, or abstracts.

| Source | Official or maintainer endpoint/documentation | Conservative anonymous rate/access note |
|---|---|---|
| HN Algolia | https://hn.algolia.com/api/v1/search?query=example&hitsPerPage=5 ; https://hn.algolia.com/api ; https://github.com/algolia/hn-search | Public separate search index, not the official HN database; no current contractual quota/SLA established. Keep requests sparse and stop on 429. |
| HN original items | https://hacker-news.firebaseio.com/v0/item/1.json ; https://github.com/HackerNews/API | Public official item API; honor deleted/dead entries, missing external links, and Unix-second timestamps; no bulk promise. |
| Stack Exchange | https://api.stackexchange.com/2.3/search/advanced?site=stackoverflow&q=example&pagesize=5 ; https://api.stackexchange.com/docs/throttle | Keyless reads commonly 300/day per IP; respect returned quota and backoff, avoid identical frequent requests; answer attribution/license obligations remain. |
| GitHub REST | https://api.github.com/search/repositories?q=example&per_page=5 ; https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api | Public unauthenticated core limit 60/hour/IP, search commonly 10/minute with secondary limits; code search is not a keyless route. |
| OpenAlex | https://api.openalex.org/works?search=example&per_page=5 ; https://help.openalex.org/api/authentication/ | Documentation updated 2026-10-15 allows casual/basic keyless GET, up to 10 requests/second but shared daily budget; this skill recommends far less. Cursor/bulk access is not promised. |
| Crossref | https://api.crossref.org/works?query=example&rows=5 ; https://www.crossref.org/documentation/retrieve-metadata/rest-api/ | Public list calls 1/second, single records 5/second, concurrency 1 under limits effective 2025-12-01; do not supply private contact details to obtain another pool. |
| PubMed | https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=example&retmode=json&retmax=5 ; https://eutilities.github.io/site/API_Key/usageandkey/ | Keyless maximum 3/second/IP; identifiers are not full articles or proof of effectiveness. Follow tool-identification and content policies before distributing an automated client. |
| arXiv | https://export.arxiv.org/api/query?search_query=all:example&max_results=5 ; https://info.arxiv.org/help/api/tou.html | One request per three seconds, one connection across clients; descriptive metadata and individual paper licenses differ; preprints are not reviewed consensus. |

## Dated community limits: 2026-10-18

Reddit: official Data API access requires prior explicit approval under the policy updated 2026-10-05. Creating an application alone does not establish permission. https://support.reddithelp.com/hc/en-us/articles/42728983564564-Responsible-Builder-Policy and https://support.reddithelp.com/hc/en-us/articles/14945211791892-Reddit-Data-API-Wiki document conditions. A public JSON search was 403 and an alternate host redirected; neither proves "no discussion". There is no direct Reddit adapter here. Search-index links/snippets may be discovery only; do not describe them as read comments or representative coverage. No session, proxy, or access-control workaround.

X: official read search is paid/credentialed, not a normal anonymous free API, per https://docs.x.com/x-api/getting-started/pricing (observed 2026-10-18). A direct public-search redirect did not prove usable search. Indexed URLs can reveal discussion links but not thread completeness, freshness, or actually read posts. No direct X adapter or paid fallback is supplied; do not claim full platform coverage.

For both, defaults remain discovery-only. A successful status is technical reachability, not authorization or content reuse rights. Platform policy changes require a new explicit access review, not an automatic alternate host or retry chain.
