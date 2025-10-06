// Copyright (c) 2014-2019, MyMonero.com
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//	conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//	of conditions and the following disclaimer in the documentation and/or other
//	materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//	used to endorse or promote products derived from this software without specific
//	prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//
"use strict";
//

const desktopVersionString = '1.3.3'
const mobileVersionString = '1.3.8'
const githubUrl = "https://github.com/mymonero/mymonero-app-js/releases/download";

const downloadLink__mac = `${githubUrl}/v${desktopVersionString}/MyMonero-${desktopVersionString}.dmg`
const downloadLink__win = `${githubUrl}/v${desktopVersionString}/MyMonero-Setup-${desktopVersionString}.exe`
const downloadLink__linux = `${githubUrl}/v${desktopVersionString}/MyMonero-${desktopVersionString}.AppImage`
const downloadLink__android = `https://play.google.com/store/apps/details?id=com.mymonero.official_android_application`
const downloadLink__ios = "https://apps.apple.com/us/app/apple-store/id1372508199"

// https://github.com/mymonero/mymonero-app-js/releases/download/v1.1.13/MyMonero-Setup-1.1.13.exe
// https://github.com/mymonero/mymonero-app-js/releases/tag/v1.1.16-beta
//

function getOS()
{
	const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
	const platform = window.navigator.platform;
	if (/Android/.test(userAgent) || /Android/.test(platform)) {
		return 'Android';
	} else if (['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'Mac OS X', 'macOS'].indexOf(platform) !== -1) {
		return 'Mac OS';
	} else if (['iPhone', 'iPad', 'iPod', 'iOS'].indexOf(platform) !== -1 && !window.MSStream) {
		return 'iOS';
	} else if (['Win32', 'Win64', 'Windows', 'WinCE'].indexOf(platform) !== -1) {
		return 'Windows';
	} else if (/windows phone/i.test(userAgent)) { // Windows Phone must come first because its UA may also contain "Android"
		return 'Windows Phone';
	} else if (/(Linux|Ubuntu|Debian|CentOS|Fedora|FreeBSD|Gentoo|Mint|Sailfish|Slackware|RedHat|CrOS)/.test(userAgent)) {
		return 'Linux';
	}
	return 'Mac OS'; // fallback
}
function getQueryStringValue(key)
{  
	return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
} 
function osDisplayNameFor(releasesInfo_key, osName)
{
	return releasesInfo_key == "mac" ? "macOS" : osName;
}

(function(){
//
document.addEventListener("DOMContentLoaded", function()
{
	const osName = getOS();
	var mm = mm || {};
	//

	//
	var desktopGitHubUrl = 'https://github.com/mymonero/mymonero-app-js/releases'
	var releasesInfo = 
	{
		mac: {
			downloadUrl: downloadLink__mac,
			downloadTitleSuffix: ' (Mac)',
			githubUrl: desktopGitHubUrl,
			version: desktopVersionString
		},
		windows: {
			downloadUrl: downloadLink__win,
			downloadTitleSuffix: ' (Windows)',
			githubUrl: desktopGitHubUrl,
			version: desktopVersionString
		},
		linux: {
			downloadUrl: downloadLink__linux,
			downloadTitleSuffix: ' (Linux)',
			githubUrl: desktopGitHubUrl,
			version: desktopVersionString
		},
		android: {
			downloadUrl: downloadLink__android,
			downloadTitleSuffix: ' (Android)',
			githubUrl: 'https://github.com/mymonero/mymonero-android-js',
			version: mobileVersionString
		},
		ios: {
			downloadUrl: downloadLink__ios,
			downloadTitleSuffix: ' &rarr; App Store',
			githubUrl: 'https://github.com/mymonero/mymonero-app-ios',
			version: mobileVersionString
		}
	}
	
	// Only set download links if elements exist
	const macLink = document.querySelector('a.mac-download-link');
	const winLink = document.querySelector('a.win-download-link');
	const linuxLink = document.querySelector('a.linux-download-link');
	const androidLink = document.querySelector('a.android-download-link');
	
	if (macLink) macLink.setAttribute('href', downloadLink__mac);
	if (winLink) winLink.setAttribute('href', downloadLink__win);
	if (linuxLink) linuxLink.setAttribute('href', downloadLink__linux);
	if (androidLink) androidLink.setAttribute('href', downloadLink__android);
	//
	// Initialiser
	//
	mm.initialiser = {
		uaParser: function() {
			var mainButtons = document.querySelector(".download-buttons");
			if (!mainButtons) {
				return; // Not on homepage, skip download button logic
			}
			function addDownloadButtons(downloadUrl, githubUrl,	shortVersionString,	downloadTitleSuffix_orUndef) {
				//
				// insert top buttons
				var downloadButton_title = "Download"
				if (typeof downloadTitleSuffix_orUndef !== 'undefined' && downloadTitleSuffix_orUndef) {
					downloadButton_title += downloadTitleSuffix_orUndef
				}
				var download_listIndexLayer = document.createElement('li')
				download_listIndexLayer.innerHTML = '<a href="'
						+ downloadUrl
						+'" class="button download-app">'
						+ '<span class="convert-emoji" aria-hidden="true">&#x1F447;</span>'
						+ '<span class="text"><b>' + downloadButton_title + '</b></span>'
					+'</a>';
				mainButtons.appendChild(download_listIndexLayer);
				//
				addTopButton_github(githubUrl, shortVersionString)
				//
				// insert bottom button
				var bottom_downloadButtonLayer; // not wrapped in an 'li'
				{
					var tmpContainer = document.createElement('div')
					tmpContainer.innerHTML = '<a href="' + downloadUrl +  '" class="button extra-button">'
							+ '<span class="text">' + downloadButton_title + '</span>'
						+ '</a>'
					bottom_downloadButtonLayer = tmpContainer.firstChild
				}
				var bottomDownloadContainer = document.querySelector('.bottom-download-container')
				bottomDownloadContainer.appendChild(bottom_downloadButtonLayer) // after the h2; not wrapped in 'li'
			}
			function addTopButton_github(githubUrl, shortVersionString)
			{
				var github_listIndexLayer = document.createElement('li')
				github_listIndexLayer.innerHTML = '<a href="' + githubUrl + '" class="button secondary">'
						+ '<span class="text">Version ' + shortVersionString + ' &rarr; GitHub</span>'
					+ '</a>';
				mainButtons.appendChild(github_listIndexLayer);
			}
			//
			function addQuickAccessWebWalletTopButton()
			{
				const li = document.createElement("li")
				li.innerHTML = `<a href="https://wallet.mymonero.com/" class="button extra-button">`
					+ `<span class="text">Quick access wallet online</span>`
				+ `</a>`
				mainButtons.appendChild(li);
			}
			//
			function updateOsName(releasesInfo_key)
			{
				const osElement = document.querySelector(".os");
				if (osElement) {
					osElement.innerHTML = 'for ' + osDisplayNameFor(releasesInfo_key, osName);
				}
			}
			//
			const isAndroid = osName.match(/^Android$/)
			console.log(osName);
			{
				var releasesInfo_key = null;
				if (isAndroid) {
					releasesInfo_key = 'android'
				} else if (osName.match(/^(Mac OS)$/)) {
					releasesInfo_key = 'mac'
				} else if (osName.match(/^(Windows)$/)) {
					releasesInfo_key = 'windows'
				} else if (osName.match(/^iOS$/)) {
					releasesInfo_key = "ios"
				} else if (osName.match(/^(Linux|Ubuntu|Debian|CentOS|Fedora|FreeBSD|Gentoo|Mint|Sailfish|Slackware|RedHat)$/)) {
					// TODO: this might be missing some --^
					releasesInfo_key = "linux"
				} else { // fall back to linux ... anything else like Amiga OS could be filtered
					releasesInfo_key = "linux"
				}
				var platform_releasesInfo = releasesInfo[releasesInfo_key]
				addDownloadButtons(
					platform_releasesInfo.downloadUrl,
					platform_releasesInfo.githubUrl,
					platform_releasesInfo.version,
					platform_releasesInfo.downloadTitleSuffix // NOTE this may be undefined
				)
				updateOsName(releasesInfo_key);
			}
			//
			if (!isAndroid) {
				mainButtons.insertAdjacentHTML("afterend", `<p class="accessory secondary">Or, <a href="https://wallet.mymonero.com" class="strong">Access Web Wallet</a></p>`);
			}
			mainButtons.insertAdjacentHTML("afterend", `<p class="accessory">Not on ${osDisplayNameFor(releasesInfo_key, osName)}? <a href="#cross-platform">See other platforms</a></p>`);
			if (isAndroid) {
				mainButtons.insertAdjacentHTML("afterend", `<p class="accessory coming-soon"><i><strong>Coming soon for Android</strong></i></p>`);
			}

			setTimeout(function()
			{
				const open_support = getQueryStringValue("open_support")
				if (open_support == "1" || open_support == "true" || open_support) {
					window.Intercom('show')
				}
			}, 300)
		},
		//
		// replace unicode characters with emojione images unless OS is stated
		//
		emojione: function() {
			if(osName.match(/^((?!(Mac OS|iOS|Android)).)*$/)) {
				if (typeof emojione !== 'undefined') {
					emojione.imagePathPNG = '//cdn.jsdelivr.net/emojione/assets/3.0/png/64/';
					var emojis = document.querySelectorAll('.convert-emoji');
					Array.prototype.forEach.call(emojis, function(el, i){
						var original = el.innerHTML,
								converted = emojione.toImage(original);
						el.outerHTML = converted;
					});
				}
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
	// Sunset Modal
	//
	const sunsetNotification = document.getElementById('sunset-notification');
	const openSunsetModal = document.getElementById('open-sunset-modal');
	const sunsetModal = document.getElementById('sunset-modal');
	const modalClose = document.getElementById('modal-close');

	function openModal() {
		if (sunsetModal) {
			sunsetModal.classList.add('active');
			document.body.style.overflow = 'hidden';
		}
	}

	function closeModal() {
		if (sunsetModal) {
			sunsetModal.classList.remove('active');
			document.body.style.overflow = '';
		}
	}

	if (sunsetNotification) {
		sunsetNotification.addEventListener('click', openModal);
	}

	if (openSunsetModal) {
		openSunsetModal.addEventListener('click', function(e) {
			e.preventDefault();
			openModal();
		});
	}

	if (modalClose) {
		modalClose.addEventListener('click', closeModal);
	}

	if (sunsetModal) {
		sunsetModal.addEventListener('click', function(e) {
			if (e.target === sunsetModal) {
				closeModal();
			}
		});

		// Close on escape key
		document.addEventListener('keydown', function(e) {
			if (e.key === 'Escape' && sunsetModal.classList.contains('active')) {
				closeModal();
			}
		});

		// Check for URL parameter to auto-open modal
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get('announcement') === '1' || urlParams.get('announcement') === 'true') {
			openModal();
		}
	}
});
//
})();
