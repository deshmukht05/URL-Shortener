# URL Shortener

A URL shortener built using Node.js, HTML, and CSS. Users can enter a long URL and a custom title to generate a shortened link using a predefined base URL.

## Overview

This application creates custom short links from user-provided URLs.

Instead of using only a randomly generated identifier, the application uses the title entered by the user as the ending of the shortened URL. This makes the generated link more recognizable and easier to share.

## Features

- Enter the original URL through a web interface.
- Provide a custom title for the shortened link.
- Generate a short URL using a predefined base URL.
- Append the custom title to the end of the short URL.
- Use an HTML and CSS frontend with a Node.js backend.

## Example

The following example illustrates the expected format:

```text
Original URL:
[https://example.com/resources/programming/nodejs/introduction](https://example.com/resources/programming/nodejs/introduction)

Custom Title:
nodejs-guide

Default Base URL:
[https://your-short-domain.com/](https://your-short-domain.com/)

Generated Short URL:
[https://your-short-domain.com/nodejs-guide](https://your-short-domain.com/nodejs-guide)
```

The base URL above is an example. Replace it with the default URL configured in your application.

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend application logic |
| HTML | Web page structure and input form |
| CSS | Interface styling |

## How It Works

1. The user enters the original URL.
2. The user enters a title for the shortened link.
3. The application processes the submitted information.
4. The title is appended to the configured base URL.
5. The generated short URL is displayed to the user.

## Project Structure

The following is an example structure. Update the names and paths to match your repository.

```text
url-shortener/
│
├── data
│   └── links.json
│
├── public/
│   ├── index.html
│   └── script.js
│   └── style.css
│
├── ap.js
└── package.json
```

## Getting Started

### Prerequisites

Install the tools required by the project:

- Node.js
- npm
- Git, if cloning the repository

### Clone the Repository

```bash
git clone [https://github.com/your-username/url-shortener.git](https://github.com/your-username/url-shortener.git)
```

### Open the Project Folder

```bash
cd url-shortener
```

### Install Dependencies

If the project contains a `package.json` file, run:

```bash
npm install
```

### Start the Application

Use the command configured for your project.

If the entry file is `server.js`, the command may be:

```bash
node server.js
```

If a start script is defined in `package.json`, use:

```bash
npm start
```

Open the local application URL shown in your terminal.

## Usage

1. Start the application.
2. Open the website in your browser.
3. Paste the original URL into the URL field.
4. Enter a custom title.
5. Submit the form.
6. Use or share the generated short link.

### Example Input

```text
URL: [https://example.com/articles/learning-nodejs](https://example.com/articles/learning-nodejs)
Title: learn-nodejs
```

### Example Output

```text
[https://your-short-domain.com/learn-nodejs](https://your-short-domain.com/learn-nodejs)
```

## Configuration

Update the project's existing configuration to use your preferred base URL.

Example:

```text
Base URL: [https://your-short-domain.com/](https://your-short-domain.com/)
Title: my-project
Short URL: [https://your-short-domain.com/my-project](https://your-short-domain.com/my-project)
```

The location of this setting depends on how the application has been implemented.

## Implementation Details

Update this section to describe your actual implementation:

- Backend entry file: [Add the filename]
- Local server address: [Add the address]
- Default short-link base URL: [Add the configured URL]
- URL mapping storage: [Describe how links are stored, if applicable]
- Short-link redirect behavior: [Describe how redirects work, if implemented]
- Duplicate title handling: [Describe current behavior]
- Title formatting rules: [Describe supported characters and formatting]

## Future Improvements

Possible improvements include:

- Validate the original URL before generating a link.
- Display clear messages for invalid or missing input.
- Convert titles into URL-friendly slugs.
- Handle duplicate titles.
- Store URL mappings in a database.
- Add a copy-to-clipboard button.
- Generate a random identifier when no title is provided.
- Add click tracking and basic analytics.
- Add expiration dates for short links.
- Generate QR codes.
- Add automated tests.

## Learning Objectives

This project provides practice with:

- Building a Node.js backend.
- Creating forms using HTML.
- Styling a web interface using CSS.
- Handling user-submitted input.
- Generating custom URLs.
- Connecting frontend inputs to backend logic.
- Organizing a full-stack project.

## Contributing

Suggestions and improvements are welcome.

1. Fork the repository.
2. Create a branch for your changes.
3. Make and test your changes.
4. Submit a pull request.

## Author

Created by **Tushar Deshmukh.**

- Live Demo: 

## License

Add your chosen license and a corresponding `LICENSE` file if you want to specify how others may use, modify, or distribute this project.
