# openSUSE-quiz

A goal of this project is to provide openSUSE booth staff with a local instance of a quiz that we used to do in [a paper form](https://github.com/openSUSE/artwork/tree/master/quizzes). This saves both money and environment.

## Key goals

[x] **Knowledge challenge**m ode where ve value individuals knowledge about the project and we pick the ultimate winner based on stats.

[x] **Getting familiar with openSUSE** mode, where we keep track of attendees and provide a mini interactive (press enter) lottery at the end. So everybody can win some prices.

[x] No worries about GDPR. The database is in-memory only, holds only nicknames and data is erased after process is stopped or re-started. You can also reset stats by simply visiting /reset.

## License

SPDX-License-Identifier: MIT

This project is under MIT License.

It is based on the example [nodejs-quiz-app-l5hig](https://codesandbox.io/p/sandbox/nodejs-quiz-app-l5hig) at codesandbox.io. Many thanks to the author for making it.

## Runme 

Distrobox example
```
$ distrobox enter quiz
$ zypper in git nodejs
$ git clone https://github.com/openSUSE/quiz.git
$ cd quiz
$ npm install
$ node server.js
```

Visit http://localhost:3000 in your browser

## Typical usage & Howto

Users go to a page referenced by QRcode at the openSUSE booth.
They can take various quizzes.

Booth displays http://localhost:3000/stats

At an agreed time we call out winners by one of two ways.
1) Based on http://localhost:3000/stats
2) Go to http://localhost:3000/bingo and pick three winners
3) Visit http://localhost:3000/reset or restart the service




## Screenshots

![image](https://github.com/user-attachments/assets/9704ff88-d9f1-4054-9c6c-aafbac88b7d1)

![image](https://github.com/user-attachments/assets/908b0650-0485-428e-a2af-02ffc691f1c1)

![image](https://github.com/user-attachments/assets/1da951bf-c2cd-497c-a32a-3a6dd7aad7f8)



