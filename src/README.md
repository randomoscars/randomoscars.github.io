# Making updates

The GitHub repo is configured to automatically build and deploy new versions of the website on push to `main`.

If a new year of Oscar data has come out:

- Update `CURRENT_YEAR` in `Models.ts` to reflect the year of the new ceremony
- Re-run `scraper/scrapeacademyawards.py`
- Navigate to the project root and run `npx prettier --write .`
