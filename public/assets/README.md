# Assets Folder

Place your images and videos here to use them in your markdown files.

## Usage in Markdown Files

### Images
```markdown
![Alt text](image-name.jpg)
![Alt text](image-name.png)
![Alt text](image-name.gif)

# Resize images by adding |size after the filename:
![Alt text](image-name.jpg|300)        # 300px max-width
![Alt text](image-name.jpg|50%)        # 50% width
![Alt text](image-name.jpg|150)        # 150px max-width
```

### Videos
```markdown
![video](video-name.mp4)
![video](video-name.webm)
```

## Examples

### Image Examples
```markdown
# Full width (default)
![My Portfolio Screenshot](portfolio-screenshot.png)

# 400px max width
![My Portfolio Screenshot](portfolio-screenshot.png|400)

# 60% of container width
![My Portfolio Screenshot](portfolio-screenshot.png|60%)
```

### Video Example
```markdown
![video](demo-video.mp4)
```

## Supported Formats

### Images
- .jpg / .jpeg
- .png
- .gif
- .webp
- .svg

### Videos
- .mp4
- .webm
- .ogg

## Image Sizing Guide

- **No size parameter**: Image uses full available width (responsive)
- **Pixel size** (e.g., `|300`): Sets max-width to specified pixels
- **Percentage** (e.g., `|50%`): Sets width as percentage of container

Examples:
- Small icon: `|100`
- Medium image: `|400`
- Large image: `|800`
- Half width: `|50%`
- Three-quarters: `|75%`

## Notes

- Images will be automatically centered and responsive
- Videos will include controls (play, pause, volume, etc.)
- All media files are automatically loaded from the `/assets/` directory
- You can also use absolute paths starting with `/` if needed
