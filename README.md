# WishPoint App

## Dependencies 

- Git
- Ruby: You can install Ruby using RVM or macports
To install Ruby via RVM run this in your console
    
    	$ \curl -sSL https://get.rvm.io | bash -s stable --ruby
    
- Compass: Depends on ruby being installed 
    	
    	$ gem install compass

- NodeJs
- Cordova

		$ sudo npm install -g cordova
- Bower
    
    	$ sudo npm install -g bower

- Grunt Cli : You can install this if you have node by running
  
   		$ sudo npm install -g grunt-cli
- [Yeoman](http://yeoman.io)
    
    	$ sudo npm install -g yo

- [Ionic Framework](http://ionicframework.com/docs/guide/installation.html)
    
    	$ sudo npm install -g ionic
    	
- [Ionic Generator](https://github.com/diegonetto/generator-ionic)
    
    	$ sudo npm install -g generator-ionic

Install all prerequisites before running the steps below

#Running Dev environment

To initialize the dev environment run

    npm install && bower install 

To start local development server
    
    $ grunt serve --consolelogs
	$ grunt serve:compress

## grunt [emulate|run]:<target>

Either emulate your Ionic app inside a simulator or run it on a connected device, optionally enabling LiveReload support to supercharge your development speed and enhance productivity. Note: Any changes to native plugins will still require a full rebuild. This command also uses the ionic-cli under the hood, so these additional flags can be specified.

	$ grunt emulate:ios --livereload
	$ grunt emulate:ios --lc
	$ grunt emulate:ios --target=iPad -lc
	$ grunt emulate:android --consolelogs

	$ grunt run:ios
	$ grunt run:android

Hack for battlehack
