function palette(min, max) {
    function scale(x) {        
        xi = (x-min)*16/(max-min)
        return ['#e3492d', '#dd5d3e', '#d76e4d', '#d07d5a', '#c88a66', '#c09771', '#b8a379', '#aeaf80', '#a5ba84', 
                '#9cc586', '#94cf85', '#8cd97f', '#86e375', '#82ed65', '#80f64a', '#80ff00'][Math.floor(xi)];
    }
    return scale;
}