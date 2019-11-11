#!/bin/bash

cd build

git init
git config --local user.email "action@github.com"
git config --local user.name "GitHub Action"

git add table.json
git commit -m "build"

git remote set-url origin https://kju8:${GITHUB_TOKEN}@github.com/kju8/all-embracing-insane-charts.git
git push origin build