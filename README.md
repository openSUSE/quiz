# 🦎 openSUSE-quiz 🦎

<!-- Badges -->

[![Powered by openSUSE](https://img.shields.io/badge/powered%20by-openSUSE-6da741?logo=opensuse&logoColor=white)](https://www.opensuse.org/)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/openSUSE/quiz/main.svg)](https://results.pre-commit.ci/latest/github/openSUSE/quiz/main)
![MIT License](https://img.shields.io/github/license/openSUSE/quiz)
![Node.js Version](https://img.shields.io/badge/node-%3E=18.0.0-brightgreen)
![Last Commit](https://img.shields.io/github/last-commit/openSUSE/quiz)
![Contributors](https://img.shields.io/github/contributors/openSUSE/quiz)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fquiz-o-o.netlify.app)](https://quiz-o-o.netlify.app)

A goal of this project is to provide openSUSE booth staff with a local instance of a quiz that we used to do in [a paper form](https://github.com/openSUSE/artwork/tree/master/quizzes). Having an [online variant](https://quiz-o-o.netlify.app) saves both money 💰 and environment 🌍.

## 🎯 Key goals

✅ **Knowledge challenge** mode: Value individuals' knowledge about the project and pick the ultimate winner based on stats. 🏆

✅ **Getting familiar with openSUSE** mode: Keep track of attendees and provide a mini interactive (press enter) lottery at the end. So everybody can win some prizes. 🎁

✅ **GDPR compliant**: No worries about GDPR! The database is in-memory only, holds only nicknames, and data is erased after the process is stopped or restarted. You can also reset stats by simply visiting `/reset`. 🛡️

## 📜 License

SPDX-License-Identifier: MIT

This project is under the MIT License. 🙏

It is based on the example [nodejs-quiz-app-l5hig](https://codesandbox.io/p/sandbox/nodejs-quiz-app-l5hig) at codesandbox.io. Many thanks to the author for making it. 🙏

## 🚀 Running the Application

### Environment Variables

Before running the application, you can configure it using a `.env` file in the root of the project. Create a `.env` file by copying the example:

```bash
cp .env.example .env
```

Then, edit the `.env` file to set your desired configuration:

- `STATS_MODE`: Can be `STATS_FILE` to save statistics to a file or `IN_MEMORY` to keep them in memory (they will be lost on restart). Defaults to `STATS_FILE`.
- `STATS_FILE_PATH`: The path to the JSON file where statistics will be stored if `STATS_MODE` is `STATS_FILE`. Defaults to `./data/stats.json`.
- `RESET_TOKEN`: A secret token required to reset the statistics via the `/reset` endpoint. If not set, the reset functionality will be disabled.

### Using npm 📦

1. Ensure you have Node.js and npm installed. 💻

2. Clone the repository: 📂

   ```bash
   git clone https://github.com/openSUSE/quiz.git
   cd quiz
   ```

3. Install dependencies: ⚙️

   ```bash
   npm install
   ```

4. Run the application: ▶️

   ```bash
   npm start
   ```

   To override the default port (3000) or reset token: 🔑

   ```bash
   RESET_TOKEN=supersecret PORT=4000 npm start
   ```

5. Visit [http://localhost:3000](http://localhost:3000) (or your specified port) in your browser. 🌐

### Formatting and Linting

Before committing code, please run the following commands to ensure code quality and consistency:

#### With npm

```bash
npm run format
npm run lint
```

#### With Bun

```bash
bun run format
bun run lint
```

### Building CSS Files

This project uses LESS for styling. To compile the LESS files into CSS, run the following command:

```bash
npm run build:css
```

Alternatively you can use `bun` to compile the LESS files into CSS.

```bash
bun build:css
```

This will generate the `public/styles.css` file.

### Using Bun 🐰

1. Ensure you have Bun installed. (Visit the [official Bun website](https://bun.sh/) for installation instructions). 💻

2. Clone the repository: 📂

   ```bash
   git clone https://github.com/openSUSE/quiz.git
   cd quiz
   ```

3. Install dependencies: ⚙️

   ```bash
   bun install
   ```

4. Run the application: ▶️

   ```bash
   bun start # This assumes a 'start' script is defined in package.json compatible with Bun
   ```

   To override the default port (3000) or reset token (ensure your start script or application handles these environment variables): 🔑

   ```bash
   RESET_TOKEN=supersecret PORT=4000 bun start
   ```

5. Visit [http://localhost:3000](http://localhost:3000) (or your specified port) in your browser. 🌐

### Distrobox 📦🐳

Distrobox example with Tumbleweed and nodejs22/npm22 preinstalled:

```bash
distrobox create -i registry.opensuse.org/opensuse/tumbleweed:latest --additional-packages "git nodejs22" -n quiz
distrobox enter quiz
git clone https://github.com/openSUSE/quiz.git
cd quiz
npm install
npm start # For port overriding: RESET_TOKEN=supersecret PORT=4000 npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser. 🌐

### Docker 🐳

Alternatively, you can use Docker to run the application.
We have also an [image with registry.opensuse.org ](https://registry.opensuse.org/cgi-bin/cooverview?srch_term=project%3D%5Ehome%3A+project%3D%5Ehome%3Alkocman%3Aimages++container%3Dquiz.*)

First, build the Docker image: 🛠️

```bash
docker build -t opensuse-quiz .
```

Then, run the container: ▶️

```bash
docker run -p 3000:3000 -e RESET_TOKEN=supersecret -e PORT=3000 opensuse-quiz
```

You can change the `RESET_TOKEN` and `PORT` environment variables as needed. ⚙️

Visit [http://localhost:3000](http://localhost:3000) (or your specified port) in your browser. 🌐

## 🛠️ Typical usage & Howto

Users go to a page referenced by a QR code at the openSUSE booth. 📱
They can take various quizzes. 📝

The booth displays [http://localhost:3000/stats](http://localhost:3000/stats) 📊

At an agreed time, we call out winners in one of two ways: 🏆

1. Based on [http://localhost:3000/stats](http://localhost:3000/stats)
2. Go to [http://localhost:3000/bingo](http://localhost:3000/bingo) and pick three winners 🎰
3. Visit [http://localhost:3000/reset?token=supersecret](http://localhost:3000/reset?token=supersecret) or restart the service to reset stats. 🔄

## Contributing 📝

# 🧠 Contributing to the openSUSE Quiz App

We welcome all contributions! Whether you're improving translations, adding new quiz questions, or localizing into a new language — thank you for making this better for everyone. 💚

---

## 🈷️ Helping with Translations

To add or correct translations in an existing language, head over to Weblate:

🔗 [https://l10n.opensuse.org/projects/quiz/quiz/](https://l10n.opensuse.org/projects/quiz/quiz/)

Weblate will automatically commit translations approximately two hours after the last change.

---

## ❓ Adding New Questions

You can add new questions by modifying or creating quiz files inside the `data/` directory.

📁 To add a new quiz:

- Create a new file like `data/s390x.js`.
- Follow the format used in existing quiz files.
- Use `po/extract-pot.sh` to extract questions from quiz to po/template.pot for translation in l10n.opensuse.org.
- Refer to [PR #35](https://github.com/openSUSE/quiz/pull/35) for a working example.

> ⚠️ **Important:** All questions and answers must match in between data/\*.js and po/template.pot or translations simply won't work and it will default to English.

🔁 If you change any text in `data/*.js`, you **must** update `po/template.pot` accordingly.

---

## 🌍 Adding a New Language

To add support for a new language:

1. Start a new language at Weblate:
   [https://l10n.opensuse.org/projects/quiz/quiz/](https://l10n.opensuse.org/projects/quiz/quiz/)

2. Weblate will create and commit the new language file (e.g., `po/ca.po`) after a short delay.
   If needed, feel free to contact maintainers to speed up the process.

3. Once the file exists in the repository, add a user-friendly name to the language selector:
   Add a line like `lang_name_ca` to `po/template.pot`.

📌 Once weblate commits new language into `po/` directory. We can add language mapping e.g. cs -> Czech to [i18nHelpers.js](https://github.com/openSUSE/quiz/blob/main/src/i18nHelpers.js#L52).

---

## Pre-commit Hook for POT File Generation 🌎

This project uses a pre-commit hook to automatically update the `po/template.pot` file whenever JavaScript files in `data/` or `src/i18nHelpers.js` are changed. This ensures that the translation template is always up-to-date with the latest translatable strings.

### Setup ⚙️

1. **Install pre-commit**: 👷
   If you don't have it already, install pre-commit. See the [official installation guide](https://pre-commit.com/#install).

   ```bash
   # openSUSE method
   sudo zypper install python-pre-commit
   # Fedora method
   sudo dnf install pre-commit -y
   # PIP method
   pip install pre-commit --user # or use virtualenv
   # brew installation method
   brew install pre-commit
   ```

2. **Install the Git hook scripts**: 👷
   Navigate to the root directory of this repository and run:

   ```bash
   pre-commit install
   ```

Now, every time you run `git commit`, the hook will execute `po/extract-pot.sh`. If the script modifies `po/template.pot`, the changes will be automatically added to your commit.

---

## 🦎 Making linter check happy

You may have noticed that we're using prettiers as part of CI Checks for each Pull request.
Users who run application locally can use the existing prettier inside quiz/nodejs_module:

Run json and code cleanup:

```bash
cd quiz
node_modules/prettier/bin/prettier.cjs --check "**/*.{js,json,md}" "*/data/**" --write
git commit -am "Prettier code"
git push
```

## 🦎 Test data

Copy our stats.json.sample In case you need quickly some test data.
Please avoid pushing changes to public/stats.json. We have it in .gitignore for a reson. 💚

```bash
cd quiz
cp public/stats.json.sample public/stats.json
npm start
```

Visit [http://localhost:4000/stats](http://localhost:4000/stats) or [http://localhost:4000/bingo](http://localhost:4000/bingo) in your browser. 🌐

---

Thanks for your contribution! 🐲💚

## 🌐 Instance

[https://quiz-o-o.netlify.app/](https://quiz-o-o.netlify.app/) 🌍

**💡 Booth staff tip**
You can make individual instances for conferences by creating a new pull request (e.g., "Devconf 2025") which will spawn a new instance of quiz-o-o in netlify.app. ✨

---

## 🍻 openSUSE Bar

[![openSUSE Bar](https://img.shields.io/badge/meetup-openSUSE%20Bar-6da741?logo=opensuse&logoColor=white)](https://meet.opensuse.org/bar)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-openSUSE-6da741?logo=opensuse&logoColor=white)](https://en.opensuse.org/Code_of_Conduct)

This project is developed mostly at the [openSUSE Bar](https://en.opensuse.org/openSUSE:Bar) — a place where everyone from the community can hang out, meet new people and just have a good time. We fix stuff together, contribute, talk about basically everything, help others and have a lot of fun.

The openSUSE Bar operates under the [openSUSE Code of Conduct](https://en.opensuse.org/Code_of_Conduct).
