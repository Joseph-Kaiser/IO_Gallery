$(".header").mousemove(function(e) {
    parallaxIt(e, ".logo1", 5);
    parallaxIt(e, ".logo2", 20);
    parallaxIt(e, ".logo3", 30); 
    parallaxIt(e, ".logo4", 50); 
    parallaxIt(e, ".logo5", 70); 
    parallaxIt(e, ".logo6", 85); 
    parallaxIt(e, ".logo7", 100); 
  });
  
  function parallaxIt(e, target, movement) {
    var $this = $(".header");
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;
  
    TweenMax.to(target, 1, {
      x: (relX - $this.width() / 2) / $this.width() * movement,
      y: (relY - $this.height() / 2) / $this.height() * movement
    });
  }