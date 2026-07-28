const content = `# The Architecture of Sleep

### A data visualization exhibit exploring how daily habits shape the way we sleep.
## Links
- [Live Website](https://minhpham1810.github.io/math230-project-5/)
- [GitHub Repository](https://github.com/minhpham1810/math230-project-5)
![Exhibit infographic](sleep_infographic.png)
A Distill website and virtual art exhibit built for MATH 230: Data Visualization & Computing. The project uses a real-world sleep health dataset to explore how bedtime habits, screen time, caffeine, sleep disorder risk, and cognitive performance connect to sleep quality—told through narrative writing, ggplot2 visualizations, and a custom night-inspired color palette.
## What I built

- A 10-visualization storyboard moving from sleep distributions through daily habits, health, and performance
- A consistent visual system applied across the exhibit, charts, and supporting pages
- Exploratory views of sleep duration, quality, work hours, screen time, caffeine, sleep aids, and cognitive performance
- A nonparametric randomization test comparing sleep quality between low and high bedtime screen-time groups
- A contour-density view of sleep duration and cognitive performance

## Technologies
- Language: R, R Markdown
- Visualization: ggplot2, tidyverse (dplyr, tidyr)
- Website Framework: Distill
- Presentation: Beamer (LaTeX) for inference slides
- Deployment: GitHub Pages
- Tools: RStudio, Git

## Dataset
Sleep Health and Daily Performance Dataset (Kaggle) — ~100,000 observations, 32 variables including sleep duration, sleep quality score, screen time before bed, caffeine intake, sleep disorder risk, and cognitive performance score.
`;

export default content;
