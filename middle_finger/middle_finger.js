main();
function main() {
  (function() {
    var self = {
      middleFingerImgs: [
        "https://img2.cgtrader.com/items/888238/1b98daf4c3/large/octopus-middle-finger-3d-model-stl.jpg",
        "https://static.boredpanda.com/blog/wp-content/uploads/2015/07/gorilla-middle-finger-bob-pitchford-bristol-zoo-3.jpg",
        "https://cdn.images.express.co.uk/img/dynamic/67/590x/Dele-Alli-was-caught-on-camera-sticking-up-his-middle-finger-850040.jpg",
        "https://thechive.files.wordpress.com/2017/01/celebs-that-gave-2016-a-giant-middle-finger-25-photos-218.jpg?quality=85&strip=info"
      ],

      lastElementCount: 0,
      timeSinceFullRefresh: 0,

      handleImages: function(lstImgs, timeShortRefresh, timeFullRefresh) {
        if (timeShortRefresh == 0) {
          timeShortRefresh = timeFullRefresh;
        }

        self.timeSinceFullRefresh += timeShortRefresh;
        var bitFullRefresh = false;
        if (self.timeSinceFullRefresh >= timeFullRefresh) {
          bitFullRefresh = true;
          self.timeSinceFullRefresh = 0;
        }

        var elements = document.getElementsByTagName("img");
        if (bitFullRefresh || elements.length != self.lastElementCount) {
          self.lastElementCount = elements.length;

          Array.prototype.slice.call(elements, 0).forEach(function(item) {
            if (!lstImgs.includes(item.getAttribute("src"))) {
              var h = item.offsetHeight;
              var w = item.offsetWidth;

              item.onload = function() {
                if (!lstImgs.includes(item.getAttribute("src"))) {
                  self.handleImg(item, lstImgs);
                }
              };

              if (h > 0 && w > 0) {
                self.handleImg(item, lstImgs);
              }
            }
          });
        }

        if (timeShortRefresh > 0) {
          setTimeout(function() {
            self.handleImages(lstImgs, timeShortRefresh, timeFullRefresh);
          }, timeShortRefresh);
        }
      },

      handleImg: function(item, lstImgs) {
        item.onerror = function() {
          self.handleBrokenImg(item, lstImgs);
        };

        self.setRandomImg(item, lstImgs);
      },

      setRandomImg: function(item, lstImgs) {
        var h = item.offsetHeight;
        var w = item.offsetWidth;
        item.style.width = w + "px";
        item.style.height = h + "px";
        item.setAttribute(
          "src",
          lstImgs[Math.floor(Math.random() * lstImgs.length)]
        );

        if (item.hasAttribute("srcset")) {
          item.removeAttribute("srcset");
        }
      },

      handleBrokenImg: function(item, lstImgs) {
        var brokenImg = item.getAttribute("src");
        var index = lstImgs.indexOf(brokenImg);
        if (index > -1) {
          lstImgs.splice(index, 1);
        }
        self.setRandomImg(item, lstImgs);
      }
    };

    document.addEventListener(
      "DOMContentLoaded",
      function() {
        self.handleImages(self.middleFingerImgs, 300, 3000);
      },
      false
    );

    window.middleFinger = self;
  })();
}
