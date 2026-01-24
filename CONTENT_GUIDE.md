# Content Editing Guide

Quick reference for editing your portfolio content in `src/data/content.json`.

## Quick Start

1. Open `src/data/content.json` in any text editor
2. Find the section you want to edit
3. Update the values (keep the JSON format)
4. Save the file - changes appear instantly in development

## Field Reference

### Personal Information

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Your full name | `"John Doe"` |
| `title` | Job title | `"Software Engineer"` |
| `tagline` | Short motto | `"Building great software"` |
| `bio` | About paragraph | `"I am a developer..."` |
| `email` | Contact email | `"john@example.com"` |
| `location` | City, State | `"San Francisco, CA"` |
| `avatar` | Profile photo URL | `"https://..."` |
| `resume` | Resume file path | `"/resume.pdf"` |
| `highlights` | Key achievements (array) | `["5+ years experience"]` |

### Social Links

| Field | Description | Format |
|-------|-------------|--------|
| `github` | GitHub profile | `"https://github.com/username"` |
| `linkedin` | LinkedIn profile | `"https://linkedin.com/in/username"` |
| `email` | Email mailto link | `"mailto:email@example.com"` |

### Skills

Four categories of skills (arrays of strings):

```json
"skills": {
  "languages": ["Python", "JavaScript"],
  "databases": ["PostgreSQL", "MongoDB"],
  "tools": ["Docker", "Git"],
  "cloud": ["AWS", "GCP"]
}
```

### Projects

Each project object:

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique number |
| `title` | Yes | Project name |
| `description` | Yes | Brief description |
| `image` | Yes | Image URL |
| `tags` | Yes | Technology tags (array) |
| `github` | No | GitHub repo URL |
| `live` | No | Live demo URL (or `null`) |
| `featured` | Yes | `true` or `false` |

### Experience

Each job object:

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique number |
| `company` | Yes | Company name |
| `role` | Yes | Job title |
| `period` | Yes | Date range |
| `location` | Yes | City, State |
| `description` | Yes | Role overview |
| `achievements` | Yes | Bullet points (array) |
| `technologies` | Yes | Tech used (array) |

### Education

Each education object:

| Field | Description |
|-------|-------------|
| `degree` | Degree type |
| `field` | Field of study |
| `school` | Institution name |
| `location` | City, State |
| `year` | Graduation year |
| `highlights` | Key areas (array) |

## Common Tasks

### Add a New Job

Add at the **beginning** of the `experience` array (most recent first):

```json
{
  "id": 1,
  "company": "New Company",
  "role": "Your Title",
  "period": "January 2025 – Present",
  "location": "City, State",
  "description": "What you do there.",
  "achievements": [
    "Achievement 1",
    "Achievement 2"
  ],
  "technologies": ["Tech1", "Tech2"]
}
```

### Add a New Project

Add to the `projects` array:

```json
{
  "id": 5,
  "title": "New Project",
  "description": "What the project does.",
  "image": "https://images.unsplash.com/photo-xxx",
  "tags": ["React", "Node.js"],
  "github": "https://github.com/you/project",
  "live": "https://project.com",
  "featured": true
}
```

### Update Email

Change in TWO places:

1. `personal.email`
2. `social.email` (include `mailto:`)

```json
"personal": {
  "email": "newemail@example.com"
},
"social": {
  "email": "mailto:newemail@example.com"
}
```

### Add a New Skill

Find the appropriate category and add to the array:

```json
"skills": {
  "languages": ["Python", "JavaScript", "NewLanguage"]
}
```

### Change Profile Photo

Update `personal.avatar` with a new image URL:

```json
"avatar": "https://your-new-image-url.com/photo.jpg"
```

**Tip**: Use Unsplash for free images: `https://images.unsplash.com/photo-xxx?w=400&h=400&fit=crop&crop=face`

## Troubleshooting

### Changes Not Showing

1. Make sure the file is saved
2. Check for JSON syntax errors (missing commas, brackets)
3. Refresh the browser

### JSON Syntax Errors

Common mistakes:

- Missing comma after an item
- Extra comma after last item in array
- Missing quotes around strings
- Mismatched brackets `{}` or `[]`

Use a JSON validator: [jsonlint.com](https://jsonlint.com)

### Image Not Loading

- Check the URL is accessible
- Use HTTPS URLs
- Try a different image source

## Image Sources

Free stock photos:
- [Unsplash](https://unsplash.com) - `https://images.unsplash.com/photo-xxx`
- [Pexels](https://pexels.com)
- [Pixabay](https://pixabay.com)

For profile photos, add these URL parameters:
```
?w=400&h=400&fit=crop&crop=face
```

## JSON Template

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "tagline": "Your tagline",
    "bio": "Your bio paragraph...",
    "email": "email@example.com",
    "location": "City, State",
    "avatar": "https://image-url.com/photo.jpg",
    "resume": "/resume.pdf",
    "highlights": ["Highlight 1", "Highlight 2"]
  },
  "social": {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "email": "mailto:email@example.com"
  },
  "skills": {
    "languages": [],
    "databases": [],
    "tools": [],
    "cloud": []
  },
  "projects": [],
  "experience": [],
  "education": [],
  "certifications": [],
  "navigation": []
}
```
