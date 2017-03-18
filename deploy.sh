#!/usr/bin/bash

npm install firebase-tools@3.5.0 -g
npm run build
firebase deploy --token $FIREBASE_TOKEN
