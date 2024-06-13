var app = angular.module('musicPlayer', []);

app.controller('PlayerController', ['$scope', '$interval', function ($scope, $interval) {
    $scope.playlist = [
        {
            title: 'You know you like it',
            artist: 'Dj Snake',
            albumArt: 'https://i.scdn.co/image/ab67616d0000b273567a71695181017949f14f99',
            duration: (Math.floor(204 / 60) + ":" + (204 % 60)),
            url: 'DJ-Snake-You-Know-You-Like-It.mp3'
        },
        {
            title: 'Burn Out',
            artist: 'Martin Garrix',
            albumArt: 'https://i.scdn.co/image/ab67616d0000b27379c39f2bac4e6fc1610983a2',
            duration: (Math.floor(187 / 60) + ":" + (187 % 60 )),
            url: 'BurnOUT .mp3'
        },
        {
            title: 'Lighter',
            artist: 'David Guetta',
            albumArt: 'https://i.scdn.co/image/ab67616d0000b273c93daad3fd7acf20168abdb9',
            duration: (Math.floor(201 / 60) + ":" + (201 % 60)),
            url: 'lighter.mp3'
        },
        {
            title: 'Waiting For Love',
            artist: 'Avicii',
            albumArt: 'https://i.scdn.co/image/ab67616d0000b273d40648f55cadd57796f22455',
            duration: (Math.floor(244 / 60) + ":" + (244 % 60)),
            url: 'Waiting for love.mp3'
        },
        {
            title: 'I Know U',
            artist: 'Dyro & Loopers',
            albumArt: 'https://i.scdn.co/image/ab67616d0000b273ec2c16aa4d5d0203ac8988dc',
            duration: (Math.floor(230 / 60) + ":" + (230 % 60)),
            url: 'Dyro .mp3'
        }
    ];

    $scope.currentSong = $scope.playlist[0];
    $scope.isPlaying = false;
    $scope.progress = 0;
    $scope.currentTime = 0;
    $scope.audio = new Audio($scope.currentSong.url);
    $scope.dropdownVisible = false;

    var interval;

    $scope.toggleDropdown = function () {
        $scope.dropdownVisible = !$scope.dropdownVisible;
    };

    $scope.selectSong = function (song) {
        $scope.currentSong = song;
        $scope.audio.src = $scope.currentSong.url;
        $scope.audio.play();
        $scope.currentTime = 0;
        $scope.progress = 0;
        $scope.isPlaying = true;
        startProgressInterval();
    };

    $scope.togglePlayPause = function () {
        if ($scope.isPlaying) {
            $scope.audio.pause();
            $interval.cancel(interval);
        } else {
            $scope.audio.play();
            startProgressInterval();
        }
        $scope.isPlaying = !$scope.isPlaying;
    };

    function startProgressInterval() {
        $interval.cancel(interval);
        interval = $interval(function () {
            $scope.currentTime = $scope.audio.currentTime;
            $scope.progress = ($scope.currentTime / $scope.currentSong.duration) * 100;
        }, 1000);
    }

    $scope.prevSong = function () {
        const currentSongIndex = $scope.playlist.indexOf($scope.currentSong);
        if (currentSongIndex === 0) {
            $scope.currentSong = $scope.playlist[$scope.playlist.length - 1];
        } else {
            $scope.currentSong = $scope.playlist[currentSongIndex - 1];
        }
        $scope.audio.src = $scope.currentSong.url;
        $scope.audio.play();
        $scope.currentTime = 0;
        $scope.progress = 0;
        $scope.isPlaying = true;
        startProgressInterval();
    };

    $scope.nextSong = function () {
        const currentSongIndex = $scope.playlist.indexOf($scope.currentSong);
        if (currentSongIndex === $scope.playlist.length - 1) {
            $scope.currentSong = $scope.playlist[0];
        } else {
            $scope.currentSong = $scope.playlist[currentSongIndex + 1];
        }
        $scope.audio.src = $scope.currentSong.url;
        $scope.audio.play();
        $scope.currentTime = 0;
        $scope.progress = 0;
        $scope.isPlaying = true;
        startProgressInterval();
    };
    
    $scope.toggleShuffle = function () {
        const randomIndex = Math.floor(Math.random() * $scope.playlist.length);
        $scope.selectSong($scope.playlist[randomIndex]);
    };

    $scope.toggleRepeat = function () {
        $scope.currentTime = 0;
        $scope.progress = 0;
        $scope.audio.currentTime = 0;
        $scope.audio.play();
        $scope.isPlaying = true;
        startProgressInterval();
    };
    
}]);
