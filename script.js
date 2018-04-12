(function(){
    function rotate(degrees)
    {
        $('html').css({
            '-webkit-transform':'rotate(-' + degrees + 'deg)',
            '-moz-transform':'rotate(-' + degrees + 'deg)',
            '-ms-transform':'rotate(-' + degrees + 'deg)',
            '-o-transform':'rotate(-' + degrees + 'deg)',
            'transform':'rotate(-' + degrees + 'deg)',

            '-webkit-transition':'2s',
            '-moz-transition':'2s',
            '-ms-transition':'2s',
            '-o-transition':'2s',
            'transition':'2s',

            '-webkit-transform-origin':'50% 50%',
            '-moz-transform-origin':'50% 50%',
            '-ms-transform-origin':'50% 50%',
            '-o-transform-origin':'50% 50%',
            'transform-origin':'50% 50%',
            '-webkit-backface-visibility':'hidden'
        });
    }

    var degrees = 180,
        interval;

    document.onmousemove = function()
    {
        if(degrees == 0){ rotate(0); degrees = 180; }

        clearInterval(interval);
        interval = setInterval(function(){
            rotate(degrees);

            degrees = (degrees === 180) ? 0 : 180;
        }, 30 * 60 *60* 1000); // 30 min
    }
})();