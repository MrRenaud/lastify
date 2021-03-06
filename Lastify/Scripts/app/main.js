﻿/// <reference path="../typings/jquery/jquery.d.ts" />
var Song = (function () {
    function Song(title, artist) {
        this.title = title;
        this.artist = artist;
    }
    return Song;
})();
;

$(document).ready(function () {
    $('#input').change(function () {
        var files = $('#input')[0].files;

        if (files.length > 0) {
            var file = files[0];

            var r = new FileReader();
            r.onload = function (e) {
                var nameParts = file.name.split('.');
                var ext = nameParts[nameParts.length - 1];
                var contents = e.target.result;

                parseText(contents, ext);
            };

            r.readAsText(file);
        }
    });

    ZeroClipboard.config({ swfPath: "/scripts/ZeroClipboard.swf" });
    var zeroClipboard = new ZeroClipboard(document.getElementById("copy-songs"));
});

function parseText(content, type) {
    var lines = content.split('\r\n');
    if (type === "tsv") {
        lines.splice(0, 1);
        var terms = [];
        var scope = angular.element($('#songList')).scope();

        scope.$apply(function () {
            scope.setLoading(true);
        });

        for (var index in lines) {
            terms = lines[index].split('\t');

            scope.$apply(function () {
                scope.pushSong(terms[0], terms[1]);
            });
        }

        scope.$apply(function () {
            scope.setLoading(false);
            scope.step = 2;
            scope.searchOnSpotify();
        });
    }
}
//# sourceMappingURL=main.js.map
