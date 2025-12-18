# How to add new entries to different pages

## Publication
* To add a new publication, insert a bib entry in `_bibliography/papers.bib`.
* To add a new venue (for better publication page display), update `_data/venues.yml`. The name is mapped to `abbr` within the bib entry.
* To add a new coauthor link, update `_data/coauthors.yml`. Note that coauthor entries are grouped by last name in **lower case**. If there are multiple authors with the same last name, they are represented by multiple firstname entries. 

## CV
Actual content of CV is stored in `assets/json/resume.json`. 

* Steps to insert new entries in the CV:
    1. Insert a new case in `_layouts/cv.liquid` (line 88)
    2. Insert an item under `jsonresume` in `_config.yml` (end of file)
    3. Insert the new liquid include file under: `_includes/resume`
    4. In `assets/json/resume.json`, insert the new entry with right fields.

* thesis_char_(PhD) / thesis_char_(EngD)
    - name (student's name)
    - thesisTitle
    - startDate
    - *endDate
    - *url (url to student's site)
    - *note (special awards, etc.)
    - *cosupervisor
    - *position

## Icon:
    https://3sc.org/elements/font-awesome/

