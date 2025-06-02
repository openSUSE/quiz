# 🦎 openSUSE-quiz 🦎

A goal of this project is to provide openSUSE booth staff with a local instance of a quiz that we used to do in [a paper form](https://github.com/openSUSE/artwork/tree/master/quizzes). This saves both money 💰 and environment 🌍.

## 🎯 Key goals

✅ **Knowledge challenge** mode: Value individuals' knowledge about the project and pick the ultimate winner based on stats. 🏆

✅ **Getting familiar with openSUSE** mode: Keep track of attendees and provide a mini interactive (press enter) lottery at the end. So everybody can win some prizes. 🎁

✅ **GDPR compliant**: No worries about GDPR! The database is in-memory only, holds only nicknames, and data is erased after the process is stopped or restarted. You can also reset stats by simply visiting `/reset`. 🛡️

## 📜 License

SPDX-License-Identifier: MIT

This project is under the MIT License. 🙏

It is based on the example [nodejs-quiz-app-l5hig](https://codesandbox.io/p/sandbox/nodejs-quiz-app-l5hig) at codesandbox.io. Many thanks to the author for making it. 🙏

## 🚀 Running the Application

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

Distrobox example:

```bash
distrobox create --name quiz --image opensuse/tumbleweed --install zypper
```

Then install the required packages and run the app: ⚙️

```bash
distrobox enter quiz
zypper in git nodejs
git clone https://github.com/openSUSE/quiz.git
cd quiz
npm install
npm start # For port overriding: RESET_TOKEN=supersecret PORT=4000 npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser. 🌐

### Docker 🐳

Alternatively, you can use Docker to run the application.

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

New questions can be added into existing Quizes inside data dir.
Simply create a new data/\*.js to add a new Quiz.

In order to allow localization all questions need to be placed in `data/*.js` but also in
`locales/en/LC_MESSAGES`. Its duplicating but also rewarding. I guess we could write some extractor later.

The questions and answers in `data/*.js` **absolutely must match** the msgid in all `LC_MESSAGES` files.
So please avoid various corrections in data/\*.js in case you'll not willing to update at least locales/en/LC_MESSAGES.

Translations can be easily done in our Weblate [https://l10n.opensuse.org/](https://l10n.opensuse.org/projects/quiz/quiz/).

## 🌐 Instance

[https://quiz-o-o.netlify.app/](https://quiz-o-o.netlify.app/) 🌍

**💡 Booth staff tip**
You can make individual instances for conferences by creating a new pull request (e.g., "Devconf 2025") which will spawn a new instance of quiz-o-o in netlify.app. ✨
