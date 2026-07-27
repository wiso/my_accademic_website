#!/usr/bin/env python3
"""Generate the theses and conferences lists of public/index.html from public/data/*.json.

Edit the json files, then run this script and commit both. Use --check to verify
that index.html is up to date without touching it (this is what the CI runs).
"""

import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent
PAGE = ROOT / "public" / "index.html"
DATA = ROOT / "public" / "data"


def label(text, url):
    """A link if an url is given, plain text otherwise."""
    if not url:
        return html.escape(text)
    return f'<a href="{html.escape(url)}">{html.escape(text)}</a>'


def render_theses(items):
    lines = []
    for item in items:
        degree = html.escape(item["degree"])
        badge = f'<span class="degree-badge degree-badge-{degree.lower()}">{degree}</span>'
        student = html.escape(item["student"])
        lines.append(f'<dt>{item["year"]} - {student} {badge}</dt>')
        lines.append(f'<dd>{label(item["title"], item["url"])}</dd>')
    return lines


def render_conferences(items):
    lines = []
    for item in items:
        conference = label(item["conference"], item["conferenceUrl"])
        title = label(item["title"], item["titleUrl"])
        lines += [
            '<div class="timeline-item">',
            '    <div class="timeline-row">',
            '        <div class="timeline-year-column">',
            f'            <dt class="timeline-year">{item["year"]} {conference}</dt>',
            '        </div>',
            '        <div class="timeline-content-column">',
            f'            <dd class="timeline-title">{title}</dd>',
            '        </div>',
            '    </div>',
            '</div>',
        ]
    return lines


def replace_block(page, name, lines):
    """Replace whatever sits between the BEGIN/END markers of a section."""
    markers = re.compile(rf"^([ \t]*)<!-- BEGIN {name}.*?^[ \t]*<!-- END {name} -->", re.M | re.S)
    match = markers.search(page)
    if not match:
        sys.exit(f"marker '<!-- BEGIN {name} -->' not found in {PAGE}")

    indent = match.group(1)
    body = "\n".join(indent + line for line in lines)
    block = (
        f"{indent}<!-- BEGIN {name}: generated from data/{name}.json by build.py, do not edit -->\n"
        f"{body}\n"
        f"{indent}<!-- END {name} -->"
    )
    return page[: match.start()] + block + page[match.end() :]


def build():
    page = PAGE.read_text(encoding="utf-8")
    for name, render in [("theses", render_theses), ("conferences", render_conferences)]:
        items = json.loads((DATA / f"{name}.json").read_text(encoding="utf-8"))
        page = replace_block(page, name, render(items))
    return page


def main():
    check = "--check" in sys.argv[1:]
    page = build()

    if not check:
        PAGE.write_text(page, encoding="utf-8")
        return 0

    if page != PAGE.read_text(encoding="utf-8"):
        print(f"{PAGE.relative_to(ROOT)} is out of date: run ./build.py and commit the result")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
