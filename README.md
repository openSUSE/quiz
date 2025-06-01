# 🦎 openSUSE-quiz 🦎

A goal of this project is to provide openSUSE booth staff with a local instance of a quiz that we used to do in [a paper form](https://github.com/openSUSE/artwork/tree/master/quizzes). This saves both money 💰 and environment 🌍.

## 🎯 Key goals

✅ **Knowledge challenge** mode: Value individuals' knowledge about the project and pick the ultimate winner based on stats. 🏆

✅ **Getting familiar with openSUSE** mode: Keep track of attendees and provide a mini interactive (press enter) lottery at the end. So everybody can win some prizes. 🎁

✅ **GDPR compliant**: No worries about GDPR! The database is in-memory only, holds only nicknames, and data is erased after the process is stopped or restarted. You can also reset stats by simply visiting `/reset`. 🛡️

## 📜 License

SPDX-License-Identifier: MIT

This project is under the MIT License.

It is based on the example [nodejs-quiz-app-l5hig](https://codesandbox.io/p/sandbox/nodejs-quiz-app-l5hig) at codesandbox.io. Many thanks to the author for making it. 🙏

## 🚀 Runme

Distrobox example:

```bash
distrobox create --name quiz --image opensuse/leap:15.5 --install zypper
```

Then install the required packages and run the app:

```bash
distrobox enter quiz
zypper in git nodejs
git clone https://github.com/openSUSE/quiz.git
cd quiz
npm install
npm start # For port overriding: RESET_TOKEN=supersecret PORT=4000 npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser. 🌐

### Docker

Alternatively, you can use Docker to run the application.

First, build the Docker image:

```bash
docker build -t opensuse-quiz .
```

Then, run the container:

```bash
docker run -p 3000:3000 -e RESET_TOKEN=supersecret -e PORT=3000 opensuse-quiz
```

You can change the `RESET_TOKEN` and `PORT` environment variables as needed.

Visit [http://localhost:3000](http://localhost:3000) (or your specified port) in your browser. 🐳

## 🛠️ Typical usage & Howto

Users go to a page referenced by a QR code at the openSUSE booth.
They can take various quizzes. 📝

The booth displays [http://localhost:3000/stats](http://localhost:3000/stats) 📊

At an agreed time, we call out winners in one of two ways:

1. Based on [http://localhost:3000/stats](http://localhost:3000/stats)
2. Go to [http://localhost:3000/bingo](http://localhost:3000/bingo) and pick three winners 🎰
3. Visit [http://localhost:3000/reset?token=supersecret](http://localhost:3000/reset?token=supersecret) or restart the service to reset stats. 🔄

## 🌐 Instance

[https://quiz-o-o.netlify.app/](https://quiz-o-o.netlify.app/)

**💡 Booth staff tip**
You can make individual instances for conferences by creating a new pull request (e.g., "Devconf 2025") which will spawn a new instance of quiz-o-o in netlify.app.
