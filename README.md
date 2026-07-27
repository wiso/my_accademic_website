Code for personal website.
Mirrored on gitlab.cern.ch

## Theses and conferences

The two lists are data, kept in `public/data/theses.json` and
`public/data/conferences.json`. After editing them regenerate the page and
commit both:

    ./build.py

`build.py` rewrites the blocks delimited by the `<!-- BEGIN ... -->` /
`<!-- END ... -->` comments in `public/index.html`; the rest of the page is
edited by hand as usual.

`./build.py --check` verifies that `public/index.html` is up to date without
writing anything. The CI runs it, and so does the pre-commit hook, enabled once
per clone with:

    git config core.hooksPath hooks
