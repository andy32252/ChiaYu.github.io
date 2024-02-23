(function($) {

	var	$window = $(window),
		$body = $('body'),
		settings = {

			// Carousels
			carousels: {
				speed: 4,
				fadeIn: true,
				fadeDelay: 250
			},
			music: {
				playing: true
			}

		};
	

	
	// Breakpoints.
	breakpoints({
		wide:      [ '1281px',  '1680px' ],
		normal:    [ '961px',   '1280px' ],
		narrow:    [ '841px',   '960px'  ],
		narrower:  [ '737px',   '840px'  ],
		mobile:    [ null,      '736px'  ]
	});

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
		
	});

	// Dropdowns.
	$('#nav > ul').dropotron({
		mode: 'fade',
		speed: 350,
		noOpenerFade: true,
		alignment: 'center'
	});

	// Scrolly.
	$('.scrolly').scrolly({
		offset: 500
	});

	// Nav.

	// Button.
	$(
		'<div id="navButton">' +
			'<a href="#navPanel" class="toggle"></a>' +
		'</div>'
	)
		.appendTo($body);

	// Panel.
	$(
		'<div id="navPanel">' +
			'<nav>' +
				$('#nav').navList() +
			'</nav>' +
		'</div>'
	)
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			target: $body,
			visibleClass: 'navPanel-visible'
		});

	// Carousels.
	$('.carousel').each(function() {

		var	$t = $(this),
			$forward = $('<span class="forward"></span>'),
			$backward = $('<span class="backward"></span>'),
			$reel = $t.children('.reel'),
			$items = $reel.children('article');

		var	pos = 0,
			leftLimit,
			rightLimit,
			itemWidth,
			reelWidth,
			timerId;

		// Items.
		if (settings.carousels.fadeIn) {

			$items.addClass('loading');

			$t.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				enter: function() {

					var	timerId,
						limit = $items.length - Math.ceil($window.width() / itemWidth);

					timerId = window.setInterval(function() {
						var x = $items.filter('.loading'), xf = x.first();

						if (x.length <= limit) {

							window.clearInterval(timerId);
							$items.removeClass('loading');
							return;

						}

						xf.removeClass('loading');

					}, settings.carousels.fadeDelay);

				}
			});

		}

		// Main.
		$t._update = function() {
			pos = 0;
			rightLimit = (-1 * reelWidth) + $window.width();
			leftLimit = 0;
			$t._updatePos();
		};

		$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };

		// Forward.
		$forward
			.appendTo($t)
			.hide()
			.mouseenter(function(e) {
				timerId = window.setInterval(function() {
					pos -= settings.carousels.speed;

					if (pos <= rightLimit)
					{
						window.clearInterval(timerId);
						pos = rightLimit;
					}

					$t._updatePos();
				}, 10);
			})
			.mouseleave(function(e) {
				window.clearInterval(timerId);
			});

		// Backward.
		$backward
			.appendTo($t)
			.hide()
			.mouseenter(function(e) {
				timerId = window.setInterval(function() {
					pos += settings.carousels.speed;

					if (pos >= leftLimit) {

						window.clearInterval(timerId);
						pos = leftLimit;

					}

					$t._updatePos();
				}, 10);
			})
			.mouseleave(function(e) {
				window.clearInterval(timerId);
			});

		// Init.
		$window.on('load', function() {

			reelWidth = $reel[0].scrollWidth;

			if (browser.mobile) {

				$reel
					.css('overflow-y', 'hidden')
					.css('overflow-x', 'scroll')
					.scrollLeft(0);
				$forward.hide();
				$backward.hide();

			}
			else {

				$reel
					.css('overflow', 'visible')
					.scrollLeft(0);
				$forward.show();
				$backward.show();

			}

			$t._update();

			$window.on('resize', function() {
				reelWidth = $reel[0].scrollWidth;
				$t._update();
			}).trigger('resize');

		});
	});

	(function($) {

		var $window = $(window),
			$body = $('body'),
			settings = {
				// Carousels
				carousels: {
					speed: 4,
					fadeIn: true,
					fadeDelay: 250
				},
				// 添加音樂播放狀態
				music: {
					playing: true,
					volume: 1
				}
			};
	
		// ... (現有的代碼)
	
		$window.on('load', function() {
			var audio = document.getElementById("backgroundMusic");
			var playPauseButton = document.getElementById("playPauseButton");
			var volumeUpButton = document.getElementById("volumeUpButton");
       		var volumeDownButton = document.getElementById("volumeDownButton");
			var prevButton = document.getElementById("prevButton");
			var nextButton = document.getElementById("nextButton");
			var songList = document.getElementById("songList");
			var currentSongIndexSpan = document.getElementById("currentSongIndex");
			var currentSongNameSpan = document.getElementById("currentSongName");
			var progressBar = document.getElementById("progressBar");
	        var currentTimeSpan = document.getElementById("currentTime");
    	    var durationSpan = document.getElementById("duration");


			var playlist = [
				"./images/想和你看五月的晚霞.mp3",
				"./images/從前說.mp3",
				"./images/仗著.mp3",
				"./images/刻在我心底的名字.mp3"
				// 添加更多歌曲...
			];

			var currentSongIndex = 0;

			for (var i = 0; i < playlist.length; i++) {
				var option = document.createElement("option");
				option.value = i;
				option.text = "歌曲 " + (i + 1);
				songList.appendChild(option);
			}

			playPauseButton.addEventListener("click", function () {
				if (audio.paused) {
					audio.play();
					playPauseButton.textContent = "暫停";
					updateSongInfo(); // 手動更新歌曲信息
				} else {
					audio.pause();
					playPauseButton.textContent = "播放";
					currentSongNameSpan.textContent = "歌曲"; // 將顯示的文字設為"歌曲"
				}
			});
			

			prevButton.addEventListener("click", function () {
				currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
				playSong();
				updateSongInfo(); // 手動更新歌曲信息
			});
		
			nextButton.addEventListener("click", function () {
				currentSongIndex = (currentSongIndex + 1) % playlist.length;
				console.log("Next Song Index: " + currentSongIndex); // 添加這行除錯語句
				playSong();
				updateSongInfo(); // 手動更新歌曲信息
			});
			
			songList.addEventListener("change", function () {
				currentSongIndex = parseInt(songList.value);
				playSong();
			});

			function playSong() {
				audio.src = playlist[currentSongIndex];
				audio.load();
				audio.play(); // 直接播放，无需等待canplay事件
				updateSongInfo();
			}

			function updateSongInfo() {
				currentSongIndexSpan.textContent = "歌曲 " + (currentSongIndex + 1) + " / " + playlist.length;
				songList.value = currentSongIndex;
			
				if (!audio.paused) {
					currentSongNameSpan.textContent = "正在播放：" + getFileName(playlist[currentSongIndex]);
				} 
			}
			
			function getFileName(path) {
				// 從路徑中提取文件名稱
				var startIndex = path.lastIndexOf("/") + 1;
				var endIndex = path.lastIndexOf(".");
				return path.substring(startIndex, endIndex);
			}

			volumeUpButton.addEventListener("click", function () {
				if (settings.music.volume < 1) {
					settings.music.volume += 0.1; // 調整音量增加的步長
					audio.volume = settings.music.volume;
				}
			});
	
			volumeDownButton.addEventListener("click", function () {
				if (settings.music.volume > 0) {
					settings.music.volume -= 0.1; // 調整音量降低的步長
					audio.volume = settings.music.volume;
				}
			});

			audio.addEventListener("timeupdate", function () {
				var currentTime = audio.currentTime;
				var duration = audio.duration;
	
				// 更新進度條和時間
				progressBar.value = (currentTime / duration) * 100;
				currentTimeSpan.textContent = formatTime(currentTime);
				durationSpan.textContent = formatTime(duration);
			});			

			audio.addEventListener("ended", function () {
				playNextSong();
			});
			
			function playNextSong() {
				// 计算下一首歌曲的索引
				currentSongIndex = (currentSongIndex + 1) % playlist.length;
			
				// 播放下一首歌曲
				playSong();
				updateSongInfo();
			}			
	
			progressBar.addEventListener("input", function () {
				// 當用戶拖動進度條時，設定音樂的播放時間
				var seekTime = (progressBar.value / 100) * audio.duration;
				audio.currentTime = seekTime;
			});
	
			function formatTime(time) {
				var minutes = Math.floor(time / 60);
				var seconds = Math.floor(time % 60);
				seconds = seconds < 10 ? "0" + seconds : seconds;
				return minutes + ":" + seconds;
			}

			// 在頁面加載後手動播放音樂
			audio.play();
			updateSongInfo();
		});
	
	})(jQuery);

	

})(jQuery);
