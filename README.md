# 🎯 React Slides

A modern React-based presentation library for creating beautiful and interactive slideshows directly in your web browser.

## ✨ Features

- 🎨 Modern and clean design with Tailwind CSS
- 📱 Fully responsive layout
- ⌨️ Keyboard navigation support
- 🖼️ Support for images and media
- 💻 Code syntax highlighting
- 📝 Markdown support
- 🎯 Multiple layout options
- 🎨 Customizable themes and colors
- 📊 Support for tables and lists
- 🔗 Hyperlink support

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RobinHil/react-slides.git
cd react-slides
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🎮 Usage

### Basic Components

React Slides comes with several pre-built components:

- `CenterLayout` - Centers content vertically and horizontally
- `Code` - For code blocks with syntax highlighting
- `Heading` - For titles and headings
- `Image` - For displaying images with optional captions
- `Link` - For hyperlinks
- `List` - For bulleted or numbered lists
- `Markdown` - For rendering Markdown content
- `Paragraph` - For text content
- `Table` - For tabular data
- `TwoColumnLayout` - For side-by-side content

### Creating Slides

1. Create a new slide component in the `/src/slides/` directory:

```jsx
import { CenterLayout, Heading, Paragraph } from '../slideComponents/index.jsx';

function MySlide() {
    return (
        <CenterLayout>
            <Heading fontSize={8} align="center">My Slide</Heading>
            <Paragraph fontSize={6} align="center">
                This is my awesome slide content!
            </Paragraph>
        </CenterLayout>
    );
}

export default MySlide;
```

2. Import and add your slide to `/src/slides/index.jsx`:

```jsx
import MySlide from './MySlide.jsx';

const slides = [
    // ... other slides
    MySlide,
];

export default slides;
```

## 🎨 Customization

### Colors
Available color options for text and backgrounds:
- Basic: `white`, `black`, `gray`, `lightGray`, `darkGray`
- Colors: `red`, `orange`, `yellow`, `lime`, `green`, `cyan`, `sky`, `blue`, `violet`, `pink`

### Text Sizes
- Headings: 1-9 scale
- Paragraphs: 1-13 scale

### Layouts
- Center Layout
- Two Column Layout
- Custom layouts possible through Tailwind CSS classes

## 🌐 Deployment

To deploy to a production server:

1. Build the project:
```bash
npm run build
```

2. Copy the contents of the `dist/` folder to your web server:
```bash
rsync -r dist/* /var/www/your-site/
```

### Docker Deployment

This project includes Docker support. To deploy using Docker:

1. Build and start the container:
```bash
docker compose -p react-slides up -d --build
```

2. To stop the container:
```bash
docker compose -p react-slides down
```

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Markdown
- Syntax Highlighter
- Font Awesome
- Docker
