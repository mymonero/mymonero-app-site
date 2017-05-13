"use strict";
//
(function(){
//
var parser = new UAParser(),
    parserResult = parser.getResult(),
    osName = parserResult.os.name;
//
// Create global namespace
//
var mm = mm || {};
//
// Initialiser
//
mm.initialiser = {
  uaParser: function() {
    //
    // console.log(osName);
    //
    var downloadUrl,
        downloadOption = document.createElement('li'),
        mainButtons = document.querySelector(".download-buttons");
    //
    if(document.body.contains(mainButtons)){
      //
      // Possible 'os.name'
      // AIX, Amiga OS, Android, Arch, Bada, BeOS, BlackBerry, CentOS, Chromium OS, Contiki, Fedora, Firefox OS, FreeBSD, Debian, DragonFly, Gentoo, GNU, Haiku, Hurd, iOS, Joli, Linpus, Linux, Mac OS, Mageia, Mandriva, MeeGo, Minix, Mint, Morph OS, NetBSD, Nintendo, OpenBSD, OpenVMS, OS/2, Palm, PCLinuxOS, Plan9, Playstation, QNX, RedHat, RIM Tablet OS, RISC OS, Sailfish, Series40, Slackware, Solaris, SUSE, Symbian, Tizen, Ubuntu, UNIX, VectorLinux, WebOS, Windows [Phone/Mobile], Zenwalk
      //
      if(osName.match(/^(Mac OS)$/)) {
        downloadUrl = 'https://mymonero.com/downloads/mac';
        addDownloadButtons();
      } else if(osName.match(/^(Windows)$/)) {
        downloadUrl = 'https://mymonero.com/downloads/windows';
        addDownloadButtons();
      } else if(osName.match(/^(Linux|Ubuntu|Debian)$/)) {
        downloadUrl = 'https://mymonero.com/downloads/linux';
        addDownloadButtons();
      } else if(osName.match(/^(Android|iOS)$/)) {
        addSoonStatus();
      }
    }
    //
    function addDownloadButtons() {
      var extraButton = document.querySelector(".extra-button"),
          downloadButton = '<a href="'+downloadUrl+'" class="button download-app"><span class="convert-emoji" aria-hidden="true">&#x1F447;</span><span class="text"><b>Download</b> (10Mb)</span></a>';
      //
      // insert top button
      //
      mainButtons.insertBefore(downloadOption, mainButtons.firstChild);
      downloadOption.innerHTML = downloadButton;
      //
      // replace bottom button
      //
      extraButton.outerHTML = downloadButton;
      //
      updateOsName();
    }
    //
    function addSoonStatus() {
      mainButtons.insertBefore(downloadOption, mainButtons.firstChild);
      downloadOption.innerHTML = '<span class="soon"><span class="text">Coming soon&#x2122;</span></span>';
      //
      updateOsName();
    }
    //
    function updateOsName() {
      document.querySelector(".os").innerHTML = 'for ' + osName;
    }
  },
  //
  // replace unicode characters with emojione images unless OS is stated
  //
  emojione: function() {
    if(osName.match(/^((?!(Mac OS|iOS|Android)).)*$/)) {
      emojione.imagePathPNG = '//cdn.jsdelivr.net/emojione/assets/3.0/png/64/';
      var emojis = document.querySelectorAll('.convert-emoji');
      Array.prototype.forEach.call(emojis, function(el, i){
        var original = el.innerHTML,
            converted = emojione.toImage(original);
        el.outerHTML = converted;
      });
    }
  }
};
//
// Call the functions
//
var mymonero = mm.initialiser;
mymonero.uaParser();
mymonero.emojione();
//
})();
