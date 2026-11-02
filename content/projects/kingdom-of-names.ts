const content = `# A Kingdom of Names

### Mining people and places in the Holinshed Chronicles with reproducible Python analysis.

## Context

Through Bucknell's DCDS Student Fellows program, I contribute to a research project building a structured record of people and events from the 1577 and 1587 TEI/XML editions of the Holinshed Chronicles.

## My contributions

In merged PR #5, I added local setup instructions, dependency tracking, and a launcher, excluded machine-specific state, and organized extraction outputs.

In merged PR #25, I built a notebook that counts places in the 1577 text by monarch's reign. It normalizes early-modern spellings, groups duplicate place entries, and filters misleading mentions such as source citations in margin notes and personal titles like "Duke of Yorke". The notebook identifies the most frequent place in each reign and plots patterns across reigns.

## Engineering decisions

- Parse the TEI structure to preserve reign boundaries and remove margin notes before counting.
- Apply the same spelling normalization to text and place names, with confidence filtering and duplicate grouping.
- Require capitalization for single-word places to reduce matches against ordinary words.
- Keep the analysis reproducible in a notebook with frequency tables and plots.

## Stack

Python, pandas, lxml, regular expressions, Jupyter, Matplotlib, and TEI/XML.

## Links

- [View the research repository](https://github.com/holinshed-project/DCDS-Fa2026)
- [Merged setup contribution #5](https://github.com/holinshed-project/DCDS-Fa2026/pull/5)
- [Merged place-frequency analysis #25](https://github.com/holinshed-project/DCDS-Fa2026/pull/25)`;

export default content;
