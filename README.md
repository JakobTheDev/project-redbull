# Project RedBull
![GitHub package.json version](https://img.shields.io/github/package-json/v/JakobRPennington/project-redbull?style=flat-square)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Build Status](https://img.shields.io/travis/JakobRPennington/project-redbull.svg?style=flat-square)](https://travis-ci.com/JakobRPennington/project-redbull)
[![Known Vulnerabilities](https://snyk.io/test/github/JakobRPennington/project-redbull/badge.svg?style=flat-square)](https://snyk.io/test/github/JakobRPennington/project-redbull)

[![Angular](https://img.shields.io/badge/Angular-8.2.0-blue?&style=flat-square)](https://update.angular.io)
[![node](https://img.shields.io/badge/node->10.9.0-blue?&style=flat-square)](https://nodejs.org/en/)

# Introduction

Project Redbull is a methodology and notetaking tool for penetration testers and bug bounty hunters.

Redbull currently runs with:
* Angular v8.2.8
* Electron v6.0.10
* Node v10.9.0 or later

## Getting Started

Before running the project locally, you'll need to install:  
* Node v10.9.0 or later available [here](https://nodejs.org/en/) (or using nvm)

Install the Angular CLI:
```bash
npm install -g @angular/cli
```

Clone this repository:  
```bash
git clone https://github.com/JakobRPennington/project-redbull.git
```

Install dependencies with npm:
```bash
cd project-redbull
npm install
```

## Development

Some npm scripts have been created to help with development. Simply run `npm run` to run the app with hot-reloading.

| Development Commands       | Description                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `npm start`                | Run the application locally.                                                                                |
| `npm run commit`           | Fin this after `git add`ing files to commit changes (required to commit, runs linting and commitizen).      |


| Build Commands             | Description                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `npm run electron:local`   | Builds the application and starts electron.                                                                 |
| `npm run electron:linux`   | Builds the application and creates an app consumable on linux system.                                       |
| `npm run electron:windows` | On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems.        |
| `npm run electron:mac`     | On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac.|

