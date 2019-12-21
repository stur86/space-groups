var app = new Vue({
  el: '#main-app',
  data: {
    hno: 0,
    intsym: 'P1',
    choice: '',
    parent: 0,
    children: [],
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
    },
  },
  beforeCreate: function() {
    this.spgdata = new SpacegroupData();

    var that = this;
    $(document).ready(function() {
        that.vis = new Visualizer();
    });
  },
  created: function() {
    this.pickHallNo(1);
    this.$forceUpdate();
  }
});