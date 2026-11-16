# 🌐 Yedija Rafael | Personal Portfolio Website

## 📖 Project Overview

This is a single-page responsive portfolio website about me, Yedija Rafael, a Computer Science student at BINUS International who dreams of becoming a police officer in the cyber field. The website shows who I am through many small description boxes: my story, personality, skills, education, experience, projects, goals, values, interests, and contact details.

It is built with **HTML** in `index.html`, **CSS** in `style.css`, and **JavaScript** in `script.js`.

- URL Link to website portfolio: [Click Here](https://pemainhandal1.github.io)
- URL Link to website design (Figma): [Click Here](PASTE-YOUR-FIGMA-LINK-HERE)
- GitHub profile: [PemainHandal1](https://github.com/PemainHandal1)
- LinkedIn: [Yedija Yunus](https://www.linkedin.com/in/yedija-yunus-497b20418/)
- Instagram: [@yedijayunus](https://www.instagram.com/yedijayunus)

## 🎯 Purpose

The goal of this project is to:

- Introduce myself in a clear and personal way, beyond just a CV
- Practice responsive web design and page interactions with HTML, CSS, and JavaScript
- Showcase my background, goals, and projects in a professional format
- Practice accessibility, so the site can be used by more people
- Have one link I can share on LinkedIn, Instagram, and in applications

## 👥 Target Audience

This portfolio is designed for:

- [✅] Potential employers, internship providers, and recruiters
- [✅] University and academy selection panels
- [✅] Friends, teammates, and people who want to network with me

## 🧱 Technologies Used

- HTML5 (semantic landmarks, forms, labels, ARIA attributes)
- CSS3 in `style.css` (Grid, Flexbox, CSS variables, media queries, scroll snap, light and dark themes)
- JavaScript (vanilla, in `script.js`)
- GitHub REST API (`fetch`) for the repositories
- Google Fonts (Bricolage Grotesque and Figtree)
- GitHub Pages for hosting

## 📂 Folder Structure

```bash
your-repository-name/
│
├── index.html     # the website structure (HTML)
├── style.css      # all the styling, colors, layout, and light/dark themes
├── script.js      # JavaScript for all the interactions
├── images/        # my portrait photo, the Figma design, and README screenshots
└── README.md
```

## 🧩 What Each File Does

### 📄 `index.html` (structure and content)

- **Head:** page title, a description for search engines, a theme color, the Google Fonts link, and the link to `style.css`.
- **Skip link and `<main>`:** a "Skip to content" link for keyboard users, and all page content inside a `<main>` landmark.
- **Seven scroll groups ("stages"):** Intro, About me & Personality, Skills & Education & Experience, Projects & Goals & Currently learning, GitHub repositories, Values & Interests & Fun facts & Quote, and How I work & Languages & Contact.
- **Description boxes:** every box is a `<section class="box ...">` with a color and a size class, so boxes can be moved between groups easily.
- **Intro:** my name, role, short summary, menu buttons, and my photo (`images/portrait.webp`) with descriptive alt text.
- **GitHub repositories box:** a labelled search field and an empty list that the JavaScript fills in.
- **Contact box:** social links (LinkedIn, GitHub, Instagram), my email, and a contact form with labelled fields and an error message area for each field.
- **Top controls:** the language button and the light/dark mode button.
- **Side navigation:** a `<nav>` with one link for each group.
- **Translations:** text elements have a `data-i18n` attribute, so the JavaScript can switch them between English and Bahasa Indonesia.

### 🎨 `style.css` (design and layout)

- **Design tokens:** colors and fonts are CSS variables on `:root`, with a full set of dark colors that apply automatically (device setting) or manually (`data-theme` attribute).
- **Layout:** a 6-column CSS Grid for the boxes. Boxes can be one third, two thirds, or full width. Each box has a thick outline, rounded corners, and a hard shadow.
- **Scroll groups:** each group is at least one screen tall and uses scroll snap, so one scroll moves to one group. Snapping is strict on large screens and looser on small ones.
- **Intro design:** a two-column layout with a tilted blue card behind my photo, which has a white sticker outline and a hard shadow.
- **Navigation:** the side dots with always-visible labels, a highlighted current group, and the top-right control buttons.
- **Components:** the GitHub repository cards, the contact form, tags, and social buttons.
- **Accessibility styles:** a visible focus outline on everything you can tab to, a visually hidden label style for screen readers, a skip link that appears on focus, and a dashed border on invalid fields so errors do not depend on color alone.
- **Responsive design:** breakpoints at 860px, 700px, and 560px. Boxes stack into one column, the photo moves below my name, the form fields stack, and the side navigation shrinks on small screens.

### ⚙️ `script.js` (interactions)

1. **Light / dark mode:** follows the device setting until I press the button, then remembers my choice in `localStorage`.
2. **Lift and fade:** while scrolling, the group leaving the screen lifts up and fades, and the next group rises in.
3. **Side navigation:** shows after the intro, highlights the group on screen, and marks it with `aria-current` for screen readers.
4. **Slow smooth scrolling:** the menu buttons and side dots scroll for about 1.5 seconds with easing. Scroll snap is switched off during the animation and back on afterwards. The speed is set by `DURATION`.
5. **Language switch:** translates the whole page between English and Bahasa Indonesia using the `data-i18n` attributes and a dictionary, updates the page language, and remembers the choice.
6. **GitHub repositories:** fetches my public repositories from the GitHub API, leaves out forks, builds a card for each one, and filters them live as I type in the search box. It shows a message while loading, when nothing matches, or if GitHub cannot be reached.
7. **Contact form validation:** checks that the name, email, and message are filled in correctly, shows an error under each wrong field, moves the focus to the first error, and then opens the visitor's email app with the message ready to send.

## ✨ Features

- **Scroll groups:** one relevant group of information at a time, with a lift-and-fade transition
- **Side navigation:** dots with labels on the right that show the current group and jump to any group
- **Slow smooth scrolling** when using the menu buttons or the side navigation
- **Sticker-style photo** with a white outline that fits the design
- **Light and dark mode** that follows the device settings by default, with a button to switch
- **English / Bahasa Indonesia switch** for the whole page
- **Live GitHub repositories** with search
- **Contact form with validation**
- **Social links** to LinkedIn, GitHub, and Instagram

## ♿ Accessibility

- Skip link and proper page landmarks
- Every form field has a label, and every error message is linked to its field
- Error messages use text and a dashed border, not only color
- Visible keyboard focus on all links, buttons, and fields
- Side navigation hidden from keyboard users while it is not shown
- `aria-current` on the current group in the side navigation
- Live regions announce the loaded repositories and the form status
- The page language (`lang`) updates when the language is switched
- Descriptive alt text for the photo, and a page description for search engines
- The arrow keys, Page Up, and Page Down work with the scroll groups

> I have not yet measured the color contrast with Lighthouse. Add the Lighthouse score screenshot below once it is tested.

## 📱 Responsiveness

The site is optimized for:

- Desktop
- Tablet
- Mobile

> Responsive design is achieved using CSS Grid, Flexbox, and media queries. On small screens the boxes stack into one column, the photo moves below my name, and the side navigation becomes smaller.

## 🧪 How to Run Locally

1. Open your code editor (e.g., Visual Studio Code).
2. In your code editor, open the terminal.
3. Clone the repository:
   ```bash
   git clone https://github.com/PemainHandal1/your-repository-name.git
   ```
4. Open `index.html` in your browser, or run the website locally using the Live Server extension.

> Keep `index.html`, `style.css`, and `script.js` in the same folder, and keep `portrait.webp` inside the `images` folder.

## 📄 Notes

- I wrote and provided all the personal content myself, including my story, skills, education, experience, values, and goals.
- I built the code and layout with the help of Claude, an AI assistant, and I edited the content to match who I am.
- The Bahasa Indonesia translation was written with AI help, so some wording may still be improved.
- The contact form does not send email by itself. It opens the visitor's email app with the message filled in.
- The GitHub repositories come from the public GitHub API, which limits how many requests can be made per hour, so the list may sometimes fail to load.

## 🎨 Website Design

The layout was planned as a design in Figma before building the page.

![Figma design of the portfolio](images/figma-design.png)

## 📸 Screenshots

Screenshots of the website on desktop, one for each scroll group.

### 1. Intro
![Intro group with name, role, menu buttons and photo](images/01-intro.png)

### 2. About me & Personality
![About me and Personality boxes](images/02-about-personality.png)

### 3. Skills, Education & Experience
![Skills, Education and Experience boxes](images/03-skills-education-experience.png)

### 4. Projects, Goals & Currently learning
![Projects, Goals and Currently learning boxes](images/04-projects-goals-learning.png)

### 5. Values, Interests & Fun facts
![Values, Interests, Fun facts and quote](images/05-values-interests-fun-facts.png)

### 6. How I work, Languages & Contact
![How I work, Languages and Contact boxes](images/06-how-i-work-contact.png)

> These screenshots were taken before the GitHub repositories group, the language switch, and the contact form were added. Retake them to show the latest version.
