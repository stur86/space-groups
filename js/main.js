var app = new Vue({
  el: '#main-app',
  data: {
    hno: 0,
    intsym: 'P1',
    choice: '',
    size: 1,
    parent: 0,
    children: [],
    point: {'x': 0, 'y': 0, 'z': 0}
  },
  methods: {
    pickHallNo: function(hno) {
        this.hno = hno;
        this.spg = this.spgdata.spg(hno).spg;
        this.intsym = this.spg.international_short;
        this.choice = this.spg.choice;
        this.parent = this.spgdata.spg(hno).parent;
        var ch = this.spgdata.spg(hno).children.map(function(n) { return parseInt(n)});
        ch = ch.sort(function(a, b) { return a > b? 1 : b > a? -1 : 0; });
        this.children = ch;

        this.drawDots();
    },
    colorScale: palette(0, 8),
    drawDots: function() {

      if (this.vis == null) 
        return;

      this.vis.clearDots();

      var ops = this.spgdata.spg(this.hno).ops;
      var N = ops[0].length;
      var p = [this.point.x, this.point.y, this.point.z];

      for (var i = N-1; i >= 0; --i) {
        var R = ops[0][i];
        var T = ops[1][i];

        var c = new BABYLON.Color4(1,1,1,1);
        if (i > 0) {
          var th = i*2*Math.PI/(N-1);
          var ct = Math.cos(th);
          var st = Math.sin(th);
          var s120 = Math.sqrt(3.0)/2.0;
          var r = (ct+1)/2;
          var g = (-0.5*ct+s120*st+1)/2;
          var b = (-0.5*ct-s120*st+1)/2;
          c = new BABYLON.Color4(r, g, b, 1);
        }

        var p1 = [0,0,0];
        for (var j = 0; j < 3; ++j) {
          for (var k = 0; k < 3; ++k) {
            p1[j] += R[j][k]*p[k];
          }
          p1[j] += T[j];
          p1[j] = ((p1[j] % 1) + 1) % 1-0.5;
        }

        this.vis.addDot(p1[0], p1[1], p1[2], c);
      }
    }
  },
  beforeCreate: function() {
    this.spgdata = new SpacegroupData();

    var that = this;
    $(document).ready(function() {
        that.vis = new Visualizer();
        that.pickHallNo(1);
        that.$forceUpdate();
    });

  },
});