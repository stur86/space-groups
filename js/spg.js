function SpacegroupData() {

    var that = this;
    $.ajaxSetup({
        async: false
    });
    $.getJSON('/data/spgtree.json', function(data) {
        that.spgdata = data;
    });    

    this.spg = function(hallno) {
        return this.spgdata[hallno];
    }
}