# openSUSE-quiz

A goal of this project is to provide openSUSE booth staff with a local instance of a quiz that we used to do in [a paper form](https://github.com/openSUSE/artwork/tree/master/quizzes). This saves both money and environment.

## Key goals

[x] **Knowledge challenge**m ode where ve value individuals knowledge about the project and we pick the ultimate winner based on stats.

[x] **Getting familiar with openSUSE** mode, where we keep track of attendees and provide a mini interactive (press enter) lottery at the end. So everybody can win some prices.

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


## Screenshots

![quiz](https://github.com/user-attachments/assets/8d945102-d7b0-4f0e-88b9-c6541dadfec7)

![image](https://github.com/user-attachments/assets/9704ff88-d9f1-4054-9c6c-aafbac88b7d1)

![image](https://github.com/user-attachments/assets/908b0650-0485-428e-a2af-02ffc691f1c1)

![image](https://github.com/user-attachments/assets/1da951bf-c2cd-497c-a32a-3a6dd7aad7f8)



