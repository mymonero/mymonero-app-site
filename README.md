# MyMonero Website

## License and Copyrights

See `LICENSE.txt` for license.

All app source code and assets copyright © 2014-2019 by MyMonero. All rights reserved.

## Architecture Notes

* Written with Jekyll, SCSS, HTML, and Javascript


## Repository Setup

### Pre-requisites

* Install Ruby using your package manager. E.g. for Ubuntu (`sudo apt-get install ruby`)

* Install Ruby Development tools. E.g. for Ubuntu (`sudo apt-get install ruby2.7-dev`)

* Jekyll (`gem install jekyll`)

* bundler (`gem install bundler`)

### Running dev server

#### Setup

1. Clone or download this repo.

2. `cd` into the repo directory.

3. `bundle install`

#### Running

1. Run `jekyll serve` 

	* Note: you may receive an error similar to the following: "/usr/lib/ruby/2.7.0/bundler/runtime.rb:312:in "check_for_activated_spec!': You have already activated public_suffix 4.0.6, but your Gemfile requires public_suffix 3.0.3. Prepending `bundle exec` to your command may solve this. (Gem::LoadError)" need to prefix this with `bundle exec` if you get a matching error

## Contributing

### Testing

Please submit any bugs as Issues unless they have already been reported.


## Authors

* 👨‍🚀 `endogenic` ([Paul Shapiro](https://github.com/paulshapiro)) Maintainer

* ⚡️ `mds` ([Matt Smith](http://mds.is)) Website v1 designer

* ⛄️ `tfi_charmers` Built v1 jekyll site; Bug fixes & design guidance

