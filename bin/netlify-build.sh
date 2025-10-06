#!/bin/bash
set -e

echo "Updating RubyGems..."
gem update --system 3.3.22

echo "Installing bundle dependencies..."
bundle install

echo "Building Jekyll site..."
bundle exec jekyll build
