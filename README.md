# FishEye - Prototype Website for Independent Photographers

## About This Project

This project is part of a training program for the Front-end development track. It involves creating a functional prototype for FishEye, a website designed to showcase independent photographers' portfolios. The goal was to develop an accessible, modular web application using JavaScript design patterns.

The prototype includes a home page and a profile page for each photographer. It was developed to meet FishEye’s design and accessibility requirements, featuring dynamic data display using JSON files, media management (photos and videos) via a **Factory Method Pattern**, and various accessibility integrations to ensure usability with screen readers and keyboard navigation.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Live Demo](#live-demo)
- [Accessibility](#accessibility)
- [Design Pattern](#design-pattern)

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**
- **JSON** for photographer data
- **Git** for version control

## Features
- Dynamic display: JSON files are used to dynamically generate photographer pages and their media galleries (photos and videos).
- Factory Method Pattern: Clear separation between the handling of photos and videos, using a Factory Method pattern to manage different media types.
- Keyboard navigation: The site is fully navigable by keyboard to ensure accessibility.
- Screen reader compatibility: Compliance with accessibility requirements for users with special needs.

## Project Structure
```bash
/ 
├── data/
│ └── photographers-data.json # Sample data for photographers 
│
├── js/ # Core JavaScript logic 
│ ├── api/       # API calls and data fetching 
│ ├── factories/ # Factory design pattern to manage media types 
│ ├── models/    # Data models for photographers and media 
│ ├── pages/     # Logic for main and photographer pages 
│ ├── templates/ # Components for rendering media and photographer cards 
│ └── utils/     # Utility functions (e.g., forms, modals, sorting) 
│
├── public/ # Public assets (images, icons, etc.) 
│ ├── assets/ 
│ │ ├── photographers/ # Photographer images 
│ │ ├── portfolio/     # Portfolio media organized by photographer's ID (photos and videos) 
│ │
│ └── css/ # Compiled CSS files 
│
├── sass/ # SCSS files for styling 
│ ├── base/       # Base styles and typography 
│ ├── components/ # Button, aria, and form component styles 
│ ├── layout/     # Layout styles for header, modals, etc. 
│ ├── pages/      # Specific page section styles (e.g., photographer page) 
│ └── utils/      # Variables, mixins, and global utilities 
│
├── index.html        # Homepage 
└── photographer.html # Photographer profile page

```

## Installation

1. Clone this repository:
```bash
git clone https://github.com/belaidSolene/fisheye.git
```

1. Navigate to the project directory:
```bash
cd fisheye
```

1. Open index.html in your browser to view the homepage.

## Usage
- On the homepage, users can view a list of photographers.
- Clicking on a photographer redirects them to an individual profile page with a gallery of dynamic photos and videos.
- The website is fully navigable via the keyboard.

## Live Demo

You can view a live demo of the project [here](https://belaidsolene.github.io/fisheye/index.html).


## Accessibility
Accessibility is a priority for this project. Here are some of the measures taken:

- **Keyboard navigation**: All interactions can be performed using the keyboard.
- **Screen reader support**: ARIA attributes are integrated to ensure compatibility with screen readers.
- **High contrast**: Colors are chosen to ensure readability for visually impaired users.

## Design Pattern
The **Factory Method Pattern** is used to distinguish between different media types (photos and videos). This allows for a clean and extensible solution to handle both media types while adhering to the single responsibility principle.

